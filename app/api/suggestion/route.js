// app/api/suggestion/route.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { water, steps, calories } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); // ✅ current free tier model

    const result = await model.generateContent(
      `The user logged: ${water}L water, ${steps} steps, ${calories} kcal burned today.
       Give ONE short friendly health suggestion (1-2 sentences). Be specific to their numbers.`,
    );

    const suggestion = result.response.text();
    return Response.json({ suggestion });
  } catch (error) {
    console.error("Gemini error:", error?.message || error);
    return Response.json(
      { error: error?.message || "Failed to generate suggestion" },
      { status: 500 },
    );
  }
}
