import { useEffect, useState } from "react";
import Board from "./Board";
import CustomDragLayer from "./CustomDragLayer";
import Piece from "./Piece";
import theatre from "./theatre.png";

interface Props {
  numberOfPieces: number;
}

const Puzzle = ({ numberOfPieces }: Props) => {
  const [pieces, setPieces] = useState<number[]>([]);
  const [piecesInPlace, setPiecesInPlace] = useState(0);

  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    setPieces(shuffleArray([...Array(numberOfPieces)].map((_, i) => i)));
  }, [numberOfPieces]);

  if (piecesInPlace === numberOfPieces) {
    return (
      <div
        style={{
          backgroundImage: `url("${theatre}")`,
          backgroundSize: "cover",
          textAlign: "center",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: 900,
          fontSize: "40px",
          maxHeight: "560px",
        }}
      >
        Vi bjuder på mat och bio
      </div>
    );
  }

  return (
    <div style={{ display: "flex" }}>
      <Board />
      <CustomDragLayer />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {pieces.map((_, i: number) => (
          <Piece
            key={_}
            index={_}
            addPieceInPlace={() =>
              setPiecesInPlace((prevPiecesInPlace) => prevPiecesInPlace + 1)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Puzzle;
