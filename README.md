# James Dolan Website

This repository contains a simple static site showcasing the work and experience of **James Dolan**. The homepage introduces James as a *Playbook Engineer & Cybersecurity Specialist* and highlights featured projects and contact information.

## Pages
- `index.html` – landing page with links to all other sections
- `Experience.html` – professional experience
- `Education.html` – academic background
- `Certifications.html` – relevant certifications
- `Skills.html` – summary of key skills
- `Projects.html` – project portfolio
- `Hobbies.html` – additional interests

## Serving Locally
Any basic web server can host these files. From the repository root you can run:

```bash
python3 -m http.server 8000
```

Then navigate to <http://localhost:8000/index.html> in your browser.

## Git Remote Setup
To push your local changes to GitHub, add a remote and push the current branch (here `work`):

```bash
git remote add origin https://github.com/<username>/James-Dolan-Website.git
git push -u origin work
```
Replace `<username>` with your GitHub account and change `work` if you are pushing another branch.
