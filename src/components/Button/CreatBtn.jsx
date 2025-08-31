import React, { useState } from "react";
import TaskUpload from "../../modules/Crm/Tasks/TaskUpload";
import PostReq from "../../utils/PostReq";
const CreatBtn = (props) => {
  const Param = props.Param;
  const setParam = props.setParam;
  const content = props.content;

  const handleParam = (property, value) => {
    setParam((prevState) => ({
      ...prevState,
      [property]: value,
    }));
  };
  const updateTask = async (value) => {
    const result = await PostReq({
      method: "Post",
      url: "/panel/crm/update-faktor-tasks",
      body: { ...Param, value, id: props.TaskId },
    });
    setTimeout(() => props.setLoading(Math.random()), 2000);
  };
  console.log(Param);
  return (
    <div>
      {content.type == "text" ? (
        <input
          className="create-text"
          style={{ backgroundColor: content.color }}
          type={content.type}
          placeholder={content.title}
          onChange={(e) => handleParam(content.parameter, e.target.value)}
        />
      ) : content.type == "button" ? (
        <button
          className="create-button"
          style={{ backgroundColor: content.color,minWidth:"75px" }}
          type={content.type}
          onClick={() => updateTask(content.value)}
        >
          {content.title}
        </button>
      ) : content.type == "list" ? (
        <select
          className="create-text"
          style={{ backgroundColor: content.color }}
          type={content.type}
          placeholder={content.title}
          onChange={(e) => handleParam(content.parameter, e.target.value)}
        >
          {content.options.map((option, p) => (
            <option key={p}>{option}</option>
          ))}
        </select>
      ) : content.type == "file" ? (
        <TaskUpload
          action={(e) => handleParam(content.parameter, e)}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default CreatBtn;
