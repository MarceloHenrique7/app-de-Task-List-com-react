import React from "react";

import Button from "./Button";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./TaskDetails.css";

const TaskDetails = () => {
  const params = useParams();
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate("/");
  };

  return (
    <>
      <div className="back-button-container" onClick={handleBackButtonClick}>
        <Button>Voltar</Button>
      </div>
      <div className="task-details-container">
        <h2>{params.taskTitle}</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic ipsum
          sapiente deserunt odio provident unde!
        </p>
      </div>
    </>
  );
};

export default TaskDetails;
