import React, { useState, useEffect } from 'react';

export default function App() {
  const [inputValue, setInputValue] = useState(60); // user input in seconds
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const startTimer = () => {
    if (timeLeft > 0) setIsRunning(true);
  };
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(inputValue); // reset to chosen duration
  };

  // Progress ring logic: fraction of time left
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const progress = timeLeft / inputValue; // fraction remaining
  const offset = circumference - progress * circumference;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6">⏱ Configurable Countdown Timer</h1>

      {/* Input for custom duration */}
      <div className="mb-6">
        <input
          type="number"
          min="1"
          value={inputValue}
          onChange={(e) => setInputValue(Number(e.target.value))}
          className="px-3 py-2 rounded text-black"
        />
        <button
          onClick={() => {
            setIsRunning(false);
            setTimeLeft(inputValue);
          }}
          className="ml-2 px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 active:scale-95 transition-transform"
        >
          Set Duration
        </button>
      </div>

      {/* Progress ring with countdown digits */}
      <div className="relative mb-6">
        <svg className="w-40 h-40 transform -rotate-90">
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="gray"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke={isRunning ? 'limegreen' : timeLeft === 0 ? 'red' : 'gold'}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-4xl font-mono">
          {timeLeft}s
        </div>
      </div>

      {/* Control buttons */}
      <div className="space-x-4">
        <button
          onClick={startTimer}
          disabled={timeLeft === 0}
          className="px-4 py-2 bg-green-500 rounded hover:bg-green-600 active:scale-95 transition-transform disabled:opacity-50"
        >
          Start
        </button>
        <button
          onClick={pauseTimer}
          className="px-4 py-2 bg-yellow-500 rounded hover:bg-yellow-600 active:scale-95 transition-transform"
        >
          Pause
        </button>
        <button
          onClick={resetTimer}
          className="px-4 py-2 bg-red-500 rounded hover:bg-red-600 active:scale-95 transition-transform"
        >
          Reset
        </button>
      </div>
    </div>
  );
}