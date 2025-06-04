import { type JSX } from "react";
import { BrowserRouter } from "react-router";
import { ToDoPage } from "../pages/ToDoPage";
import Header from "../widgets/ui/header/Header";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Header />
      <ToDoPage />
    </BrowserRouter>
  );
}

export default App;
