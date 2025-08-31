import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";
import TaskPopUp from "./TaskPopUp";
import { useState } from "react";
import env from "../../env";
function Column(props) {
  const column = props.column;
  const token = props.token;
  console.log(column);
  const [taskPop, setTaskPop] = useState(0);
  const action = (data) => {
    const postOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token && token.token,
        userId: token && token.userId,
      },
      body: JSON.stringify({ ...data, crmId: props.crm ? props.crm._id : "" }),
    };
    console.log(postOptions);
    0 &&
      fetch(env.siteApi + "/panel/crm/update-tasks", postOptions)
        .then((res) => res.json())
        .then(
          (result) => {
            if (result.error) {
            } else {
              props.setBoardArray(result.taskData);
            }
          },
          (error) => {
            console.log(error);
          }
        );
  };
  return (
    <div className="board-item c">
      <h2 className="board-title">
        {props.column.title}

        <span className="count-lead">({props.column.size})</span>
        {props.column.index == "1" ? (
          <i className="fa fa-plus addTask" onClick={() => setTaskPop(1)}></i>
        ) : (
          <></>
        )}
        {props.column.isStore ? (
          <button
            className="print-btn store-btn"
            onClick={() =>
              (window.location.href = "/PrintStore/" + props.column.step)
            }
          >
            تجمع سفارشات
          </button>
        ) : (
          <></>
        )}
      </h2>

      <Droppable droppableId={props.column.enTitle}>
        {(provided, snapshot) => (
          <>
            <ul
              className={
                snapshot.isDraggingOver
                  ? "board-list-item dragCol"
                  : "board-list-item"
              }
              ref={provided.innerRef}
              data-draggingover={snapshot.isDraggingOver}
              {...provided.droppableProps}
            >
              {props.tasks.map((task, i) => (
                <Task
                  key={task._id}
                  taskList={task}
                  token={token}
                  access={props.access}
                  direction={props.direction}
                  crm={props.crm}
                  setBoardArray={props.setBoardArray}
                  action={action}
                  setLoading={props.setLoading}
                  index={i}
                  columnData={props.column}
                />
              ))}
              {provided.placeholder}
            </ul>
            {column.more && (
              <button
                className="column-more-btn"
                onClick={() =>
                  props.setPerPage((prevState) => ({
                    ...prevState,
                    [column.step]: column.pageSize && column.pageSize + 5,
                  }))
                }
              >
                بیشتر...
              </button>
            )}
          </>
        )}
      </Droppable>
      {taskPop ? (
        <TaskPopUp
          title={"Create New Task"}
          btnText={"Create"}
          crm={props.crm}
          setBoardArray={props.setBoardArray}
          taskStep={props.column.enTitle}
          token={token}
          close={() => setTaskPop(0)}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
export default Column;
