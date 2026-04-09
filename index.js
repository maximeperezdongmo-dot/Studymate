import { useState } from "react";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });
    const data = await res.json();
    setAnswer(data.answer);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Ask AI</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Pose ta question..."
          style={{ width: "70%", padding: "10px" }}
        />
        <button type="submit" style={{ padding: "10px 20px", marginLeft: "10px" }}>Envoyer</button>
      </form>
      {answer && <p style={{ marginTop: "20px" }}><strong>Réponse :</strong> {answer}</p>}
    </div>
  );
                 }
