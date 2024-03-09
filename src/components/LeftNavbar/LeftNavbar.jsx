import React from "react";
import "./LeftNavbar.css";
import img from "../../assets/left_navbar/scalar_logo.png";
import icons1 from "../../assets/left_navbar/icons8-dashboard-50.png";
import icons2 from "../../assets/left_navbar/icons8-view-50.png";
import icons3 from "../../assets/left_navbar/icons8-add-30.png";
import icons5 from "../../assets/left_navbar/icons8-student-50.png";
import icons6 from "../../assets/left_navbar/icons8-help-50.png";
import icons7 from "../../assets/left_navbar/icons8-logout-50.png";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme
} from "@mui/material";

export const LeftNavbar = ({ setView }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const handleView = (view) => {
    setView(view);
  };


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  return (
    <nav className="LeftNavbar">
      <div className="box1">
        <div className="container1">
          <div className="logo">
            <img src={img} alt="logo" className="logo_img" />
          </div>
          <div className="compname"></div>
        </div>
        <div className="container2">
          <h2> Overview </h2>
          <ul>
            <li className="links">
              <img src={icons1} className="linkimg" alt=""></img>
              <button className="hbtn" onClick={(e) => handleView("middle")}>
                Dashboard
              </button>
            </li>
            <li className="links">
              <img src={icons2} className="linkimg" alt=""></img>
              <button className="hbtn" onClick={(e) => handleView("view")}>
                View
              </button>
            </li>
            <li className="links">
              <img src={icons3} className="linkimg" alt=""></img>
              <button className="hbtn" onClick={(e) => handleView("add")}>
                Add
              </button>
            </li>
          </ul>
        </div>
        <div className="container3">
          <h2>Students Assigned</h2>
          <ul>
            <li>
              <img src={icons5} className="linkimg1" alt=""></img>
              Student 1
            </li>
            <li>
              <img src={icons5} className="linkimg1" alt=""></img>
              Student 2
            </li>
            <li>
              <img src={icons5} className="linkimg1" alt=""></img>
              Student 3
            </li>
            <li>
              <img src={icons5} className="linkimg1" alt=""></img>
              Student 4
            </li>
          </ul>
        </div>
      </div>
      <div className="box2">
        <div className="cont1">
          <h2>Settings</h2>
        </div>
        <div className="cont2">
          <ul>
            <Button
              variant="text"
              sx={{ color: "black" }}
              onClick={handleClickOpen}
            >
              <img src={icons6} className="linkimg2" alt=""></img>Help
            </Button>
            <Dialog
              fullScreen={fullScreen}
              open={open}
              onClose={handleClose}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title">
                {<h3>Help</h3>}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  You will be assisted by a company professional shortly. If you
                  need urgent help then kindly mail on <b>Scalar@customercare.in</b>.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleClose}>
                  Ok
                </Button>
                <Button onClick={handleClose} autoFocus>
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
            <li>
              <Button
                variant="text"
                sx={{ color: "black" }}
                onClick={handleClickOpen1}
              >
                <img src={icons7} className="linkimg2" alt=""></img>
                Logout
              </Button>
              <Dialog
                fullScreen={fullScreen}
                open={open1}
                onClose={handleClose1}
                aria-labelledby="responsive-dialog-title"
              >
                <DialogTitle id="responsive-dialog-title">
                  {<h3>Are you sure you want to LogOut?</h3>}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    If you logout then you must login again to perform any operations on this page.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button autoFocus onClick={handleClose1}>
                    Yes
                  </Button>
                  <Button onClick={handleClose1} autoFocus>
                    No
                  </Button>
                </DialogActions>
              </Dialog>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
