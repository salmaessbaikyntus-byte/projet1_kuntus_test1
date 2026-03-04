<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/5deb4191-6a21-47d0-8b88-ce8ca3e4ff41

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key (optionnel).
3. Run the app:
   - **Sans backend (recommandé pour démo)** : `npm run dev:demo` — plus d’erreur proxy dans le terminal, login avec **admin@shiftmaster.com** / **ShiftMaster123!**
   - **Avec backend** : `npm run dev` (proxy vers http://localhost:5275), puis lancez la Gateway .NET.

L’app sera disponible sur **http://localhost:3000**.

### Connexion API (backend)

- **`npm run dev:demo`** : lance un petit serveur mock (port 5276) qui répond au login démo et évite les erreurs `ECONNREFUSED` dans le terminal. Idéal quand le backend .NET n’est pas démarré.
- **`npm run dev`** : proxy direct vers **http://localhost:5275** (Gateway .NET). Si la Gateway ne tourne pas, le frontend peut quand même accepter le compte **admin@shiftmaster.com** / **ShiftMaster123!** (fallback dans le code), mais des erreurs proxy s’afficheront dans le terminal.
