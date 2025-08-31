import { useState } from "react"
import StyleSelect from "../../../components/Button/AutoComplete"
import env from "../../../env"

function ProductMaster(props){
    const [mainProduct,setMainProduct] = useState()
    const masterList = props.masterList
    const token = props.token
    const setMainSlave=()=>{
        const body = {
            master:mainProduct,
            products:props.selectItems
          };
          const postOptions = {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": token && token.token,
              userId: token && token.userId,
            },
            body: JSON.stringify(body),
          };
          fetch(env.siteApi + "/panel/product/update-to-master", postOptions)
            .then((res) => res.json())
            .then(
              (result) => {
              },
              (error) => {
                console.log(error);
              }
            );
    }
    return(
        <>
        
        <StyleSelect
          title={"محصول اصلی"}
          label="title"
          options={masterList?masterList:[]}
          action={(e)=>setMainProduct(e?e.sku:'')}

        />
        <div className="edit-btn add-btn"
            onClick={() => setMainSlave()}>
            <i className="fa-solid fa-refresh"></i>
            <p>همگام سازی اطلاعات</p>
          </div>
        </>
    )
}
export default ProductMaster