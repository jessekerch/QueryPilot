import { useState } from "react";
import axios from "axios";
import "./App.css";
import { Clipboard, ClipboardCheck } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

function App() {
  const [query, setQuery] = useState("");
  const [database, setDatabase] = useState("PostgreSQL");
  const [sql, setSQL] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSQL("");
    setCopied(false);

    try {
      const response = await axios.post("http://127.0.0.1:8000/generate-sql", {
        query,
        database,
      });
      const sql = response.data.sql;
      const cleanSql = sql.replace(/```sql|```/g, "").trim();
      setSQL(cleanSql);
    } catch (err) {
      console.error("Failed to generate SQL, error: ", err);
      setError("Failed to generate SQL. Please try again.");
    }

    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(sql).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="container">
      <div className="logo-title">
        <img
          src="/query_pilot_logo-transparent.png"
          alt="QueryPilot Logo"
          className="logo"
        />

        <h1 className="title">QueryPilot.ai</h1>
      </div>
      <p className="subtitle">
        Convert natural language into SQL queries instantly.
      </p>
      <form onSubmit={handleSubmit} className="query-form">
        <textarea
          placeholder="Describe your SQL query..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input-field"
          rows={2}
        />
        <select
          value={database}
          onChange={(e) => setDatabase(e.target.value)}
          className="select-field"
        >
          <option value="PostgreSQL">PostgreSQL</option>
          <option value="MySQL">MySQL</option>
          <option value="SQLite">SQLite</option>
          <option value="MSSQL">MSSQL</option>
        </select>
        <button type="submit" className="generate-btn" disabled={loading}>
          {loading ? "Generating..." : "Generate SQL"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {sql && (
        <div className="output-container">
          <h2 className="output-title">Generated SQL:</h2>
          <div className="sql-box">
            <SyntaxHighlighter language="sql" style={dracula}>
              {sql}
            </SyntaxHighlighter>
            <button onClick={handleCopy} className="copy-btn">
              {copied ? <ClipboardCheck size={24} /> : <Clipboard size={24} />}
            </button>
          </div>
          {copied && <p className="copied-message">Copied to clipboard!</p>}
        </div>
      )}
    </div>
  );
}

export default App;
