import { CSSProperties } from 'react';
import { XYCoord, useDragLayer } from 'react-dnd';
import { getPieceStyles } from './utils';

const CustomDragLayer = () => {
  const {
    itemType,
    isDragging,
    item,
    initialOffset,
    currentOffset,
  } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  if (!isDragging) return null;

  // Function to get the drag layer styles
  const getItemStyles = (currentOffset: XYCoord | null): CSSProperties => {
    //console.log(item)
    if (!currentOffset) {
      return {
        display: 'none',
      };
    }

    const { x, y } = currentOffset;
    const transform = `translate(${x}px, ${y}px)`;
    return {
      ...getPieceStyles(item.index, false),
      pointerEvents: 'none',
      position: 'fixed',
      zIndex: 100,
      left: 0,
      top: 0,
      transform,
      WebkitTransform: transform,
    };
  };

  return (
    <div style={getItemStyles(currentOffset)}>
      {/* Render your custom preview component here */}
      <div style={{ opacity: isDragging ? 0.5 : 0 }}></div>
    </div>
  );
};

export default CustomDragLayer;