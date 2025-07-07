import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import he from 'he'
import Categories from '../categories'

const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5)

const Quiz = () => {
  const [questions, setQuestions] = useState([])
  const [currentQn, setCurrentQn] = useState(0)
  const [options, setOptions] = useState([])
  const [score, setScore] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedAnswer, setSelectedAnswer] = useState(null)

  const navigate = useNavigate()
  const location = useLocation()
  const { name, category, difficulty } = location.state || {}

  const category_id = category || 9 // fallback to general knowledge

  // Fetch quiz data
  useEffect(() => {
    fetch(`https://opentdb.com/api.php?amount=10&category=${category_id}&difficulty=${difficulty}&type=multiple`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load quiz.')
        return res.json()
      })
      .then((data) => {
        setQuestions(data.results)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [category_id, difficulty])

  useEffect(() => {
    if (questions.length > 0 && questions[currentQn]) {
      const q = questions[currentQn]
      const allOptions = shuffleArray([q.correct_answer, ...q.incorrect_answers])
      setOptions(allOptions)
      setSelectedAnswer(null)
    }
  }, [questions, currentQn])

  const handleAnswer = (opt) => {
    setSelectedAnswer(opt)
    if (opt === questions[currentQn].correct_answer) {
      setScore((prev) => prev + 1)
    }
  }

  const nextQuestion = () => {
    if (currentQn + 1 < questions.length) {
      setCurrentQn((prev) => prev + 1)
    } else {
      setCurrentQn(questions.length)
    }
  }

  const quitQuiz = () => {
    navigate('/')
  }

  if (loading) {
    return <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex justify-center items-center">Loading...</div>
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col justify-center items-center">
        <p className="text-red-400">{error}</p>
        <button onClick={quitQuiz} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Go Home</button>
      </div>
    )
  }

  if (currentQn >= questions.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold mb-4">Quiz Finished!</h2>
        <p className="text-lg mb-6">Score: {score} / {questions.length}</p>
        <button onClick={quitQuiz} className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">Play Again</button>
      </div>
    )
  }

  const currentQuestion = questions[currentQn]
  const progress = ((currentQn + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white px-4 py-8">
      <div className="max-w-2xl mx-auto p-6 border rounded-lg shadow bg-gray-700 bg-opacity-40 relative">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="font-semibold">Welcome, {name || 'Guest'}!</div>
          <button onClick={quitQuiz} className="text-red-400 hover:text-red-500 text-sm underline">Quit</button>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-gray-600 rounded-full mb-4">
          <div className="h-full bg-blue-500 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>

        {/* Question */}
        <div className="mb-4 text-lg font-semibold">
          Question {currentQn + 1} / {questions.length}
        </div>
        <h2 className="text-xl font-bold mb-6">{he.decode(currentQuestion.question)}</h2>

        {/* Options */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {options.map((opt, idx) => {
            const isCorrect = selectedAnswer && opt === currentQuestion.correct_answer
            const isWrong = selectedAnswer && opt === selectedAnswer && opt !== currentQuestion.correct_answer
            return (
              <button
                key={idx}
                onClick={() => handleAnswer(opt)}
                disabled={!!selectedAnswer}
                className={`p-4 rounded shadow text-left transition-all duration-200
                  ${
                    isCorrect
                      ? 'bg-green-500 text-white'
                      : isWrong
                      ? 'bg-red-500 text-white'
                      : 'bg-blue-200 text-black hover:bg-blue-300'
                  }
                `}
              >
                {he.decode(opt)}
              </button>
            )
          })}
        </div>

        {/* Next/Skip Button */}
        <div className="flex justify-between">
          <div className="text-sm text-gray-300">Score: {score}</div>
          <button
            onClick={nextQuestion}
            className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
            disabled={!selectedAnswer}
          >
            {currentQn + 1 === questions.length ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Quiz
