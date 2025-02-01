import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import QuizStart from './components/QuizStart';
import Question from './components/Question';
import Results from './components/Results';
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'
import { Toaster, toast } from 'react-hot-toast';
import bg from '../src/assets/bg.jpg'
import { successMessages, encouragementMessages } from './responses/messageResponse';


function App() {
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [gameState, setGameState] = useState('start'); 
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [timeline,setTimeline] = useState(0);
  const [visible, setVisible] = useState(false);
  const [activeOption, setActiveOption] = useState(-1);
  const [isWrong,setIsWrong]=useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    fetchQuizData();
  }, []);

  const fetchQuizData = async () => {
    try {
      const response = await axios.get('/api/Uw5CrX');
      const data = response.data;
      const questions = data.questions;
  
      const formattedQuestions = questions.map(question => {
        const options = question.options;
        const description = question.description;
        const detailedSolution = question.detailed_solution;
        const topic = question.topic;
  
        return { options, description, detailedSolution, topic, points: 10 };
      });
  
      console.log(formattedQuestions);
      setQuizData(formattedQuestions);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error('Error fetching quiz data:', err);
    }
  };

  const startQuiz = () => {
    setGameState('playing');
    setCurrentQuestion(0);
    setScore(0);
    setCorrectAnswers(0);
    setTimeline(0);
    setVisible(true);
    setActiveOption(-1);
  };

  const handleAnswer = (selectedAnswer) => {
    const currentQ = quizData[currentQuestion];
    if (selectedAnswer.is_correct) {
      setScore((prev) => prev + currentQ.points);
      setCorrectAnswers((prev) => prev + 1);
      nextQuestion();
      const randomIndex = Math.floor(Math.random() * successMessages.length);
      toast.success(successMessages[randomIndex]);
    }
    else {
      const randomIndex = Math.floor(Math.random() * encouragementMessages.length);
       toast(encouragementMessages[randomIndex]);
       setIsWrong(true);
      }
  };

  const nextQuestion=()=>{
    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setGameState('results');
    }
    setTimeline(timeline+1);
    setActiveOption(-1);
    setIsWrong(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary"></div>
      </div>
    );
  }

  const getTotalPoints = () => {
    return quizData.reduce((sum, question) => sum + question.points, 0);
  };

  return (
    <div>
      <Toaster/>
    <img src={bg} alt="bg" className="fixed top-0 left-0 w-[100vw] h-[100vh] object-cover z-0"/>
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative "
    >
      <div className="absolute inset-0 bg-black/10 w-[100vw] h-[100vh]"></div>
      
      <div className="relative z-10 flex justify-center">
        {gameState === 'start' && <QuizStart onStart={startQuiz} />}
        
        {gameState === 'playing' && quizData && (
          <Question
            question={quizData[currentQuestion]}
            onAnswer={handleAnswer}
            currentQuestion={currentQuestion}
            totalQuestions={quizData.length}
            onNext={nextQuestion}
            setActiveOption={setActiveOption}
            activeOption={activeOption}
            isWrong={isWrong}
          />
        )}
        
        {gameState === 'results' && (
          <Results
            score={score}
            totalPoints={getTotalPoints()}
            correctAnswers={correctAnswers}
            totalQuestions={quizData.length}
            onRestart={startQuiz}
          />
        )}
      </div>
    </div>
    {timeline>=quizData.length && <Confetti width={width} height={height} recycle={false} numberOfPieces={500}/>}
    </div>
  );
}

export default App;