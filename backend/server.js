import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/ask", async (req, res) => {
  try {
    const { question } = req.body;

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful educational tutor." },
          { role: "user", content: question }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json({
      answer: response.data.choices[0].message.content
    });

  } catch (error) {
    res.status(500).json({ error: "AI request failed" });
  }
});

app.listen(5000, () => console.log("✔️ Server running on port 5000"));

