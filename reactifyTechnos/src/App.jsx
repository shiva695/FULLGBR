import Header from "./components/general-components/Header";
import "./App.css";
import SectionCard from "./components/sections/SectionCard";
import { Route, Routes } from "react-router-dom";
import ReactDragAndDrop from "./components/pages/ReactDragAndDrop";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path={"/"} element={<SectionCard />} />
        <Route path={"/react-drag-drop"} element={<ReactDragAndDrop />} />
      </Routes>
    </>
  );
}

export default App;
