
from extractor import extract_skills
from similarity import find_similar_skills
from llm_classifier import classify_pair


ZIP_PATH = "fixtures"

skills = extract_skills(ZIP_PATH)

pairs = find_similar_skills(skills)

print("\nTotal potential conflicts:", len(pairs))


for pair in pairs:

    skill_a = pair["skill_a"]
    skill_b = pair["skill_b"]
    similarity = pair["similarity"]

    print("\n" + "-" * 60)

    print(f"{skill_a['name']} <-> {skill_b['name']}")
    print(f"TF-IDF Similarity: {similarity:.2f}")

    result = classify_pair(skill_a, skill_b)

    if result:

        classification = result["classification"]

        score = similarity * 100

        if classification == "identical_trigger":
            score += 20

        elif classification == "overlapping_trigger":
            score += 10

        elif classification == "contradictory_instructions":
            score += 30

        score = min(round(score, 2), 100)

        print("AI Classification:", classification)
        print("Conflict Score:", score)

        print("Example Query:")
        print(result["example_query"])

        print("Suggested Fix:")
        print(result["suggested_fix"])

    else:
        print("AI classification: Skipped")