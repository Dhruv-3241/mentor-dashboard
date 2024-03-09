import { Form } from "../Form/Form";
import "./Card.css";
import React, { useState } from "react";
import studentprofile from "../../assets/middle/icons8-male-user-24.png";
import { Box, TextField, Typography } from "@mui/material";  
import {
  Backdrop,
  CircularProgress,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import { mentorUrl, studentUrl, url } from "../../utils";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const topics = [
  "Ideation",
  "Evaluation",
  "Pitch",
  "Uniqueness",
  "Research",
  "Design",
];

export default function Card({
  student_name,
  roll_no,
  total_marks,
  handleClose,
  handleOpen,
  open,
  handleClose1,
  handleOpen1,
  open1,
  marks,
  idx,
  students,
  setStudents,
  canEdit,
}) {
  console.log(marks);
  const handleDelete = (idx) => {
    const newStudents = students.filter((student, index) => index !== idx);
    console.log(students[idx].roll_no);
    const body = {
      mentor: students[idx].mentor,
      rollno: students[idx].roll_no,
    };
    fetch(mentorUrl("remove"), {
      method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
      }
    })
      .then((d) => d.json())
      .then((d) => console.log(d));
    setStudents(newStudents);
    handleClose1(idx);
  };
  const [values, setValues] = useState(marks.map((x) => x.value));

  const handleEdit = (idx) => {
    const newStudents = [...students];
    newStudents[idx].marks = values.map((x, i) => {
      return {
        name: topics[i],
        value: Number(x),
      };
    });
      const body = JSON.stringify({
          marks: values.map(Number),
      });
      console.log(body)
      fetch(studentUrl(`${roll_no}/marks`), {
          method: "POST",
          body,
          headers: {
                "Content-Type": "application/json"
          }
      }).then(d => d.json()).then(d => console.log(d));
      setStudents(newStudents);
      handleClose(idx)
  };

  const Form = ({ student_name, marks }) => {
    console.log({ student_name, marks });

    return (
      <Box>
        <Typography variant="h6" color={"black"}>
          {student_name}
        </Typography>
        <br />
        <br />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 2.5,
          }}
        >
          {marks.map((mark, index) => (
            <TextInput
              mark={mark}
              value={values}
              setValue={setValues}
              idx={index}
              key={index}
            />
          ))}
        </Box>
      </Box>
    );
  };

  function TextInput({ mark, value, setValue, idx }) {
    const [v, setV] = useState(value[idx]);

    const handleChange = (val) => {
      console.log(val);
      if (val > 10) val = 10;
      if (val < 0) val = 0;
      setV(val);
      const newValue = [...value];
      newValue[idx] = val;
      setValue(newValue);
    };

    return (
      <TextField
        label={mark.name}
        value={v}
        type="number"
        variant="outlined"
        onChange={(e, val) => {
          handleChange(e.target.value);
        }}
        sx={
          {
            // padding: 1.5
          }
        }
      />
    );
  }

  return (
    <div className="card">
      <div className="stuimg">
        <img src={studentprofile} alt="" className="prpic" />
      </div>
      <div className="name">
        <div className="tablename">Name:</div>
        <div className="details">{student_name}</div>
      </div>
      <div className="rollno">
        <div className="tablename">Roll No:</div>
        <div className="details">{roll_no}</div>
      </div>
      <div className="marks">
        <div className="tablename">Marks:</div>
        <div className="details">{total_marks}</div>
      </div>
      {canEdit && (
        <div className="diffbtn">
          <button onClick={(e) => handleOpen(idx)} className="mentorBtn1">
            Edit
          </button>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open[idx]}
          >
            <CircularProgress color="inherit" />

            <Dialog
              open={open[idx]}
              TransitionComponent={Transition}
              keepMounted
              onClose={(e) => handleClose(idx)}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle>{"Modify Student Data"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  <Form marks={marks} student_name={student_name} />
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={(e) => handleClose(idx)}>Cancel</Button>
                <Button onClick={(e) => handleEdit(idx)}>Modify</Button>
              </DialogActions>
            </Dialog>
          </Backdrop>
          <button onClick={(e) => handleOpen1(idx)} className="mentorBtn2">
            Delete
          </button>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open1[idx]}
            // onClick={handleClose1}
          >
            <CircularProgress color="inherit" />
            <Dialog
              open={open1[idx]}
              TransitionComponent={Transition}
              keepMounted
              onClose={(e) => handleClose1(idx)}
              aria-describedby="alert-dialog-slide-description"
            >
              {/* <DialogTitle>{"Use Google's location service?"}</DialogTitle> */}
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  Are you sure you want to <b>delete</b> this student?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={(e) => handleClose1(idx)}>No</Button>
                <Button onClick={(e) => handleDelete(idx)}>Yes</Button>
              </DialogActions>
            </Dialog>
          </Backdrop>
        </div>
      )}
    </div>
  );
}
