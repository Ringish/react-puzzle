import { useDrop } from "react-dnd";
import popcorn from "./popcorn.jpeg";

const Board = () => {
  const [_, drop] = useDrop(() => ({
    accept: "PIECE",
    drop: (item, monitor) => {
      return { name: "Board", position: monitor.getClientOffset() };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <div ref={drop} style={{ width: "500px", border: "1px solid #000" }}>
      <img
        style={{
          border: "1px solid #000",
          filter: "blur(20px)",
        }}
        src={popcorn}
        alt="poppisar"
      />
    </div>
  );
};

export default Board;
