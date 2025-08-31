import { useEffect, useState } from "react";
import env from "../env";
import errortrans from "../translate/error";

import Cookies from "universal-cookie";
const cookies = new Cookies();
function SalesSetting(props){
    const direction = props.lang?props.lang.dir:errortrans.defaultDir;
    const lang = props.lang?props.lang.lang:errortrans.defaultLang;
    const token = cookies.get(env.cookieName);

    const [content,setContent] = useState('')
    const [Edit,setEdit]=useState(0)
    const [ChangeNum,setChangeNum]=useState("")
    useEffect(() => {
       
        const postOptions={
            method:'get',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify()
            }
            console.log(postOptions)
        fetch(env.siteApi + "/setting/get-params",postOptions)
        .then(res => res.json())
        .then(
        (result) => {
            setContent(result)
        },
        (error) => {
            console.log(error);
        }
        
    )},[])
    const SavePara=()=>{
        const postOptions={
            method:'post',
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token && token.token,
                userId: token && token.userId,
            },
            body:JSON.stringify({tax:ChangeNum.tax,prepaid:ChangeNum.prepaid})
            }
            console.log(postOptions)
        fetch(env.siteApi + "/setting/update-params",postOptions)
        .then(res => res.json())
        .then(
        (result) => {
            window.location.reload()
        },
        (error) => {
            console.log(error);
        }
    )
        

    }
    console.log(content)
    return(
    <div className="profiles" style={{direction:direction}}>
        
        <div className="profiles-header">
            <h5>{errortrans.SaleSetting[lang]}</h5>
            {!Edit?<div className="add-profile-btn" onClick={()=>setEdit(1)}>
                <i className="fa-solid fas fa-edit" style={{color: "#ffffff"}}></i>
                <p>{errortrans.edit[lang]}</p>
            </div>:<div className="btn-wrapper">
            <div className="add-profile-btn" onClick={()=>SavePara()}>
                <p>{errortrans.save[lang]}</p>
            </div>
            <div className="add-profile-btn cancel-btn" onClick={()=>setEdit(0)}>
                <p>{errortrans.cancel[lang]}</p>
            </div></div>
            }
        </div>
        <div className={direction==="ltr"?"profile-table SS-table":"profile-table SS-table profileRtl"}>
            <table>
            <thead>
                <tr>
                <th>{errortrans.SaleParameter[lang]}</th>
                <th>{errortrans.createdBy[lang]}</th>
                <th>{errortrans.createdOn[lang]}</th>
                <th>{errortrans.Amount[lang]}(%)</th>
                
                </tr>
            </thead>
            <tbody>
                
                <tr>
                    <td>مالیات</td>
                    <td>مدیریت</td>
                    <td>تاریخ</td>
                    <td>
                        {Edit?
                            <input 
                            type="number" 
                            maxLength={2} 
                            className="num-input" 
                            placeholder="مالیات" 
                            pattern="[0-9]*"
                            onChange={(e)=>setChangeNum(prevState => ({
                                ...prevState,
                                tax:e?e.target.value:''
                              }))}/>
                            :
                            <p className="num-view">{content.tax&&content.tax[0].percent}</p>
                        }
                    </td>
                </tr>
                <tr>
                    <td>پیش پرداخت</td>
                    <td>مدیریت</td>
                    <td>تاریخ</td>
                    <td>
                        {Edit?
                            <input 
                            type="tel" 
                            maxLength={2} 
                            className="num-input"   
                            placeholder="پیش پرداخت" 
                            pattern="[0-9]{2}"
                            onChange={(e)=>setChangeNum(prevState => ({
                                ...prevState,
                                prepaid:e?e.target.value:''
                              }))}/>
                            :<p className="num-view">{content.prepaid&&content.prepaid[0].percent}</p>
                        }
                    </td>
                </tr>
                
            </tbody>
            </table>
        </div>
        </div>
    )
}
export default SalesSetting