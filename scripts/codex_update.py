import os, openai, glob

# Only include these text‑file extensions
TEXT_EXTS = {'.html', '.css', '.js', '.py', '.md', '.txt'}

files = {}
for path in glob.glob("**/*.*", recursive=True):
    # Skip workflow definitions
    if path.startswith(".github/"):
        continue

    ext = os.path.splitext(path)[1].lower()
    if ext not in TEXT_EXTS:
        print(f"⚠️ Skipping non‑text file: {path}")
        continue

    try:
        with open(path, encoding="utf-8") as f:
            files[path] = f.read()
    except UnicodeDecodeError:
        print(f"⚠️ Skipping non‑UTF8 file: {path}")
        continue

# Now you can build your prompt using only the `files` dict…
system = "You are a helpful assistant that updates website code to ensure it’s mobile-responsive."
user = "Please update these files to add a viewport meta tag and ensure images scale responsively:\n\n"
for p, content in files.items():
    user += f"--- filename: {p}\n{content}\n\n"

openai.api_key = os.getenv("OPENAI_API_KEY")
resp = openai.ChatCompletion.create(
    model="gpt-4o-code",
    messages=[
        {"role":"system", "content": system},
        {"role":"user",   "content": user}
    ],
    temperature=0.2,
    max_tokens=2000
)

# Parse and write back changes (assuming response uses your delimiters)
for chunk in resp.choices[0].message.content.split('--- filename: ')[1:]:
    header, _, body = chunk.partition('\n')
    target = header.strip()
    with open(target, "w", encoding="utf-8") as f:
        f.write(body)
    print(f"✅ Updated {target}")
