import { useState, useEffect } from "react";

import PostReq from "../../../utils/PostReq";
function TaskBarcode(props) {
  const { faktorNum, setContent } = props;
  const [Barcode, setBarcode] = useState("");

  useEffect(() => {
    if (Barcode && Barcode.length > 6) {
      CheckBarcode(Barcode);
    } else return;
  }, [Barcode]);

  const CheckBarcode = async (sku) => {
    const result = await PostReq({
      method: "Post",
      url: "/panel/faktor/recieve-faktor-item",
      body: { faktorNo: faktorNum, sku: sku },
    });
    if (result) {
      setContent(result);
      props.setBarcodeLoader(props.BarcodeLoader + 1);
    }
    setBarcode("");
  };
  return (
    <div className="taskAction">
      <input
        className="create-text"
        style={{ backgroundColor: "lightgrey" }}
        type="text"
        placeholder="بارکد"
        autoFocus
        value={Barcode}
        onChange={(e) => setBarcode(e.target.value)}
      />
    </div>
  );
}
export default TaskBarcode;
