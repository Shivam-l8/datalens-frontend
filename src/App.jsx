import React, { useState } from "react";
import axios from "axios";
import { ResultsView } from "./ResultsView.jsx";

const MAX_FILE_MB = 10;
const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:8000").replace(/\/+$/, "");

export default function App() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (event) => {
    setError("");
    const selected = event.target.files?.[0];
    if (!selected) {
      setFile(null);
      return;
    }
    const sizeMb = selected.size / (1024 * 1024);
    const ext = selected.name.toLowerCase().split(".").pop();
    if (!["csv", "xls", "xlsx"].includes(ext)) {
      setError("Only CSV and Excel files are supported.");
      setFile(null);
      return;
    }
    if (sizeMb > MAX_FILE_MB) {
      setError(`File too large (${sizeMb.toFixed(2)} MB). Max allowed is ${MAX_FILE_MB} MB.`);
      setFile(null);
      return;
    }
    setFile(selected);
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError("Please select a CSV or Excel file first.");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(`${API_URL}/analyze`, formData);
      setResult(response.data);
    } catch (err) {
      const message =
        err?.response?.data?.detail || "Failed to analyze dataset. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-root">
      <header className="app-header">
        <h1>DataLens — Automated Insight Generation</h1>
        <p>
          Upload a CSV or Excel file and get automated exploratory analysis, visual insights,
          and plain-language recommendations.
        </p>
      </header>

      <main className="app-main">
        <section className="card upload-card">
          <h2>1. Upload your dataset</h2>
          <input type="file" accept=".csv,.xls,.xlsx" onChange={handleFileChange} />
          {file && (
            <p className="file-info">
              Selected: <strong>{file.name}</strong>
            </p>
          )}
          {error && <p className="error-text">{error}</p>}
          <button onClick={handleAnalyze} disabled={loading || !file} className="primary-btn">
            {loading ? "Analyzing..." : "Analyze Data"}
          </button>
        </section>

        {loading && (
          <section className="card">
            <p>Processing your dataset. This may take a few seconds...</p>
          </section>
        )}

        {result && (
          <section className="card results-card">
            <ResultsView result={result} />
          </section>
        )}
      </main>
    </div>
  );
}


