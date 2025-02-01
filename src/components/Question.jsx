import React from "react";

const Question = ({
  question,
  onAnswer,
  currentQuestion,
  totalQuestions,
  onNext,
  activeOption,
  setActiveOption,
  isWrong,
}) => {

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-lg shadow-xl p-8 max-w-2xl w-full">
      {!isWrong && (
        <div>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-500">
                Question {currentQuestion + 1} of {totalQuestions}
              </span>
              <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">
                Points: {question.points}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 max-sm:text-[20px]">
              {question.description}
            </h2>
          </div>

          <div className="grid gap-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveOption(index);
                }}
                className={`${
                  activeOption === index
                    ? "border-primary bg-primary"
                    : ""
                } text-left p-4 text-xl border-2 border-gray-200 rounded-lg  hover:bg-primary/5 transition-all`}
              >
                {option.description}
              </button>
            ))}
          </div>
          <div className="flex justify-end m-4">
            <button
              onClick={() => {
                onAnswer(question.options[activeOption]);
              }}
              className="flex items-center text-white text-lg justify-center gap-2 bg-primary hover:bg-secondary font-bold py-3 px-6 rounded-full transition-all transform hover:scale-105"
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {isWrong && (
        <div className="mb-6">
          <div className="w-[100%] text-2xl mb-5 font-bold text-center">
          Great effort! Every <span className="text-[#c92828]">wrong answer</span> brings you closer to the right one!
          </div>
          <p className="text-lg text-gray-800 mb-6">
            {question.detailedSolution}
            
          </p>
          <div className="flex justify-end m-4">
          <button
            onClick={() => {
              onNext();
            }}
            className="flex items-center text-lg justify-center gap-2 bg-primary hover:bg-secondary font-bold py-3 px-6 rounded-full transition-all transform hover:scale-105"
          >
            next
          </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Question;
