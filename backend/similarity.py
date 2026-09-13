from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def find_similar_skills(skills, threshold=0.3):
    if len(skills) < 2:
        return []

    descriptions = [skill["description"] for skill in skills]

    vectorizer = TfidfVectorizer(stop_words="english")
    matrix = vectorizer.fit_transform(descriptions)

    similarity_matrix = cosine_similarity(matrix)

    pairs = []

    for i in range(len(skills)):
        for j in range(i + 1, len(skills)):
            score = similarity_matrix[i][j]

            if score >= threshold:
                pairs.append({
                    "skill_a": skills[i],
                    "skill_b": skills[j],
                    "similarity": float(score)
                })

    pairs.sort(
        key=lambda pair: pair["similarity"],
        reverse=True
    )

    return pairs