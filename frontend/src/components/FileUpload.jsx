import { useState } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

function FileUpload({ onUploadSuccess }) {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
    setMessage('')
  }

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a PDF file')
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    setUploading(true)
    setMessage('')

    try {
      const response = await axios.post(`${API_URL}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setMessage(`✓ ${response.data.message}`)
      setFile(null)
      onUploadSuccess()
    } catch (error) {
      setMessage(`✗ ${error.response?.data?.detail || 'Upload failed'}`)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Upload PDF</h2>
      <div className="flex gap-4 items-center">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="flex-1 text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
        />
        <button
          onClick={handleUpload}
          disabled={uploading || !file}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </div>
      {message && (
        <p className={`mt-3 text-sm ${message.startsWith('✓') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </div>
  )
}

export default FileUpload
