import "./App.css";
import { useState } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  const [toggle, setToggle] = useState(true);

  return (
    <>
      {toggle ? (
        <Register setToggle={setToggle} />
      ) : (
        <Login setToggle={setToggle} />
      )}
    </>
  );
}

export default App;
