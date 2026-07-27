import axios from 'axios'

export interface ChatResponse {
  success: boolean
  question: string
  answer: string
}

export const api = axios.create({
  baseURL: 'http://localhost:5000/api',
})

export async function sendChatMessage(question: string): Promise<ChatResponse> {
  const response = await api.post<ChatResponse>('/chat', { question })
  return response.data
}
