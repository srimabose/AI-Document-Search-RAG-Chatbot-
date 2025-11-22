import { useState } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

function ChatInterface({ hasDocuments }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await axios.post(`${API_URL}/query`, {
        question: input
      })
      
      const aiMessage = {
        role: 'assistant',
        content: response.data.answer,
        sources: response.data.sources
      }
      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      const errorMessage = {
        role: 'assistant',
        content: error.response?.data?.detail || 'An error occurred',
        error: true
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Chat</h2>
      
      <div className="h-96 overflow-y-auto mb-4 p-4 bg-gray-50 rounded-lg">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center mt-20">
            {hasDocuments ? 'Ask a question about your documents' : 'Upload a PDF to start chatting'}
          </p>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className={`mb-4 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
              <div className={`inline-block max-w-[80%] p-3 rounded-lg ${
                msg.role === 'user' 
                  ? 'bg-indigo-600 text-white' 
                  : msg.error 
                  ? 'bg-red-100 text-red-800'
                  : 'bg-white text-gray-800 shadow'
              }`}>
                <p className="whitespace-pre-wrap">{msg.content}</p>
                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-gray-200 text-xs text-gray-600">
                    <p className="font-semibold">Sources:</p>
                    {msg.sources.map((src, i) => (
                      <p key={i}>Page {src.page}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
        {loading && (
          <div className="text-left">
            <div className="inline-block bg-white p-3 rounded-lg shadow">
              <p className="text-gray-500">Thinking...</p>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          disabled={!hasDocuments || loading}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
        />
        <button
          type="submit"
          disabled={!hasDocuments || loading || !input.trim()}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
        >
          Send
        </button>
      </form>
    </div>
  )
}

export default ChatInterface
