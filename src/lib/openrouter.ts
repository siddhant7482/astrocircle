interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
}

interface ChatResponse {
  choices: {
    message: {
      content: string
    }
  }[]
}

export async function sendChatMessage(messages: Message[]) {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages })
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Chat API Error:', errorData)
      throw new Error(errorData.error || 'Failed to get response')
    }

    const data: ChatResponse = await response.json()
    return data.choices[0].message.content
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
} 