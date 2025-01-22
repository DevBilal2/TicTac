import { Link } from "react-router-dom";
import Button from "../Components/button";
import { useState } from "react";

export default function HomePage() {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  return (
    <div className="bg-black h-screen text-white">
      <div className="flex justify-center items-center h-[20%]">
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-lg animate-pulse">
          Tic Tac Toe
        </h1>
      </div>
      <div className="flex flex-col justify-center items-center h-[70%] gap-6">
        <Link to="/players">
          <Button>Two Players</Button>
        </Link>
        <Link
          to="/players"
          state={{ selectedDifficulty: selectedOption, gamemode: "bot" }}
        >
          <Button disabled={!selectedOption}>Single Player</Button>
        </Link>
        <p
          className={`
            text-yellow-500
          }`}
        >
          Select Difficulty level
        </p>
        <div className="flex gap-8 justify-center w-full items-center">
          {["Easy", "Hard"].map((item) => (
            <label
              key={item}
              className={`flex flex-col gap-2 ${
                selectedOption === item
                  ? item === "Easy"
                    ? "text-green-500"
                    : "text-red-500"
                  : "text-white"
              }`}
            >
              {item}
              <input
                type="radio"
                name="difficulty"
                value={item}
                checked={selectedOption === item}
                onChange={handleChange}
                className="h-4"
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
