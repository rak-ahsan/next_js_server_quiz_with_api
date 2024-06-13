"use client"

import React, { useState, useEffect } from 'react';

interface Question {
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

interface Props {
    quizData: Question[];
}

const QuizApp: React.FC<Props> = ({ quizData }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [timeLeft, setTimeLeft] = useState(600);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime === 0) {
                    clearInterval(timer);
                    setShowResult(true);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleOptionSelect = (option: string) => {
        setSelectedOption(option);
    };

    const handleNextQuestion = () => {
        if (selectedOption === quizData[currentQuestion].correct_answer) {
            setScore(score + 1);
        }
        setSelectedOption('');
        if (currentQuestion + 1 < quizData.length) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowResult(true);
        }
    };

    const handleSkipQuestion = () => {
        setSelectedOption('');
        if (currentQuestion + 1 < quizData.length) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowResult(true);
        }
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setSelectedOption('');
        setScore(0);
        setShowResult(false);
        setTimeLeft(600);
    };

    return (
        <>
            {quizData?.length > 0 ? (
                <div style={{ marginTop: '10px', padding: '10px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                    {showResult ? (
                        <div style={{ textAlign: 'center' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Quiz Result</h2>
                            <p style={{ fontSize: '1.25rem' }}>Your Score: {score} / {quizData.length}</p>
                            <button
                                style={{ backgroundColor: '#1a9cff', color: 'white', fontWeight: 'bold', padding: '0.5rem 1rem', borderRadius: '4px', marginTop: '1rem', cursor: 'pointer' }}
                                onClick={resetQuiz}
                            >
                                Restart Quiz
                            </button>
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Question {currentQuestion + 1}</h2>
                            <p style={{ fontSize: '1.25rem', marginBottom: '1rem' }} dangerouslySetInnerHTML={{ __html: quizData[currentQuestion].question }}></p>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                {[...quizData[currentQuestion].incorrect_answers, quizData[currentQuestion].correct_answer].sort().map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleOptionSelect(option)}
                                        style={{
                                            padding: '0.5rem 1rem',
                                            borderRadius: '4px',
                                            marginRight: '8px',
                                            marginBottom: '8px',
                                            backgroundColor: selectedOption === option ? '#1a9cff' : '#f0f0f0',
                                            color: selectedOption === option ? 'white' : '#333',
                                            cursor: 'pointer',
                                            transition: 'background-color 0.3s ease',
                                            border: 'none',
                                        }}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                            <div style={{ marginTop: '1rem' }}>
                                <button
                                    style={{ backgroundColor: '#ff6666', color: 'white', fontWeight: 'bold', padding: '0.5rem 1rem', borderRadius: '4px', marginRight: '8px', cursor: 'pointer' }}
                                    onClick={handleNextQuestion}
                                    disabled={!selectedOption}
                                >
                                    {currentQuestion === quizData.length - 1 ? 'Finish' : 'Next Question'}
                                </button>
                                <button
                                    style={{ backgroundColor: '#666666', color: 'white', fontWeight: 'bold', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}
                                    onClick={handleSkipQuestion}
                                >
                                    Skip
                                </button>
                            </div>
                            <div style={{ marginTop: '1rem' }}>
                                <p>Time Left: {Math.floor(timeLeft / 60)} minutes {timeLeft % 60} seconds</p>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <p>No Data</p>
            )}
        </>
    );
}

export default QuizApp;
