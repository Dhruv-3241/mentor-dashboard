import { Form } from "../Form/Form"
import "./Card.css"
import React from "react";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import studentprofile from "../../assets/middle/icons8-male-user-24.png"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Card({ student_name, roll_no, total_marks, handleClose, handleOpen, open, handleClose1, handleOpen1, open1, marks, idx }) {
    return (
        <div className="card">
            <div className="stuimg">
                <img src={studentprofile} alt="" className="prpic" />
            </div>
            <div className="name">
                <div className="tablename">
                    Name:
                </div>
                <div className="details">
                    {student_name}
                </div>
            </div>
            <div className="rollno">
                <div className="tablename">
                    Roll No:
                </div>
                <div className="details">
                    {roll_no}
                </div>
            </div>
            <div className="marks">
                <div className="tablename">
                    Marks:
                </div>
                <div className="details">
                    {total_marks}
                </div>
            </div>
            <div className="diffbtn">
                <button onClick={e => handleOpen(idx)} className="mentorBtn1">Edit</button>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open[idx]}
                >
                    <CircularProgress color="inherit" />

                    <Dialog
                        open={open[idx]}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={e => handleClose(idx)}
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle>{"Modify Student Data"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                <Form marks={marks} student_name={student_name} />
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={e => handleClose(idx)}>Cancel</Button>
                            <Button onClick={e => handleClose(idx)}>Modify</Button>
                        </DialogActions>
                    </Dialog>
                </Backdrop>
                <button onClick={e => handleOpen1(idx)} className="mentorBtn2">
                    Delete
                </button>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open1[idx]}
                // onClick={handleClose1}
                >
                    <CircularProgress color="inherit" />
                    <Dialog
                        open={open1[idx]}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={e => handleClose1(idx)}
                        aria-describedby="alert-dialog-slide-description">
                        {/* <DialogTitle>{"Use Google's location service?"}</DialogTitle> */}
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                Are you sure you want to <b>delete</b> this student?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={e => handleClose1(idx)}>No</Button>
                            <Button onClick={e => handleClose1(idx)}>Yes</Button>
                        </DialogActions>
                    </Dialog>
                </Backdrop>
            </div>
        </div>
    )
}