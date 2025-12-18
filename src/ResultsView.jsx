import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

function downloadBase64Csv(base64, filename) {
  const blob = new Blob([atob(base64)], { type: "text/csv;charset=utf-8;" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

function downloadText(text, filename) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8;" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

function renderChart(chart) {
  if (chart.type === "bar") {
    const data = chart.data.labels.map((label, idx) => ({
      label,
      value: chart.data.values[idx],
    }));
    return (
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  if (chart.type === "histogram") {
    const data = chart.data.counts.map((count, idx) => ({
      bin: chart.data.bins[idx],
      count,
    }));
    return (
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="bin" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#16a34a" />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  if (chart.type === "line") {
    const data = chart.data.x.map((x, idx) => ({
      x,
      y: chart.data.y[idx],
    }));
    return (
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="y" stroke="#6366f1" />
        </LineChart>
      </ResponsiveContainer>
    );
  }

  if (chart.type === "heatmap") {
    // Simple table representation for now; can be replaced by a true heatmap later.
    const matrix = chart.data.matrix;
    const labels = chart.data.labels;
    return (
      <div className="heatmap-table-wrapper">
        <table className="heatmap-table">
          <thead>
            <tr>
              <th></th>
              {labels.map((label) => (
                <th key={label}>{label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrix.map((row, i) => (
              <tr key={labels[i]}>
                <th>{labels[i]}</th>
                {row.map((val, j) => (
                  <td key={`${i}-${j}`}>{val.toFixed(2)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return <p>Unsupported chart type: {chart.type}</p>;
}

export function ResultsView({ result }) {
  const { summary, key_insights, recommendations, charts, cleaned_csv_base64, insight_text } =
    result;

  return (
    <div className="results-root">
      <header className="results-header">
        <h2>2. Analysis results</h2>
        <p>
          Rows: <strong>{summary.dataset_shape.rows}</strong> | Columns:{" "}
          <strong>{summary.dataset_shape.columns}</strong>
        </p>
      </header>

      <section className="results-section">
        <h3>Summary</h3>
        <p>
          Detected {summary.detected_roles.numeric.length} numeric,{" "}
          {summary.detected_roles.categorical.length} categorical, and{" "}
          {summary.detected_roles.datetime.length} date/time columns.
        </p>
      </section>

      <section className="results-section two-column">
        <div>
          <h3>Key insights</h3>
          <ul className="insights-list">
            {key_insights.map((insight) => (
              <li key={insight.title}>
                <strong>{insight.title}</strong>
                <p>{insight.detail}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Recommendations</h3>
          <ul className="insights-list">
            {recommendations.map((rec) => (
              <li key={rec.title}>
                <strong>{rec.title}</strong>
                <p>{rec.action}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="results-section">
        <h3>Visualizations</h3>
        <div className="charts-grid">
          {charts.map((chart) => (
            <article key={chart.id} className="chart-card">
              <h4>{chart.title}</h4>
              <p className="chart-desc">{chart.description}</p>
              {renderChart(chart)}
            </article>
          ))}
        </div>
      </section>

      <section className="results-section downloads">
        <h3>Downloads</h3>
        <div className="download-buttons">
          <button
            className="secondary-btn"
            onClick={() => downloadBase64Csv(cleaned_csv_base64, "cleaned_data.csv")}
          >
            Download cleaned dataset (CSV)
          </button>
          <button
            className="secondary-btn"
            onClick={() => downloadText(insight_text, "insights_summary.txt")}
          >
            Download insight summary (TXT)
          </button>
        </div>
      </section>
    </div>
  );
}


