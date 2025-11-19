import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

// 🔥 چاپ مقدار API KEY برای تست در لاگ Render
console.log("🔍 Loaded OPENAI_API_KEY:", process.env.OPENAI_API_KEY ? "FOUND ✔️" : "❌ NOT FOUND");

// 🔥 اتصال به OpenAI با متغیر محیطی
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// تست سرور
app.get("/", (req, res) => {
  res.send("AI Server is Running ✔️");
});

// مسیر چت
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) return res.status(400).json({ error: "Message is required" });

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: message,
    });

    return res.json({ reply: response.output_text });

  } catch (err) {
    console.log("🔥 ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
});

// اجرای سرور
app.listen(process.env.PORT || 3000, () => {
  console.log("🚀 Server running...");
});