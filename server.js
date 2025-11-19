const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// *** اینجا کلید OpenAI خودتو بزار ***
const API_KEY = "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";

app.post("/chat", async (req, res) => {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: req.body.message }]
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("AI Server is Running ✔️");
});

app.listen(10000, () => {
  console.log("Server running on port 10000");
});
