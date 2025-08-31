import { useState, useEffect } from "react";

import PostReq from "../../../utils/PostReq";
function TaskDiscount(props) {
  const { faktorNum, setContent } = props;
  const [Discount, setDiscount] = useState("");

  // useEffect(() => {
  //   if (Barcode && Barcode.length > 9) {
  //     CheckBarcode(Barcode);
  //   } else return;
  // }, [Barcode]);

  const CheckBarcode = async () => {
    const result = await PostReq({
      method: "Post",
      url: "/panel/faktor/update-faktor",
      body: { faktorNo: faktorNum, discount: Discount },
    });
    setContent("");
    setContent(result);
  };
  return (
    <div className="taskAction">
      <input
        className="create-text"
        style={{ backgroundColor: "lightgrey" }}
        type="text"
        placeholder="تخفیف کل"
        onChange={(e) => setDiscount(e.target.value)}
      />
      <button className="create-button" onClick={CheckBarcode}>
        ثبت تخفیف
      </button>
    </div>
  );
}
export default TaskDiscount;
