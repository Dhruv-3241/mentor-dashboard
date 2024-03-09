import React from "react";
import "./middle.css";
import Card from "../Card/Card";

const marks = [{
    name: "Ideation",
    value: 9,
}, {
    name: "Evaluation",
    value: 8,
}, {
    name: "Pitch",
    value: 9,
}, {
    name: "Uniqueness",
    value: 8,
}, {
    name: "Research",
    value: 8,
}, {
    name: "Design",
    value: 5,
}, {
    name: "Implementation",
    value: 9,
}, {
    name: "Technical Proficiency",
    value: 9,
}, {
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

]

export const Middle = () => {
    const [open, setOpen] = React.useState([false,false,false,false]);
    const [open1, setOpen1] = React.useState([false,false,false,false]);
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
                    <Card
                        student_name={"Dhruv Srivastava"}
                        roll_no={"2101211CS"}
                        idx={0}
                        total_marks={"95"}
                        handleOpen={handleOpen}
                        handleClose={handleClose}
                        open={open}
                        handleClose1={handleClose1}
                        handleOpen1={handleOpen1}
                        open1={open1}
                        marks={marks}
                    />
                    <Card
                        student_name={"Md Usman Zafar"}
                        roll_no={"2101027CS"}
                        total_marks={"98"}
                        idx={1}
                        handleOpen={handleOpen}
                        handleClose={handleClose}
                        open={open}
                        handleClose1={handleClose1}
                        handleOpen1={handleOpen1}
                        open1={open1}
                        marks={marks}
                    />
                </div>
                <div className="row">
                <Card
                        student_name={"Jayant Maurya"}
                        roll_no={"2101238CS"}
                        total_marks={"96"}
                        idx={2}
                        handleOpen={handleOpen}
                        handleClose={handleClose}
                        open={open}
                        handleClose1={handleClose1}
                        handleOpen1={handleOpen1}
                        open1={open1}
                        marks={marks}
                    />
                    <Card
                        student_name={"Tushar Bharti"}
                        roll_no={"2101195CS"}
                        idx={3}
                        total_marks={"97"}
                        handleOpen={handleOpen}
                        handleClose={handleClose}
                        open={open}
                        handleClose1={handleClose1}
                        handleOpen1={handleOpen1}
                        open1={open1}
                        marks={marks}
                    />

                </div>

            </div>
        </div>
    );
};
