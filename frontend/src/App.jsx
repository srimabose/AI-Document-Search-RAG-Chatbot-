import { useState } from 'react'
import FileUpload from './components/FileUpload'
import ChatInterface from './components/ChatInterface'

function App() {
  const [hasDocuments, setHasDocuments] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            AI Document Search
          </h1>
          <p className="text-gray-600">Chat with your PDFs using AI</p>
        </header>

        <div className="max-w-4xl mx-auto">
          <FileUpload onUploadSuccess={() => setHasDocuments(true)} />
          <ChatInterface hasDocuments={hasDocuments} />
        </div>
      </div>
    </div>
  )
}

export default App
