"use client";
import { useState } from "react";

const GridCells = ({
  handleCellClick,
}: {
  handleCellClick: (rowIndex: number, colIndex: number) => void;
}) => {
  const [grid, setGrid] = useState(
    Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => 0))
  );

  const handleOnMouseOver = (rowIndex: number, colIndex: number) => {
    // Toggle the value (0 or 1) when a cell is clicked
    const newGrid = grid.map((row, rowIdx) =>
      row.map((cellValue, colIdx) =>
        rowIdx <= rowIndex && colIdx <= colIndex ? 1 : 0
      )
    );
    setGrid(newGrid);
  };

  return (
    <div className="flex w-[88px] flex-wrap flex-row items-center self-center">
      {grid.map((row, rowIndex) =>
        row.map((cellValue, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`h-4 w-4 cursor-pointer border-2 m-[0.5px] border-border  ${
              cellValue === 1 ? "bg-foreground" : "bg-background"
            }`}
            onClick={() => handleCellClick(rowIndex, colIndex)}
            onMouseOver={() => handleOnMouseOver(rowIndex, colIndex)}
          ></div>
        ))
      )}
    </div>
  );
};

export default GridCells;
