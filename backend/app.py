from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware

import os
import tempfile
import zipfile
import shutil

from extractor import extract_skills
from similarity import find_similar_skills
from llm_classifier import classify_pair


app = FastAPI(title="SkillClash API")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def safe_extract(zip_path, extract_path):

    with zipfile.ZipFile(zip_path, "r") as zip_ref:

        for member in zip_ref.infolist():

            member_path = os.path.abspath(
                os.path.join(extract_path, member.filename)
            )

            if not member_path.startswith(
                os.path.abspath(extract_path) + os.sep
            ):
                raise HTTPException(
                    status_code=400,
                    detail="Unsafe ZIP file"
                )

        zip_ref.extractall(extract_path)


@app.get("/")
def home():

    return {
        "message": "SkillClash API is running"
    }


@app.post("/scan")
async def scan(file: UploadFile = File(...)):

    if not file.filename.lower().endswith(".zip"):
        raise HTTPException(
            status_code=400,
            detail="Please upload a ZIP file"
        )

    temp_dir = tempfile.mkdtemp()

    try:

        zip_path = os.path.join(
            temp_dir,
            "skills.zip"
        )

        with open(zip_path, "wb") as buffer:
            shutil.copyfileobj(
                file.file,
                buffer
            )

        extract_path = os.path.join(
            temp_dir,
            "skills"
        )

        os.makedirs(extract_path)

        safe_extract(
            zip_path,
            extract_path
        )

        skills = extract_skills(extract_path)

        pairs = find_similar_skills(skills)

        results = []

        for pair in pairs:

            skill_a = pair["skill_a"]
            skill_b = pair["skill_b"]
            similarity = pair["similarity"]

            ai_result = classify_pair(
                skill_a,
                skill_b
            )

            if not ai_result:
                continue

            classification = ai_result["classification"]

            score = similarity * 100

            if classification == "identical_trigger":
                score += 20

            elif classification == "overlapping_trigger":
                score += 10

            elif classification == "contradictory_instructions":
                score += 30

            score = min(
                round(score, 2),
                100
            )

            results.append({
                "skill_a": skill_a["name"],
                "skill_b": skill_b["name"],
                "similarity": round(
                    similarity,
                    2
                ),
                "classification": classification,
                "conflict_score": score,
                "example_query": ai_result[
                    "example_query"
                ],
                "suggested_fix": ai_result[
                    "suggested_fix"
                ]
            })

        return {
            "skills_found": len(skills),
            "potential_conflicts": len(pairs),
            "results": results
        }

    finally:

        shutil.rmtree(
            temp_dir,
            ignore_errors=True
        )