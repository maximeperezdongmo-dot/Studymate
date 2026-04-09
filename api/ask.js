export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // 🔹 Ligne de test pour vérifier la clé
    console.log("La clé est :", process.env.OPENAI_API_KEY ? "OK" : "Pas trouvée");

    const { question } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Tu es un assistant pour étudiants." },
          { role: "user", content: question }
        ],
      }),
    });

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content || "Pas de réponse.";
    res.status(200).json({ answer });

  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
}
