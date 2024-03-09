import React, { useState } from "react";
// import "./Form.css";
import { Box, TextField, Typography } from "@mui/material";  

// const rows = [
//     createData('Ideation', 9, 8, 8, 9),
//     createData('Evaluation', 8, 9, 8, 9),
//     createData('Pitch', 9, 9, 9, 9),
//     createData('Uniqueness', 8, 9, 7, 8),
//     createData('Research', 8, 9, 7, 8),
//     createData('Design', 5, 7, 8, 9),
//     createData('Implementation', 9, 8, 7, 6),
//     createData('Technical Proficiency', 9, 9, 9, 9),
//     createData('Sustainability of Work', 7, 8, 9, 9),
//     createData('Documentation & Report', 8, 9, 9, 7),
//     createData('Feedback & Reflection', 6, 7, 7, 9),
//     createData('Total Marks', 86, 92, 88, 92)
//   ];

export const Form = ({ student_name, marks }) => {
    console.log({student_name,marks})
    const [values, setValues] = useState(marks.map(x => x.value));

    return (
        <Box >
            <Typography variant="h6" color={"black"}>
                {student_name}
            </Typography>
            <br />
            <br />
            <Box sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 2.5,
        }}>
            {marks.map((mark, index) => (
                <TextInput mark={mark} value={values} setValue={setValues} idx={index} key={index} />
            ))}
                </Box>
        </Box>
    );
};


function TextInput({ mark, value, setValue,idx }) {
    const [v, setV] = useState(value[idx]);

    const handleChange = (val) => {
        console.log(val);
        if (val > 10) val = 10;
        if (val < 0) val = 0;
        setV(val);
        const newValue = [...value];
        newValue[idx] = val;
        setValue(newValue);
    }

    return (
        <TextField
            label={mark.name}
            value={v}
            type="number"
            variant="outlined"
            onChange={(e, val) => { handleChange(e.target.value) }}
            sx={{
                // padding: 1.5
            }}
        />
    )
}