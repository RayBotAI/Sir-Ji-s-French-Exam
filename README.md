# FrenchPath Canada — My TEF/TCF Coach

A mobile-first React + TypeScript + Vite starter application for an absolute beginner focused on French speaking and listening. It works without paid APIs and stores progress in the current browser.

## Requirements
- Node.js 20+ (LTS recommended)
- npm
- GitHub account and a Netlify account for hosting

## Run locally
1. Unzip the project.
2. Open a terminal in the `frenchpath-canada` folder.
3. Run `npm install`
4. Run `npm run dev` and open the local URL Vite prints.
5. Run `npm run build` before deploying.

## Deploy via GitHub + Netlify
1. Create a new GitHub repository and upload/commit the contents of this folder (not the ZIP itself).
2. In Netlify, choose **Add new site → Import an existing project**.
3. Connect GitHub and select the repository.
4. Build command: `npm run build`; publish directory: `dist`. Netlify also reads `netlify.toml`.
5. Deploy. Open the generated HTTPS URL on your iPhone.
6. In Safari, tap Share → **Add to Home Screen**.

## Updating
Edit locally, test with `npm run build`, commit and push to GitHub. Netlify automatically builds the new version.

## What works in v1
- Dashboard and locally saved progress
- A1 starter lessons, vocabulary flashcards and review tracking
- Text-to-speech audio via the browser when available
- Listening exercises with hidden transcript, replay and feedback
- Speaking prompts, optional microphone recording, local playback, and browser speech recognition when supported
- Separate TEF Canada and TCF Canada practice sections
- Basic timed practice, progress export/import, dark mode
- Netlify SPA configuration

## Limits and privacy
- Local progress is stored in this browser/device. It does not sync automatically to another device; export/import JSON to move progress.
- Browser speech recognition support varies, especially on iOS Safari. It may use a browser/vendor speech service; do not use it if you do not consent to that processing.
- Recording audio is kept in page memory only and is not uploaded by this app.
- Text-to-speech is synthetic speech, not authentic exam audio.
- Speaking feedback in v1 is a self-review rubric, not an official score or reliable pronunciation assessment.
- TEF/TCF mock scores are unofficial practice indicators, not official exam scores or automatic NCLC conversions.
- No paid API is required for the core app. Advanced AI feedback/cloud accounts can be added later through Netlify Functions and server-side environment variables.

## Exam-format verification
Official format references checked 18 October 2026:
- TEF Canada, CCI Paris Île-de-France: https://www.lefrancaisdesaffaires.fr/candidat/test-evaluation-francais/tef-canada/presentation/
- TEF Canada exam delivery details: https://www.lefrancaisdesaffaires.fr/candidat/test-evaluation-francais/tef-canada/passation/
- TCF Canada, France Éducation international: https://www.france-education-international.fr/test/tcf-canada
TCF Canada official format listed by FEI: listening comprehension 39 questions / 35 minutes; oral expression 3 tasks / 12 minutes including 2 minutes preparation. TEF Canada for Canadian citizenship uses the two oral modules: listening 40 questions / 40 minutes; oral expression 2 sections / 15 minutes (Section A information gathering, 5 min; Section B persuasion, 10 min). For economic immigration, TEF Canada generally requires four tests, and TCF Canada also comprises four compulsory tests; confirm current requirements with IRCC for your specific application before registering.
