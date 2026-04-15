import { useState, useCallback, useEffect } from "react";

interface WordSearchLevelProps {
  onNext: () => void;
}

const WORDS = ["BBG", "FOREVER", "TOGETHER", "SEVEN", "LIFECYCLE"];
const GRID_SIZE = 10;

type Direction = [number, number];
const DIRECTIONS: Direction[] = [
  [0, 1], [1, 0], [1, 1], [0, -1], [1, -1], [-1, 0], [-1, 1], [-1, -1],
];

function generateGrid(): { grid: string[][]; placements: Map<string, number[][]> } {
  const grid: string[][] = Array.from({ length: GRID_SIZE }, () =>
    Array.from({ length: GRID_SIZE }, () => "")
  );
  const placements = new Map<string, number[][]>();

  for (const word of WORDS) {
    let placed = false;
    for (let attempt = 0; attempt < 200 && !placed; attempt++) {
      const dir = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
      const row = Math.floor(Math.random() * GRID_SIZE);
      const col = Math.floor(Math.random() * GRID_SIZE);

      const cells: number[][] = [];
      let fits = true;
      for (let i = 0; i < word.length; i++) {
        const r = row + dir[0] * i;
        const c = col + dir[1] * i;
        if (r < 0 || r >= GRID_SIZE || c < 0 || c >= GRID_SIZE) { fits = false; break; }
        if (grid[r][c] !== "" && grid[r][c] !== word[i]) { fits = false; break; }
        cells.push([r, c]);
      }

      if (fits) {
        cells.forEach(([r, c], i) => { grid[r][c] = word[i]; });
        placements.set(word, cells);
        placed = true;
      }
    }
  }

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (grid[r][c] === "") grid[r][c] = letters[Math.floor(Math.random() * 26)];
    }
  }

  return { grid, placements };
}

const WordSearchLevel = ({ onNext }: WordSearchLevelProps) => {
  const [{ grid, placements }] = useState(generateGrid);
  const [selected, setSelected] = useState<number[][]>([]);
  const [foundWords, setFoundWords] = useState<Set<string>>(new Set());
  const [foundCells, setFoundCells] = useState<Set<string>>(new Set());
  const [isDragging, setIsDragging] = useState(false);

  const cellKey = (r: number, c: number) => `${r}-${c}`;

  const checkWord = useCallback(
    (sel: number[][]) => {
      for (const [word, cells] of placements.entries()) {
        if (foundWords.has(word)) continue;
        if (cells.length !== sel.length) continue;

        const forward = cells.every(([r, c], i) => sel[i]?.[0] === r && sel[i]?.[1] === c);
        const backward = cells.every(([r, c], i) => sel[sel.length - 1 - i]?.[0] === r && sel[sel.length - 1 - i]?.[1] === c);

        if (forward || backward) return word;
      }
      return null;
    },
    [placements, foundWords]
  );

  // 💻 DRAG START
  const handleCellDown = (r: number, c: number) => {
    setIsDragging(true);
    setSelected([[r, c]]);
  };

  // 💻 DRAG MOVE
  const handleCellEnter = (r: number, c: number) => {
    if (!isDragging) return;

    if (selected.length === 1) {
      setSelected((prev) => [...prev, [r, c]]);
    } else {
      const dr = selected[1][0] - selected[0][0];
      const dc = selected[1][1] - selected[0][1];
      const expectedR = selected[0][0] + dr * selected.length;
      const expectedC = selected[0][1] + dc * selected.length;

      if (r === expectedR && c === expectedC) {
        setSelected((prev) => [...prev, [r, c]]);
      }
    }
  };

  // 📱 TAP MODE (NEW)
  const handleTap = (r: number, c: number) => {
    if (isDragging) return;

    if (selected.length === 0) {
      setSelected([[r, c]]);
    } else if (selected.length === 1) {
      setSelected((prev) => [...prev, [r, c]]);
    } else {
      const dr = selected[1][0] - selected[0][0];
      const dc = selected[1][1] - selected[0][1];
      const expectedR = selected[0][0] + dr * selected.length;
      const expectedC = selected[0][1] + dc * selected.length;

      if (r === expectedR && c === expectedC) {
        setSelected((prev) => [...prev, [r, c]]);
      }
    }
  };

  // RELEASE / DONE
  const handleRelease = () => {
    setIsDragging(false);
    const word = checkWord(selected);

    if (word) {
      const newFound = new Set(foundWords);
      newFound.add(word);
      setFoundWords(newFound);

      const newCells = new Set(foundCells);
      selected.forEach(([r, c]) => newCells.add(cellKey(r, c)));
      setFoundCells(newCells);
    }

    setSelected([]);
  };

  useEffect(() => {
    if (foundWords.size === WORDS.length) {
      setTimeout(onNext, 1500);
    }
  }, [foundWords, onNext]);

  const isSelected = (r: number, c: number) =>
    selected.some(([sr, sc]) => sr === r && sc === c);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">

      <p className="text-sm mb-4">
        💻 Drag OR 📱 tap letters and press Done
      </p>

      <div
        className="inline-grid gap-1 mb-6"
        style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 36px)` }}
        onMouseUp={handleRelease}
        onMouseLeave={handleRelease}
        onTouchEnd={handleRelease}
      >
        {grid.map((row, r) =>
          row.map((letter, c) => (
            <div
              key={cellKey(r, c)}
              className={`word-cell ${isSelected(r, c) ? "selected" : ""} ${foundCells.has(cellKey(r, c)) ? "found" : ""}`}
              onMouseDown={() => handleCellDown(r, c)}
              onMouseEnter={() => handleCellEnter(r, c)}
              onClick={() => handleTap(r, c)} // 📱 support
              onTouchStart={() => handleTap(r, c)}
            >
              {letter}
            </div>
          ))
        )}
      </div>

      {/* 📱 DONE BUTTON */}
      <button
        onClick={handleRelease}
        className="px-4 py-2 bg-pink-500 text-white rounded-lg"
      >
        Done ✅
      </button>
    </div>
  );
};

export default WordSearchLevel;
