# Run and deploy your AI Studio app

This contains everything you need to run your app locally or deploy it to Google Cloud Run.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to Cloud Run

1. **Build the container**

   ```bash
   gcloud builds submit --tag gcr.io/PROJECT_ID/btvo
   ```

2. **Deploy**

   ```bash
   gcloud run deploy btvo \
     --image gcr.io/PROJECT_ID/btvo \
     --region REGION \
     --set-env-vars GEMINI_API_KEY=YOUR_API_KEY
   ```

Replace `PROJECT_ID` and `REGION` with your project details. `GEMINI_API_KEY` must be provided so the app can access the Gemini API.
