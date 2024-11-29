import "./App.css";
import { Route, Routes } from "react-router-dom";
import GraphPage from "./GraphPage";
import MoleculeViewer from "./components/MoleculeViewer";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MoleculeViewer />} />
        <Route path="/graph" element={<GraphPage />} />
      </Routes>
    </>
  );
}

export default App;
