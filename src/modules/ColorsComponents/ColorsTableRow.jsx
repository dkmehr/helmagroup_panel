import React, { useState } from "react";
import env from "../../env";
import Status from "../Components/Status";
import tabletrans from "../../translate/tables";
import PostReq from "../../utils/PostReq";
const ColorsTableRow = (props) => {
  const [checkState, setCheckState] = useState(false);
  const brand = props.brand;

  const getContrastingColor = (hex) => {
    // Remove the hash at the start if it's there
    hex = hex.replace("#", "");

    // Convert to RGB
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    // Calculate the brightness of the color
    let brightness = (r * 299 + g * 587 + b * 114) / 1000;

    // Return black or white depending on the brightness
    return brightness > 155 ? "#000000" : "#FFFFFF";
  };
  const DeleteColor = async () => {
    const result = await PostReq({
      method: "Post",
      url: "/panel/product/delete-color",
      body: { colorId: brand._id },
    });
    setTimeout(() => window.location.reload(), 1000);
  };
  return (
    <tr>
      <td className="checkBoxStyle">
        <input
          type="checkbox"
          name=""
          id=""
          checked={checkState}
          onChange={(e) => setCheckState(checkState ? false : true)}
        />
      </td>
      <td>
        <div className="color-code">{brand.colorCode}</div>
      </td>
      <td>
        <div
          className="color-name"
          style={{
            backgroundColor: brand.colorCode,
            color: getContrastingColor(brand.colorCode),
          }}
        >
          {brand.title}
        </div>
      </td>
      <td>
        <div className="more-btn">
          <i
            className="tableIcon fas fa-edit"
            style={{ cursor: "pointer" }}
            onClick={() =>
              (window.location.href = "/colors/detail/" + brand._id)
            }
          ></i>
          <i
            class="fa fa-trash"
            aria-hidden="true"
            style={{ color: "red" }}
            onClick={DeleteColor}
          ></i>
        </div>
      </td>
    </tr>
  );
};

export default ColorsTableRow;
