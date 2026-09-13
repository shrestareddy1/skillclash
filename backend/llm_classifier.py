import os
import json
import time
import re
import requests
from dotenv import load_dotenv

load_dotenv()

ANAKIN_API_KEY = os.getenv("ANAKIN_API_KEY")
BASE_URL = "https://api.anakin.io/v1"


def call_anakin(prompt):

    response = requests.post(
        f"{BASE_URL}/wire/task",
        headers={
            "X-API-Key": ANAKIN_API_KEY,
            "Content-Type": "application/json"
        },
        json={
            "action_id": "gemini_prompt",
            "params": {
                "prompt": prompt
            }
        },
        timeout=30
    )

    response.raise_for_status()

    data = response.json()

    job_id = data.get("job_id") or data.get("jobId")

    if not job_id:
        raise Exception(f"No job ID returned: {data}")

    for _ in range(30):

        result = requests.get(
            f"{BASE_URL}/wire/jobs/{job_id}",
            headers={
                "X-API-Key": ANAKIN_API_KEY
            },
            timeout=30
        )

        result.raise_for_status()

        job = result.json()

        status = job.get("status")

        print("Anakin job status:", status)

        if status == "completed":
            return job

        if status in ["failed", "cancelled"]:
            raise Exception(f"Anakin job failed: {job}")

        time.sleep(2)

    raise Exception("Anakin job timed out")


def classify_pair(skill_a, skill_b):

    prompt = f"""
You are analyzing two AI agent skill triggers.

Skill A:
Name: {skill_a["name"]}
Description: {skill_a["description"]}

Skill B:
Name: {skill_b["name"]}
Description: {skill_b["description"]}

Classify their relationship as exactly ONE of:

identical_trigger
overlapping_trigger
contradictory_instructions
no_real_conflict

Then generate:

1. One realistic user query that would plausibly trigger both skills.
2. One concise suggested fix.

Return ONLY this JSON object:

{{
  "classification": "overlapping_trigger",
  "example_query": "example here",
  "suggested_fix": "fix here"
}}

Do not add markdown.
Do not add explanations.
"""

    try:

        result = call_anakin(prompt)

        text = extract_json(result)

        if not text:
            print("Could not extract AI JSON.")
            return None

        parsed = json.loads(text)

        allowed = {
            "identical_trigger",
            "overlapping_trigger",
            "contradictory_instructions",
            "no_real_conflict"
        }

        if parsed.get("classification") not in allowed:
            print("Invalid classification:", parsed)
            return None

        return parsed

    except Exception as e:

        print(
            f"Warning: classification failed for "
            f"{skill_a['name']} / {skill_b['name']}: {e}"
        )

        return None


def extract_json(data):

    def search(value):
        if isinstance(value, dict):

            # Check likely answer fields first
            for key in [
                "answer_text",
                "response",
                "response_text",
                "text",
                "answer",
                "content",
                "output"
            ]:
                if key in value and isinstance(value[key], str):
                    result = search(value[key])
                    if result:
                        return result

            # Search other fields, but NEVER search the original prompt
            for key, val in value.items():
                if key.lower() in ["prompt", "input"]:
                    continue

                result = search(val)

                if result:
                    return result

        elif isinstance(value, list):

            for item in value:
                result = search(item)

                if result:
                    return result

        elif isinstance(value, str):

            text = value.strip()

            # Try direct JSON
            try:
                obj = json.loads(text)

                if isinstance(obj, dict):
                    if obj.get("classification") in {
                        "identical_trigger",
                        "overlapping_trigger",
                        "contradictory_instructions",
                        "no_real_conflict"
                    }:
                        return json.dumps(obj)

            except Exception:
                pass

            # Find JSON inside text
            match = re.search(
                r'\{.*?"classification"\s*:\s*"(identical_trigger|overlapping_trigger|contradictory_instructions|no_real_conflict)".*?\}',
                text,
                re.DOTALL
            )

            if match:
                candidate = match.group(0)

                try:
                    obj = json.loads(candidate)

                    if (
                        "classification" in obj
                        and "example_query" in obj
                        and "suggested_fix" in obj
                    ):
                        return json.dumps(obj)

                except Exception:
                    pass

        return None

    return search(data)