import React from 'react'
import QuizApp from '../component/quiz'
import { NextResponse } from 'next/server'


async function getData() {
  const res = await fetch('https://opentdb.com/api.php?amount=20', { next: { revalidate: 600 } })

  if (!res.ok) {
    return NextResponse.json('error')
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