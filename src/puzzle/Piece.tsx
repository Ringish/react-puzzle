import { useState } from "react";
import { useDrag } from "react-dnd";
import { PIECE_HEIGHT, PIECE_WIDTH, getOffsetByIndex, getPieceStyles } from "./utils";

interface DropResult {
  name: string;
  position: { x: number; y: number };
}

interface Props {
  index: number;
  addPieceInPlace: () => void;
}

const Piece = ({ index, addPieceInPlace }: Props) => {
  const [offsetX, offsetY] = getOffsetByIndex(index);
  const [_, drag] = useDrag(() => ({
    type: "PIECE",
    item: { index },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      if (item && dropResult) {
        const {
          position: { x, y },
        } = dropResult;
        const offset = 15;
        if (
          x > offsetX - offset &&
          x < offsetX + width + offset &&
          y > offsetY - offset &&
          y < offsetY + height + offset
        ) {
          setInPlace(true);
          console.log("GO")
          addPieceInPlace();
        }
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));
  const [inPlace, setInPlace] = useState(false);
  const width = PIECE_WIDTH;
  const height = PIECE_HEIGHT;
  const style = getPieceStyles(index, inPlace);

  if (inPlace) {
    style.left = `${offsetX}px`;
    style.top = `${offsetY}px`;
    style.transform = "none";
  }

  return <div id={`index-${index}`} ref={drag} style={style} />;
};

export default Piece;
