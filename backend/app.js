const express = require("express");
const app = express();
const port = 3000;
const axios = require("axios");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require("cors");


const api='AIzaSyATtW79imHArJMB2OzQczyLlAOSUIllc58'
const genAI = new GoogleGenerativeAI(api);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.use(express.json());
app.use(cors({origin:['http://localhost:5173','http://localhost:5174']}));

app.post("/chat", async (req, res) => {
  try {
    const {prompt}=req.body
    const result = await model.generateContent(`Give a detailed response for the following prompt: ${prompt}`);
    const response = result.response.text();
    res.status(201).json({ message: response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
