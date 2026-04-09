import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const { question } = req.body;
  if (!question) return res.status(400).json({ error: "Aucune question fournie" });

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: question }],
    });

    const answer = response.data.choices[0].message.content;
    res.status(200).json({ answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la récupération de la réponse IA" });
  }
}
