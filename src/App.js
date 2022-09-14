import "./App.css";

import { ToastContainer } from "react-toastify";

import Navbar from "./components/Navbar";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <ToastContainer theme="colored" />

      <Navbar />
      <Home />
    </div>
  );
}

export default App;
