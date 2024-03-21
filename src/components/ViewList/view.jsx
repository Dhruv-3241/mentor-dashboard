import "./view.css";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import {
  Box,
  Typography,
  TableContainer,
  Slide,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
  Button,
  CircularProgress,
  Backdrop,
  Paper,
  TableRow,
  TableHead,
  TableCell,
  tableCellClasses,
  TableBody,
  Table,
} from "@mui/material";
import { deepClone } from "@mui/x-data-grid/utils/utils";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { mentorUrl } from "../../utils";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(Student, idea, evalu, pitch, unique, research, design) {
  console.log("idea", idea);
  console.log("Result", (idea + evalu + pitch + unique + research + design));
  const obj =  {
    Student,
    Ideation: idea ?? "N/A",
    Evaluation: evalu ?? "N/A",
    Pitch: pitch ?? "N/A",
    Uniqueness: unique ?? "N/A",
    Research: research ?? "N/A",
    Design: design ?? "N/A",
  };

  obj["Total Marks"] = isNaN(obj.Ideation + obj.Evaluation + obj.Pitch + obj.Uniqueness + obj.Research + obj.Design) ? "N/A" : obj.Ideation + obj.Evaluation + obj.Pitch + obj.Uniqueness + obj.Research + obj.Design;
  console.log(obj)
  return obj;
}

export const View = ({
  students,
  setStudents,
  canEdit,
  setCanEdit,
  mentorName,
}) => {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const mStudents = students.map((student) =>
    createData(
      student.name,
      student.marks[0]?.value,
      student.marks[1]?.value,
      student.marks[2]?.value,
      student.marks[3]?.value,
      student.marks[4]?.value,
      student.marks[5]?.value
    )
  );
  const [frows, setFrows] = React.useState(
    students.map((student) =>
      createData(
        student.name,
        student.marks[0]?.value,
        student.marks[1]?.value,
        student.marks[2]?.value,
        student.marks[3]?.value,
        student.marks[4]?.value,
        student.marks[5]?.value
      )
    )
  );
  console.log(frows);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const sendMail = () => {
    fetch(mentorUrl(`sendmail`), {
      method: "POST",
      body: JSON.stringify({ mentor: mentorName }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    handleClose();
  };

  const handleLock = () => {
    console.log("handle");
    fetch(mentorUrl(`lock`), {
      method: "POST",
      body: JSON.stringify({ mentor: mentorName }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setCanEdit(false);
    handleClose2();
  };

  const handleMarksFilter = (marks = 0) => {
    // Write code to filter the table data based upon the fact that whether the students have been assigned marks or not
    if (marks === -1) {
      setFrows(
        students.map((student) => {
          return createData(
            student.name,
            student.marks[0]?.value,
            student.marks[1]?.value,
            student.marks[2]?.value,
            student.marks[3]?.value,
            student.marks[4]?.value,
            student.marks[5]?.value
          );
        })
      );
      return;
    }
    console.log("Student: ", { students });
    const filteredRows = students
      .filter((row) => {
        console.log({row})
        return marks ? row.marks.every(x => x.value !== null) : row.marks.some(x => x.value === null)
      })
      .map((student) => {
        return createData(
          student.name,
          student.marks[0]?.value,
          student.marks[1]?.value,
          student.marks[2]?.value,
          student.marks[3]?.value,
          student.marks[4]?.value,
          student.marks[5]?.value
        );
      });
    setFrows(filteredRows);
  };

  const handlePDFConvert = () => {
    // Write code to convert the table data into a pdf file
    const doc = new jsPDF({
      orientation: "portrait",
    });

    doc.text("Students Data", 10, 10);
    autoTable(doc, {
      styles: {
        theme: "grid",
        margin: 10,
        padding: 10,
        headStyles: {
          fillColor: [154, 145, 203],
          textColor: [255, 255, 255],
          fontStyle: "bold",
          halign: "center",
        },
      },
      head: [
        [
          "Students",
          "Ideation",
          "Evaluation",
          "Pitch",
          "Uniqueness",
          "Research",
          "Design",
          "Total Marks",
        ],
      ],
      body: frows.map((row) => [
        row.Student,
        row.Ideation,
        row.Evaluation,
        row.Pitch,
        row.Uniqueness,
        row.Research,
        row.Design,
        row["Total Marks"],
      ]),
    });

    doc.save("Final Marksheet.pdf");
  };

  return (
    <>
      <div className="container">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 2,
          }}
        >
          <Typography variant="h6" component="div">
            Filter Data
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 2,
              gap: 5,
            }}
          >
            <Button variant="contained" onClick={(e) => handleMarksFilter(false)}>
              No Marks
            </Button>
            <Button variant="contained" onClick={(e) => handleMarksFilter(1)}>
              Marks
            </Button>
            <Button variant="outlined" onClick={(e) => handleMarksFilter(-1)}>
              Reset
            </Button>
          </Box>
        </Box>
        <div className="table">
          <TableContainer component={Paper} className="paper">
            <Table
              sx={{
                minWidth: 700,
              }}
              aria-label="customized table"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell>Students</StyledTableCell>
                  <StyledTableCell align="center">Ideation</StyledTableCell>
                  <StyledTableCell align="center">Evaluation</StyledTableCell>
                  <StyledTableCell align="center">Pitch</StyledTableCell>
                  <StyledTableCell align="center">Uniqueness</StyledTableCell>
                  <StyledTableCell align="center">Research</StyledTableCell>
                  <StyledTableCell align="center">Design</StyledTableCell>
                  <StyledTableCell align="center">Total Marks</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {frows.map((row) => (
                  <StyledTableRow key={row.Student}>
                    <StyledTableCell component="th" scope="row">
                      {row.Student}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.Ideation}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.Evaluation}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.Pitch}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.Uniqueness}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.Research}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.Design}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row["Total Marks"]}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="btns">
          <Button variant="contained" color="warning" onClick={handleOpen2}>
            Lock Students Data
          </Button>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open2}
          >
            <CircularProgress color="inherit" />

            <Dialog
              open={open2}
              TransitionComponent={Transition}
              keepMounted
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle>{"Want to lock the Data!"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  Do you want to permanently lock the students data, note that
                  once locked the data cannot be changed.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={(e) => handleLock()}>Yes</Button>
                <Button onClick={handleClose2}>No</Button>
              </DialogActions>
            </Dialog>
          </Backdrop>
          <Button
            variant="contained"
            color="success"
            onClick={handleOpen}
            disabled={canEdit}
          >
            Final Submit
          </Button>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            // onClick={handleClose}
          >
            <CircularProgress color="inherit" />

            <Dialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              // onClose={handleClose}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle>{"Final Submission Step"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  Do you want to finally submit the students data, note that
                  this step cannot be reverted back.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={sendMail}>Yes</Button>
                <Button onClick={handleClose}>No</Button>
              </DialogActions>
            </Dialog>
          </Backdrop>
          <Button variant="contained" onClick={handlePDFConvert}>
            Export
          </Button>
        </div>
        <div className="footer">
          <h4>*All the marks have been alloted out of 10</h4>
        </div>
      </div>
    </>
  );
};
