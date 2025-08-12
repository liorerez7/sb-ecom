import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// add some tailwind css inorder for me to see if its working:
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-8">
        <div className="flex space-x-8 mb-8">
          <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
            <img src={viteLogo} className="logo w-24 h-24 hover:scale-110 transition-transform" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
            <img src={reactLogo} className="logo react w-24 h-24 hover:scale-110 transition-transform" alt="React logo" />
          </a>
        </div>
        <h1 className="text-5xl font-extrabold text-purple-700 mb-6 drop-shadow-lg">Vite + React</h1>
        <div className="card bg-white shadow-lg rounded-lg p-8 mb-6 flex flex-col items-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded mb-4 transition-colors"
            onClick={() => setCount((count) => count + 1)}
          >
            count is {count}
          </button>
          <p className="text-gray-700">
            Edit <code className="bg-gray-100 px-2 py-1 rounded">src/App.jsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs text-gray-600 text-lg">
          Click on the Vite and React logos to learn more
        </p>
        <div className="mt-8 p-4 bg-green-100 border border-green-400 rounded text-green-700 font-mono">
          Tailwind CSS is working!
        </div>
      </div>
    </>
  )
}

export default App
