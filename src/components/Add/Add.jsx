import "./Add.css";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import { mentorUrl, studentUrl } from "../../utils";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const columns = [
  { field: "id", headerName: "ID", flex: 1 },
  {
    field: "name",
    headerName: "Name",
    type: "string",

    flex: 1,
  },
  {
    field: "rollno",
    headerName: "Roll Number",
    type: "string",
    flex: 1,
  },
  {
    field: "stream",
    headerName: "Stream",
    type: "string",
    flex: 1,
  },
  {
    field: "mentor",
    headerName: "Mentor",
    type: "string",
    flex: 1,
  },
];

const rows = [
  {
    id: 1,
    name: "Dhruv Srivastava",
    rollno: "2101211CS",
    stream: "CSE",
    mentor: "",
  },
  {
    id: 2,
    name: "Md Usman Zafar",
    rollno: "2101027CS",
    stream: "CSE",
    mentor: "A",
  },
  {
    id: 3,
    name: "Jayant Maurya",
    rollno: "2101238CS",
    stream: "MEA",
    mentor: "A",
  },
  {
    id: 4,
    name: "Tushar Bharti",
    rollno: "2101195CS",
    stream: "ECE",
    mentor: "",
  },
  {
    id: 5,
    name: "Rahul Kumar",
    rollno: "2101212CS",
    stream: "CSE",
    mentor: "A",
  },
];

export const Add = ({ students, setStudents, mentorName }) => {
  const [selectedStudents, setSelectedStudents] = React.useState([]);

  // Already Existing Student ==> AES
  const [AES, setAES] = React.useState(
    students.filter((x) => x.mentor === mentorName)
  );
  // console.log(AES.length + selectedStudents.length);

  const [open, setOpen] = React.useState(false);

  const [allStud, setAllStud] = React.useState([]);

  React.useEffect(() => {
    fetch(studentUrl("/all"))
      .then((res) => res.json())
      .then((data) => {
        setAllStud(
          data.data.map((x, i) => {
            return {
              ...x,
              id: i + 1,
            };
          })
        );
      });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (!selectedStudents.length) {
      handleClose();
      return;
    }
    console.log(AES,selectedStudents,allStud)
    const newStudents = [...AES.map(x => x && x.roll_no), ...selectedStudents.map((x) =>x && allStud[x - 1].roll_no)];
    const body = {
      mentor: mentorName,
      rollnos: newStudents,
    };
    console.log(body);
    fetch(mentorUrl("bulkAdd"), {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
  }
    }).then(d => d.json()).then(res => console.log(res));
    setStudents(newStudents);
    handleClose();
  };

  return (
    <div className="container">
      <div className="head">
        <h1>Add Student to Mentor</h1>
      </div>
      <div
        style={{
          height: "60%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <DataGrid
          rows={allStud}
          columns={columns}
          isRowSelectable={(params) => {
            return !params.row.mentor.trim() &&
              selectedStudents.length + AES.length < 4 
          }
          }
          sx={{
            //align headers to center
            width: "100%",
          }}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          onRowSelectionModelChange={(nr) => {
            console.log(nr);
            setSelectedStudents(nr);
          }}
          rowSelectionModel={selectedStudents}
          checkboxSelection
        />
      </div>
      <Box className="box">
        <Button variant="contained" onClick={handleClickOpen}>
          Add Student
        </Button>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          // onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>
            {
              <h3>
                Adding a <b>New Student</b> to mentor
              </h3>
            }
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              By adding this new student you will have to assess his project as
              per the criterias specified by you earlier.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="success" variant="outlined" onClick={handleSubmit}>
              Sure
            </Button>
            <Button color="warning" variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
};
