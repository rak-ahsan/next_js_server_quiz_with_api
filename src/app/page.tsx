import React from 'react'
import QuizApp from '../component/quiz'


async function getData() {
  const res = await fetch('https://opentdb.com/api.php?amount=20', { cache: 'no-store' })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

const page = async () => {
  const data = await getData()
  const quizData = data.results;

  return (
    <div className='container'>
      <QuizApp quizData={quizData} />
    </div>
  )
}

export default page