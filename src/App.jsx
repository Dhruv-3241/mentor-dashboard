import React, { useState } from "react";
import "./App.css";
import { LeftNavbar } from "./components/LeftNavbar/LeftNavbar";
import { RightNavbar } from "./components/RightNavbar/RightNavbar";
import { Middle } from "./components/Middle/middle";
import { View } from "./components/ViewList/view";
import { Add } from "./components/Add/Add";

function App() {
  const [view, setView] = useState("middle");


  return (
    <div className="App">
      <div className="left">
        <div className="part1">
          <LeftNavbar setView={setView} />
        </div>
        <div className="part2">
          {
            view === "middle" ? <Middle /> : view === "view"? <View />: <Add/>
          }
        </div>
      </div>
      <div className="right">
        <RightNavbar />
      </div>
    </div>
  );
}

export default App;
