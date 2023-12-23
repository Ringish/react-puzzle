import { CSSProperties } from "react";
import popcorn from "./popcorn.jpeg";

export const PIECE_WIDTH = 100;
export const PIECE_HEIGHT = 118;

export const getOffsetByIndex = (index: number) => {
  const offsetX = (index % 5) * PIECE_WIDTH;
  const offsetY = Math.floor(index / 5) * PIECE_HEIGHT;

  return [offsetX, offsetY];
};

export const getPieceStyles = (index: number, inPlace: boolean) => {
  const [offsetX, offsetY] = getOffsetByIndex(index);
  const styles: CSSProperties = {
    cursor: "grab",
    backgroundImage: `url("${popcorn}")`,
    width: "100px",
    height: "118px",
    borderRadius: inPlace ? 0 : "20px",
    backgroundPosition: `-${offsetX}px -${offsetY}px`,
    boxShadow: inPlace ? "none" : "0px 3px 8px 1px rgba(0,0,0,0.5)",
    position: inPlace ? "absolute" : "relative",
    left: inPlace ? `${offsetX}px` : "auto",
    top: inPlace ? `${offsetY}px` : "auto",
    transform: inPlace
      ? "none"
      : `rotate(${index % 2 === 0 ? "-" : ""}${Math.floor(
          Math.random() * (index + 1)
        )}deg)`,
  };

  return styles;
};
