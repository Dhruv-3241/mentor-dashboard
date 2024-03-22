import React from "react";
import "../RightNavbar/RightNavbar.css";
// import studentprofile from "../../assets/right_navbar/icons8-male-user-24.png"
import profilepic from "../../assets/right_navbar/icons8-male-user-48.png"
// import Lottie, { LottieRefCurrentProps } from "lottie-react";
import Lottie from "lottie-react";
import CircularProgress from '@mui/material/CircularProgress';
import animationData from "../../assets/right_navbar/animation.json";
// import { useRef } from "react";

export const RightNavbar = () => {
    // const graphRef = useRef < LottieRefCurrentProps > (null);

    return (
        <nav className="RightNavbar">
            <div className="const1">
                <div className="heading">
                    <h2> Your profile </h2>
                </div>
                <div className="profile">
                    <div className="profileimg">
                        <img src={profilepic} alt="" />
                        <CircularProgress variant="determinate" value={50} className="progress" style={{ width: '100px', height: '100px' }} thickness={5} />
                    </div>
                    <div className="data">
                        <h3> Good Morning Tejaswini Ma'am</h3>
                        <h4> See your profile here</h4>
                    </div>
                </div>
                <div className="graph">
                    <Lottie
                        // onComplete={() => {
                        //     graphRef.current?.stop();
                        // }}
                        // lottieRef={graphRef}
                        // loop={false}
                        animationData={animationData} className="graphsvg" />
                </div>
            </div>
            {/* <div className="const2">
                <div className="head">
                    <h3> List of all students </h3>
                </div>
                <div className="students">
                    <div className="stu1">
                        <div className="details">
                            <img src={studentprofile} alt="" />
                            <h4> Student Name</h4>
                        </div>
                        <div className="btn">
                            <button className="mentorBtn2">Not Assigned</button>
                        </div>
                    </div>
                    <div className="stu1">
                        <div className="details">
                            <img src={studentprofile} alt="" />
                            <h4> Student Name</h4>
                        </div>
                        <div className="btn">
                            <button className="mentorBtn1">Assigned</button>
                        </div>
                    </div>
                    <div className="stu1">
                        <div className="details">
                            <img src={studentprofile} alt="" />
                            <h4> Student Name</h4>
                        </div>
                        <div className="btn">
                            <button className="mentorBtn2">Not Assigned</button>
                        </div>
                    </div>
                    <div className="stu1">
                        <div className="details">
                            <img src={studentprofile} alt="" />
                            <h4> Student Name</h4>
                        </div>
                        <div className="btn">
                            <button className="mentorBtn1">Assigned</button>
                        </div>
                    </div>
                    <button className="viewAll">View All</button>
                </div>
            </div> */}
        </nav>
    );
};
