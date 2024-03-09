import React, { useEffect } from "react";
import "./middle.css";
import Card from "../Card/Card";
import { url } from "../../utils";

const marks = [
  {
    name: "Ideation",
    value: 9,
  },
  {
    name: "Evaluation",
    value: 8,
  },
  {
    name: "Pitch",
    value: 9,
  },
  {
    name: "Uniqueness",
    value: 8,
  },
  {
    name: "Research",
    value: 8,
  },
  {
    name: "Design",
    value: 5,
  },
  {
    name: "Implementation",
    value: 9,
  },
  {
    name: "Technical Proficiency",
    value: 9,
  },
  {
    name: "Sustainability of Work",
    value: 7,
  },
  {
    name: "Documentation & Report",
    value: 8,
  },
  {
    name: "Feedback & Reflection",
    value: 6,
  },
];

export const Middle = ({ students, setStudents,canEdit }) => {
    console.log(students);
  const [open, setOpen] = React.useState([false, false, false, false]);
  const [open1, setOpen1] = React.useState([false, false, false, false]);


  const handleClose = (idx) => {
    const newOpen = [...open];
    newOpen[idx] = false;
    setOpen(newOpen);
  };
  const handleClose1 = (idx) => {
    const newOpen1 = [...open1];
    newOpen1[idx] = false;
    setOpen1(newOpen1);
  };
  const handleOpen = (idx) => {
    const newOpen = [...open];
    newOpen[idx] = true;
    setOpen(newOpen);
  };
  const handleOpen1 = (idx) => {
    const newOpen1 = [...open1];
    newOpen1[idx] = true;
    setOpen1(newOpen1);
  };


  return (
    <div className="middle">
      <div className="head">
        <h1>Welcome to Mentor DashBoard</h1>
      </div>
      <div className="cont">
        <div className="row">
          {students.slice(0, 2).map((student, idx) => {
            console.log(student);

            student.total_marks = student.marks.reduce((acc, mark) => {
              return acc + mark.value;
            }, 0);
            if (isNaN(student.total_marks)) {
              student.total_marks = "N/A";
            }

            return (
              <Card
                student_name={student.name}
                roll_no={student.roll_no}
                idx={idx}
                total_marks={student.total_marks}
                handleOpen={handleOpen}
                handleClose={handleClose}
                open={open}
                handleClose1={handleClose1}
                handleOpen1={handleOpen1}
                open1={open1}
                marks={student.marks}
                students={students}
                    setStudents={setStudents}
                    canEdit={canEdit}
              />
            );
          })}
        </div>
        <div className="row">
          {students.slice(2, 4).map((student, idx) => {
            student.total_marks = student.marks.reduce((acc, mark) => {
              return acc + mark.value;
            }, 0);
            if (isNaN(student.total_marks)) {
              student.total_marks = "N/A";
            }
            return (
              <Card
                student_name={student.name}
                roll_no={student.roll_no}
                idx={idx + 2}
                total_marks={student.total_marks}
                handleOpen={handleOpen}
                handleClose={handleClose}
                open={open}
                handleClose1={handleClose1}
                handleOpen1={handleOpen1}
                open1={open1}
                marks={student.marks}
                students={students}
                    setStudents={setStudents}
                    canEdit={canEdit}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
