import "./App.css";
import Puzzle from "./puzzle";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { MouseTransition, MultiBackend, TouchTransition } from "react-dnd-multi-backend";

const options = {
  backends: [
    {
      backend: HTML5Backend,
      transition: MouseTransition
      // by default, will dispatch a duplicate `mousedown` event when this backend is activated
    },
    {
      backend: TouchBackend,
      // Note that you can call your backends with options
      options: { enableMouseEvents: true },
      transition: TouchTransition,
      // will not dispatch a duplicate `touchstart` event when this backend is activated
      skipDispatchOnTransition: true
    }
  ]
};

function App() {
  return (
    <div className="App">
      <DndProvider backend={MultiBackend} options={options}>
        <Puzzle numberOfPieces={25} />
      </DndProvider>
    </div>
  );
}

export default App;
