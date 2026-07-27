import axios from "axios";

export interface ChatResponse {
  success: boolean;
  question?: string;
  answer: string;
}


const API_URL =
  "https://monday-bi-agent-ogrh.onrender.com/api";


export const api = axios.create({
  baseURL: API_URL,
});


export async function sendChatMessage(
  question: string
): Promise<ChatResponse> {

  const response = await fetch(
    `${API_URL}/chat`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        question,
      }),
    }
  );


  if (!response.ok) {
    throw new Error(
      "AI service unavailable"
    );
  }


  return response.json();

}