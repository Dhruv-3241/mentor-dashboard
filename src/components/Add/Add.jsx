import "./Add.css";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

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
    name: "Dhruv Srivastav",
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

export const Add = () => {
  const [selectedStudents, setSelectedStudents] = React.useState([]);
  // alreadyExistingStudent
  const [AES, setAES] = React.useState(rows.filter((x) => x.mentor === "A"));
  console.log(AES.length + selectedStudents.length);
  return (
    <div className="container">
      <div
        style={{
          height: "90%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          isRowSelectable={(params) =>
            !params.row.mentor &&
            selectedStudents.length + AES.length < 4 &&
            selectedStudents.length + AES.length > 2
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
    </div>
  );
};
