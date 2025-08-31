import { useEffect, useState } from "react"
import TaskMainPart from "./Tasks/TaskMainPart"
import env, { defPay } from "../../env"
import QuickCartHolder from "../../Order/QuickCart/QuickCartHolder"
import ShowError from "../../components/Modal/ShowError"
import TaskBtns from "./Tasks/TaskBtns"
import QuickRow from "../../Order/QuickCart/QuickRow"

function ProductPopUp(props){
    const data =props.data
    const token = props.token
    const [payValue,setPayValue] = useState(defPay)
    const [content,setContent] = useState()
    //console.log(content)
    const [error,setError] = useState({message:'',color:"brown"})
    
    // useEffect(()=>{
    //     const body={
    //         faktorNo:data.faktorNo
    //     }
    //     const postOptions={
    //         method:'post',
    //         headers: {'Content-Type': 'application/json',
    //         "x-access-token":token&&token.token,"userId":token&&token.userId},
    //         body:JSON.stringify(body)
    //       }
    //   fetch(env.siteApi + "/panel/faktor/fetch-faktor",postOptions)
    //   .then(res => res.json())
    //   .then(
    //     (result) => {
    //         console.log(result)
    //     },
    //     (error) => {
    //       console.log(error);
    //     }
    //   )
    // },[])

    
    return(
    <section className="delete-modal">
        <div className="modal-backdrop show-modal">
            <div className="task-popup fullPopUp">
                <div className="orderModalTitle">
                    <span>{data.cName} </span>
                    <sub>({data.phone})</sub>
                    <span> شماره سفارش: {data.faktorNo}</span>
                    <div className="address-status">
                         آدرس:  
                    {(props.customer&&props.customer[0])?
                        props.customer[0].Address:"-"} </div>
                </div>
                <div className="orderModalDate">
                <p className="date">{new Date(data.initDate)
                  .toLocaleDateString('fa')}</p>
                  <p className="time">{new Date(data.initDate)
                  .toLocaleTimeString('fa')}</p>
                </div>
                <i className="fa fa-remove closeModal" 
                    onClick={props.close}></i>
                <div className="sharif pop-sharif" style={{padding: "70px 10px 10px"}}>
                    <main className="sharif-order-main">
                        <section className="admin-table-sec single-product-table">
                            <table>
                                <tbody>
                                    <tr>
                                        
                                        <th data-cell="نام کالا"><p>نام کالا</p></th>
                                        <th data-cell="عیار"><p>عیار</p></th>
                                        <th data-cell="وزن"><p>وزن</p></th>
                                        <th data-cell="قیمت لحظه ای"><p>قیمت لحظه ای</p></th>
                                        <th data-cell="اجرت"><p>اجرت</p></th>
                                        <th data-cell="قیمت نهایی(ریال)"><p>قیمت نهایی(ریال)</p></th>
                                        </tr>
                                    {data?
                                    
                                        <QuickRow data={data}
                                        action={props.delete} setError={props.setError}
                                        token={props.token} user={props.user} setCart={props.setCart}
                                        cartNo={props.cartNo} canEdit={props.canEdit}/>
                                    :
                                    <div>{env.loader}</div>}
                                    
                                </tbody>
                            </table>
                        </section>
                    </main>
                </div>
            {props.access&&props.access==="edit"?
            <div className="crmAction">
                <TaskBtns content={content} token={token} setError={setError}
                data={props.data} setBoard={(e)=>props.setBoardArray(e)}
                close={props.close} setLoading={props.setLoading}/>
            </div>:<></>}
            </div>
            
        </div>
        {error&&error.message?
        <ShowError color={error.color} status={"مدیریت"} 
        text={error.message} />:<></>}
    </section>
    )
}
export default ProductPopUp