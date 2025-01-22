export default function Board({board,handleClick}) {
  return (
    <div className="grid grid-cols-3">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`flex justify-center items-center bg-gray-800 text-7xl border border-white cursor-pointer w-20 h-20 md:w-36 md:h-36 ${
              cell === "X" ? "text-red-500" : "text-green-500"
            }`}
            onClick={() => handleClick(rowIndex, colIndex)}
          >
            {cell}
          </div>
        ))
      )}
    </div>
  );
}
