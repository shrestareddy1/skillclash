import os
import requests
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("ANAKIN_API_KEY")

if not api_key:
    print("❌ ANAKIN_API_KEY not found")
    exit()

print("✅ API key loaded")

response = requests.post(
    "https://api.anakin.io/v1/search",
    headers={
        "X-API-Key": api_key,
        "Content-Type": "application/json"
    },
    json={
        "prompt": "What is a SKILL.md file?",
        "limit": 3
    }
)

print("Status:", response.status_code)
print(response.text)