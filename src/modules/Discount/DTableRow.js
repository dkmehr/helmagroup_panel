import { useState } from "react";
import tabletrans from "../../translate/tables";
import Status from "../Components/Status";

function DTableRow(props) {
  const activeAcc = props.index === props.detail;
  const user = props.user;
  return (
    <tr>
      <td className="checkBoxStyle">
        <input type="checkbox" name="" id="" />
      </td>
      <td>
        <div className="cu-avatar">
          <div className="cu-name">
            <p className="name">{user && user.username}</p>
          </div>
        </div>
      </td>

      <td>
        <div className="cu-company">
          <p className="phone-num">{user.categoryName}</p>
        </div>
      </td>

      <td>
        <div className="pen-status order-status">
          <p>{user.discount}</p>
        </div>
      </td>
      <td onClick={() => props.offerid(user._id)}>
        <i class="fa-solid fa-trash" style={{ color: "#dd0005" }}></i>
      </td>
    </tr>
  );
}
export default DTableRow;
