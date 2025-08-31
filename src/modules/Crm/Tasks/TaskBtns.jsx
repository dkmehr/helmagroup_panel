import { useState, useEffect } from "react";
import ErrorAction from "../../../components/Modal/ErrorAction";
import ShowError from "../../../components/Modal/ShowError";
import env from "../../../env";
import CreatBtn from "../../../components/Button/CreatBtn";
function TaskBtns(props) {
  const token = props.token;
  const data = props.data;
  const [BtnObj, setBtnObj] = useState(0);
  const [TaskId, setTaskId] = useState("");
  const [Param, setParam] = useState();
  useEffect(() => {
    const postOptions = {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token && token.token,
        userId: token && token.userId,
      },
      body: JSON.stringify(),
    };
    fetch(env.siteApi + `/panel/crm/faktor-get-status/${data._id}`, postOptions)
      .then((res) => res.json())
      .then(
        async (result) => {
          setBtnObj(result.buttons);
          setTaskId(result.taskData._id);
        },
        (error) => {
          console.log(error);
        }
      );
  }, [props.BarcodeLoader]);
  return (
    <div className="taskAction">
      {BtnObj ? (
        BtnObj.map((Btn, i) => (
          <CreatBtn
            content={Btn}
            key={i}
            token={token}
            Param={Param}
            setParam={setParam}
            TaskId={TaskId}
            setError={props.setError}
            setLoading={props.setLoading}
          />
        ))
      ) : (
        <></>
      )}
    </div>
  );
}
export default TaskBtns;
