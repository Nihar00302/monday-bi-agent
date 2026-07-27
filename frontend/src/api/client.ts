import axios from 'axios'

export interface ChatResponse {
  success: boolean
  question: string
  answer: string
}

export const api = axios.create({
  baseURL: 'https://monday-bi-agent-ogrh.onrender.com',
})

export async function sendChatMessage(question: string): Promise<ChatResponse> {
  const response = await api.post<ChatResponse>('/chat', { question })
  return response.data
}
