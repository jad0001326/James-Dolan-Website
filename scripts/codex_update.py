import os, openai, glob

# Collect all code files in the repo
files = {}
for path in glob.glob("**/*.*", recursive=True):
    if path.startswith(".github/"): continue
    with open(path, encoding="utf-8") as f:
        files[path] = f.read()

# Build prompt for Codex
system = "You are a helpful assistant that updates website code to ensure it’s mobile-responsive."
# For demo, just send index.html content—adjust as needed
user = f"Here is index.html:\n\n{files.get('index.html','')}\n\n"
user += "Please add a viewport meta tag inside the <head> if missing."

# Call OpenAI
openai.api_key = os.getenv("OPENAI_API_KEY")
resp = openai.ChatCompletion.create(
    model="gpt-4o-code",
    messages=[
        {"role":"system", "content": system},
        {"role":"user",   "content": user}
    ],
    temperature=0.2,
    max_tokens=500
)

# Simple parser: expect entire new index.html back
new_content = resp.choices[0].message.content
with open("index.html", "w", encoding="utf-8") as f:
    f.write(new_content)
print("Updated index.html")
