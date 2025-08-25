import "./App.css";
import {ReactFlowProvider} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import Header from "./components/header/Header";
import DndFlow from "./pages/dndFlow/DndFlow";

function App() {
  return (
    <div style={{height: "100vh", width: "100%", position: "relative"}}>
      <Header />

      <ReactFlowProvider>
        <DndFlow />
      </ReactFlowProvider>
    </div>
  );
}

export default App;
