import { useEffect, useState } from "react";

function QuickOff(props) {
  const [offPer, setOffPer] = useState(1);
  //const [discount , setDiscount] = useState(props.discount)
  useEffect(() => {
    offPer && props.change("");
  }, [offPer]);
  return (
    <div className="off-input-wrapper">
      <input
        type="number"
        name=""
        id=""
        value={props.discount}
        onChange={(e) => props.change(e.target.value)}
      />
      {offPer ? (
        <i className="off-unit fa-solid fa-percent percent-unit"></i>
      ) : (
        <i className="price-unit">ریال</i>
      )}
    </div>
  );
}
export default QuickOff;
