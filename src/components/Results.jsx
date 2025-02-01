import React from "react";
import Confetti from "react-confetti";
import { FaRedo } from "react-icons/fa";

const Results = ({
  score,
  totalPoints,
  correctAnswers,
  totalQuestions,
  onRestart,
}) => {
  const percentage = (score / totalPoints) * 100;
  const isPerfect = correctAnswers === totalQuestions;


  return (
    <div className="relative">
      {percentage >= 70 && <Confetti />}
      <div className="bg-white/90 backdrop-blur-md rounded-lg shadow-xl p-8 max-w-md w-full text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Quiz Complete!
        </h2>

        <div className="space-y-4 mb-8">
          <div className="text-4xl font-bold text-primary">
            {score}/{totalPoints}
          </div>
          <p className="text-gray-600">
            You got {correctAnswers} out of {totalQuestions} questions correct
          </p>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className={`h-4 rounded-full ${
                percentage >= 70 ? "bg-green-500" : "bg-red-500"
              }`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <p
            className={`font-semibold ${
              percentage >= 70 ? "text-green-500" : "text-red-500"
            }`}
          >
            {isPerfect
              ? "Perfect Score! 🎉"
              : percentage >= 70
              ? "Great job! 🌟"
              : "Keep practicing! 💪"}
          </p>
        </div>

        <button
          onClick={onRestart}
          className="flex items-center justify-center gap-2 mx-auto bg-primary hover:bg-secondary text-white font-bold py-3 px-6 rounded-full transition-all transform hover:scale-105"
        >
          <FaRedo />
          Try Again
        </button>

      </div>
    </div>
  );
};

export default Results;
