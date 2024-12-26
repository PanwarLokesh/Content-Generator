const express = require("express");
const app = express();
const port = 3000;
const axios = require("axios");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { message } = require("prompt");
const api='AIzaSyATtW79imHArJMB2OzQczyLlAOSUIllc58'
const genAI = new GoogleGenerativeAI(api);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.use(express.json());


app.post("/chat", async (req, res) => {
  try {
    const result = await model.generateContent(req.body.prompt);
    const response = result.response.text();
    console.log(req.body.prompt);
    res.status(201).json({ message: response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
