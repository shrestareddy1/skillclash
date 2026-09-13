from pathlib import Path
import frontmatter


def extract_skills(directory):
    skills = []

    directory = Path(directory)

    for skill_file in directory.rglob("SKILL.md"):
        try:
            post = frontmatter.load(skill_file)

            name = post.get("name")
            description = post.get("description")

            if not name or not description:
                print(f"Warning: Missing name or description: {skill_file}")
                continue

            skills.append({
                "path": str(skill_file),
                "name": str(name),
                "description": str(description)
            })

        except Exception as e:
            print(f"Warning: Could not parse {skill_file}: {e}")

    return skills
