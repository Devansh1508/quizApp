import React from 'react';
import { FaPlay } from 'react-icons/fa';

const QuizStart = ({ onStart }) => {
  return (
    <div className="bg-white/90 backdrop-blur-md rounded-lg shadow-xl p-8 max-w-md w-full text-center border-2 rounded-xl m-10">
      <h1 className="text-4xl font-bold text-primary mb-6">Quiz Challenge</h1>
      <p className="text-gray-600 mb-8">
        Test your knowledge and earn points! Are you ready to begin?
      </p>
      <button
        onClick={onStart}
        className="flex items-center justify-center gap-2 bg-primary hover:bg-secondary font-bold py-3 px-6 rounded-full transition-all transform hover:scale-105"
      >
        <FaPlay />
        Start Quiz
      </button>
    </div>
  );
};

export default QuizStart;