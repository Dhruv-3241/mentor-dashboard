import "./view.css";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import React from "react";
import { Box, Typography } from "@mui/material";
import { deepClone } from "@mui/x-data-grid/utils/utils";

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
  return {
    Student,
    Ideation: idea ?? "N/A",
    Evaluation: evalu ?? "N/A",
    Pitch: pitch ?? "N/A",
    Uniqueness: unique ?? "N/A",
    Research: research ?? "N/A",
    Design: design ?? "N/A",
    "Total Marks": isNaN(idea + evalu + pitch + unique + research + design)
      ? "N/A"
      : idea + evalu + pitch + unique + research + design,
  };
}

const rows = [
  createData("Student1", 9, 9, 8, 9, 8, 9),
  createData("Student2", 8, 8, 9, 8, 9, 8),
  createData("Student3", 7, 7, 8, 8, 9, 9),
  createData("Student4", 7, 9, undefined, 8, 7, 9),
];

export const View = () => {
  const [open, setOpen] = React.useState(false);
  const [frows, setFrows] = React.useState(rows);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleMarksFilter = (marks = 0) => {
    // Write code to filter the table data based upon the fact that whether the students have been assigned marks or not
    if (marks === -1) {
      setFrows(rows);
      return;
    }
    const filteredRows = rows.filter((row) => {
      return marks ? row["Total Marks"] : !row["Total Marks"];
    });

    setFrows(filteredRows);
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
            <Button variant="contained" onClick={(e) => handleMarksFilter(0)}>
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
          <Button variant="contained" color="warning" onClick={handleOpen}>
            Lock Students Data
          </Button>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />

            <Dialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
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
                <Button onClick={handleClose}>Yes</Button>
                <Button onClick={handleClose}>No</Button>
              </DialogActions>
            </Dialog>
          </Backdrop>
          <Button variant="contained" color="success" onClick={handleOpen}>
            Final Submit
          </Button>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />

            <Dialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
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
                <Button onClick={handleClose}>No</Button>
                <Button onClick={handleClose}>Yes</Button>
              </DialogActions>
            </Dialog>
          </Backdrop>
          {/* Write code for making a button having the css same as the previous buttons, these buttons are used to filter the table data based upon the fact that whether the students have been assigned marks or not */}
        </div>
        <div className="footer">
          <h4>*All the marks have been alloted out of 10</h4>
        </div>
      </div>
    </>
  );
};
