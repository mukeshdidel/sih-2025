import OpenAI from "openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing OPENAI_API_KEY. Set it in your environment or .env.local" },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey,
    });

    const systemPrompt = `
        You are "AyurGPT" — a friendly and knowledgeable Ayurvedic assistant.
        Your goal is to help users with Ayurvedic diet, digestion, body type balance (Vata, Pitta, Kapha),
        food combinations, and holistic wellness tips.
        You do NOT generate meal plans or charts.
        Instead, you explain principles, give simple suggestions, and answer general questions.
        Keep responses friendly, short (3-5 sentences), and easy to understand.
        `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
    });

    const aiMessage = response.choices.at(0)?.message?.content || "I'm sorry, I couldn't generate a response.";

    return NextResponse.json({ message: aiMessage });
  } catch (error) {
    console.error("Error generating AI response:", error);
    return NextResponse.json({ error: "Failed to generate AI response." }, { status: 500 });
  }
}



