import os, openai, glob

# Only process text‑based extensions
TEXT_EXTS = {'.html', '.css', '.js', '.py', '.md', '.txt'}

files = {}
for path in glob.glob("**/*.*", recursive=True):
    # Skip GitHub Actions workflow itself
    if path.startswith(".github/"): 
        continue

    ext = os.path.splitext(path)[1].lower()
    if ext not in TEXT_EXTS:
        # skip images, fonts, binaries, etc.
        continue

    try:
        with open(path, encoding="utf-8") as f:
            files[path] = f.read()
    except UnicodeDecodeError:
        print(f"⚠️ Skipping non‑UTF8 file: {path}")
        continue

# Now build your prompt using `files`
system = "You are a helpful assistant that updates website code to ensure it’s mobile‑responsive."
user = f"Here are my files:\n\n" + "\n\n".join(f"--- {p}\n{c}" for p, c in files.items()) + \
       "\n\nPlease add a viewport meta tag and ensure images scale responsively."

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

# Parse and write back files as before…
for chunk in resp.choices[0].message.content.split('--- filename: ')[1:]:
    header, _, body = chunk.partition('\n')
    path = header.strip()
    with open(path, "w", encoding="utf-8") as f:
        f.write(body)
    print(f"✅ Updated {path}")
