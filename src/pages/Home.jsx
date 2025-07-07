import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Categories from '../categories'

const Home = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [difficulty, setDifficulty] = useState('')

  const onClickHandler = () => {
    if (name && category && difficulty) {
      navigate("/quiz", { state: { name, category, difficulty } })
    }
  }

  const difficulties = ['easy', 'medium', 'hard']

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between w-full max-w-6xl gap-8">
        
        {/* Rules Section */}
        <div className="flex-1 bg-gray-700 bg-opacity-40 p-6 rounded-xl shadow-md">
          <h1 className="text-3xl font-bold mb-4">Welcome to the Quiz App! 🧠</h1>
          <ul className="list-disc list-inside text-lg space-y-2">
            <li>✅ 10 multiple-choice questions per quiz</li>
            <li>✅ Only one correct answer per question</li>
            <li>✅ You can skip or move to next anytime</li>
            <li>✅ Score is shown at the end</li>
            <li>✅ No negative marking — try all!</li>
          </ul>
          <p className="mt-4 text-blue-300 font-semibold">Good luck and have fun!</p>
        </div>

        {/* Form Section */}
        <div className="flex-1 bg-gray-700 bg-opacity-40 p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-center">Setup Your Quiz</h2>
          <div className="flex flex-col gap-6">
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-2 p-2 rounded text-white placeholder-white"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border-2 p-2 rounded text-white"
            >
              <option value="" disabled>Select Category</option>
              {Categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.category}
                </option>
              ))}
            </select>

            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="border-2 p-2 rounded text-white"
            >
              <option value="" disabled>Select Difficulty</option>
              {difficulties.map((level, idx) => (
                <option key={idx} value={level}>
                  {level}
                </option>
              ))}
            </select>

            <button
              onClick={onClickHandler}
              className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
