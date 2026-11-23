# DataLens Frontend

DataLens is an exploratory data analysis tool. Its React interface accepts CSV and Excel files up to 10 MB and displays the column summaries, charts, insights, and downloadable CSV and text outputs returned by the analysis API.

## Run locally

Start the API on port 8000 first. [DataLens backend and API setup](https://github.com/Shivam-l8/datalens-backend)

```bash
git clone https://github.com/Shivam-l8/datalens-frontend.git
cd datalens-frontend
npm ci
npm run dev
```

Open `http://localhost:5173` and select a CSV, XLS, or XLSX file. To use an API at a different address, copy `.env.example` to `.env.local` and set `VITE_API_URL` to the API base URL.

Run `npm run build` to create the production bundle and `npm run preview` to serve it locally.
