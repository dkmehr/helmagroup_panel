import { dayFromNow, findPriority } from "../../env"

function TaskData(props){
    const taskData = props.taskData
    const taskProfile = props.taskProfile
    const customer= props.customer
    const taskUser=props.taskUser
    const creator=props.creator
    console.log(taskData)
    return(
        <div className={taskData.result?taskData.result.Number?
            "taskData doneTitle":"taskData suspendTitle":"taskData"}>
            <div className='titles'>
                <h3 onClick={()=>props.setProductPop(taskData)} className={"task-title "+ 
                    findPriority(taskData.priority)+"task"}>
                    {taskData.title}</h3>
                <ul>
                    <li onClick={()=>props.setOrderPop(1)}>{taskData.faktorNo}</li>
                    <li>{taskData.cName}</li>
                    <li>{taskData.phone}</li>
                    <li>{new Date(taskData.initDate).toLocaleDateString('fa')}</li>
                </ul>
            </div>
            {/*<div className='editTask'
            onClick={()=>props.setTaskPop(1)}>
                ویرایش
                    </div>*/}
            <div className="footerTask" onClick={()=>props.setTaskPop(1)}>
                <ul className="footerIcons">
                    {taskData.factory?
                        <li title={taskData.factory}>
                            <i className="fa fa-footer fa-filter"></i>
                            <small>{taskData.factory}</small>
                        </li>:<>_</>}

                    {taskData.peykPhone?
                        <li><i className="fa fa-footer fa-motorcycle"></i> 
                        <p>{taskData.peykName}</p></li>:<>_</>}
                    
                </ul>
            </div>
            {taskData.result&&taskData.result.Number?
            <div className="footerTask">
                <span className={"task-status status-active"}
                    title={taskData.result.Number}>
                {taskData.result.Number}</span></div>:
            <></>}
            
            {taskProfile&&taskProfile.length?
            <div className='task-handler creatorInfo'>
                <small>{taskProfile[0].profileName}</small>
            </div>:<></>}
            {taskUser&&taskUser.length?
            <div className='task-handler customerInfo'>
                <small>{taskData.cName}</small>
            </div>:<></>}
        </div>
    )
}
export default TaskData