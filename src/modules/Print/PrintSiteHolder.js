import { useEffect, useState } from "react";
import env from "../../env";
import Cookies from "universal-cookie";
import FishPrintCart from "./FishPrintCart";
import PrintCart from "./PrintCart";
import PrintInvoice from "./PrintInvoice";
import PostReq from "../../utils/PostReq";
const cookies = new Cookies();
const url = document.location.pathname.split("/")[3];
const type = document.location.pathname.split("/")[2];

const FaktorSitePrint = (props) => {
  const [faktorList, setFaktorList] = useState();
  const [Content, setContent] = useState("");
  const [UserData, setUserData] = useState("");
  const token = cookies.get("faktor-login");
  const printNow = () => {
    window.print();
  };
  useEffect(() => {
    fetchPrint();
  }, []);
  const fetchPrint = async () => {
    const result = await PostReq({
      method: "Post",
      url: "/panel/faktor/fetch-faktor",
      body: { faktorNo: url },
    });
    setFaktorList(result);
  };
  return (
    <div className="printArea">
      {faktorList ? (
        type === "fishprint" ? (
          <FishPrintCart
            token={token}
            orderData={faktorList}
            userInfo={""}
            url={url}
          />
        ) : (
          <PrintCart orderData={faktorList} userInfo={""} url={url} />
        )
      ) : (
        <main>در حال دریافت اطلاعات</main>
      )}
      <div className="btn-wrapper">
        <button className="print-btn PrintBtn" onClick={() => printNow()}>
          چاپ A4
        </button>
      </div>
    </div>
  );
};
export default FaktorSitePrint;
