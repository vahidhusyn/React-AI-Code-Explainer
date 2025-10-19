import "dotenv/config";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { GoogleGenAI } from "@google/genai";

const app = express()

app.use(helmet());

app.use(cors())

        // origin: process.env.FRONTEND_URL || 'http://localhost:5173',
        // methods: ['GET', 'POST', 'PUT', 'DELETE'], // Adjust methods as needed
        // allowedHeaders: ['Content-Type', 'Authorization'],
        // credentials: true,


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max:100,
    message: "Too many requests from this IP, please try again after some time"
}) 

app.use(limiter);

app.use(express.json({limit:"10mb"}));

const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);


app.post("/api/explain-code", async (req, res)=> {

    try {
        const { code, language } =  req.body;

        if(!code){
            return res.status(400).json({error: "Code is required"})
        }

        const answer = await ai.models.generateContent({ model: "gemini-2.5-flash",
        contents: `Explain this code written in ${language} simply:\n\`\`\`\n${code}\n\`\`\``});

        if(!answer){
            return res.status(500).json({error: "Failed to explain the code"});
        }

        console.log(res.text);
        res.json({answer, language: language || "unknown"});

    } catch (err) {
        console.error("API error: ", err);
        res.status(500).json({error: "Server error", details: err.message})
    }

        
        
        
});

// This code is working

// app.get("/api/explain-code", async (req, res)=> {
    
//         res = await ai.models.generateContent({ model: "gemini-2.5-flash",
//         contents: "Explain how AI works to a schoolkid in a few words"});

//         console.log(res.text);
        
// });

const PORT = process.env.PORT || 3002;

app.listen(PORT, ()=>{
    console.log(`API server listening on http://localhost:${PORT}`)
});


