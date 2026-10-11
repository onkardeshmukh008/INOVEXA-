# JanSetu

JanSetu helps triage grassroots citizen grievances by identifying regional languages and dialects, analyzing issues, and suggesting administrative routing.

## Run locally

**Prerequisite:** Node.js and npm.

1. Install dependencies:
   ```sh
   npm install
   ```
2. Create `.env` from `.env.example` and set `GEMINI_API_KEY` to your Gemini API key. Keep the key private; `.env` is excluded from Git.
3. Start the application:
   ```sh
   npm run dev
   ```

The development server runs at `http://localhost:3000` by default. To check types and create a production build, run `npm run lint` and `npm run build`.

## GitHub Pages

The GitHub Actions workflow builds and publishes the static app on pushes to `main`. In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**.

GitHub Pages cannot run the Express API or Gemini model. When the API route is unavailable, the analyzer uses local keyword rules and labels the result as an estimate. For Gemini-powered analysis, run the Express server with a private `GEMINI_API_KEY` on a server host.
