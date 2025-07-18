# James Dolan Website

This site uses EmailJS for the contact form. Credentials are not kept in the repository. Before running the site you need to provide the following values:

- `EMAILJS_PUBLIC_KEY`
- `EMAILJS_SERVICE_ID`
- `EMAILJS_TEMPLATE_ID`

## Providing credentials via a config file

1. Copy `config.example.js` to `config.js`.
2. Replace the placeholder values with your EmailJS credentials.
3. Ensure `config.js` is **not** committed to version control. The `.gitignore` file already excludes it.

## Providing credentials via environment variables

Alternatively you can create `config.js` dynamically from environment variables when deploying. A simple script can be run during deployment:

```bash
echo "window.EMAILJS_PUBLIC_KEY='${EMAILJS_PUBLIC_KEY}';" > config.js
echo "window.EMAILJS_SERVICE_ID='${EMAILJS_SERVICE_ID}';" >> config.js
echo "window.EMAILJS_TEMPLATE_ID='${EMAILJS_TEMPLATE_ID}';" >> config.js
```

Make sure the environment variables are set in your deployment environment before running this script.
