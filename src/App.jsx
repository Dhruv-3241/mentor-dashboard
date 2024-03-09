import React, { useEffect, useState } from "react";
import "./App.css";
import { LeftNavbar } from "./components/LeftNavbar/LeftNavbar";
import { RightNavbar } from "./components/RightNavbar/RightNavbar";
import { Middle } from "./components/Middle/middle";
import { View } from "./components/ViewList/view";
import { Add } from "./components/Add/Add";
import { mentorUrl, studentUrl, url } from "./utils";
// import {Navbar} from "./components/Navbar/navbar"

const mentorName = "teja";

function App() {
  const [view, setView] = useState("middle");
  const [students, setStudents] = useState([]);
  const [canEdit, setCanEdit] = useState(true);

  useEffect(() => {
    fetch(mentorUrl(`${mentorName}/students`))
      .then((res) => res.json())
      .then((data) => {
        setStudents(data.data);
      });

    fetch(mentorUrl(`${mentorName}/islock`))
      .then((res) => res.json())
      .then((data) => {
        setCanEdit(!data.message);
      });
  }, []);

  return (
    <div className="App">
      <div className="left">
        <div className="part1">
          <LeftNavbar setView={setView} />
        </div>
        <div className="part2">
          {view === "middle" ? (
            <Middle students={students} setStudents={setStudents} canEdit={canEdit} />
          ) : view === "view" ? (
            <View
              students={students}
              setStudents={setStudents}
              canEdit={canEdit}
              setCanEdit={setCanEdit}
              mentorName={mentorName}
              
            />
          ) : (
            <Add students={students} setStudents={setStudents} mentorName={mentorName}/>
          )}
        </div>
      </div>
      <div className="right">
        <RightNavbar />
      </div>
      {/* <Navbar/> */}
    </div>
  );
}

export default App;
