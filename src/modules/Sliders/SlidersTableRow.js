import React, { useState } from "react";
import Status from "../Components/Status";
import env, { normalPriceCount, rxFindCount } from "../../env";

function SlidersTableRow(props) {
  const [openOption, setOpenOption] = useState(0);
  const [checkState, setCheckState] = useState(false);
  const activeAcc = props.index === props.detail;
  const slider = props.slider;
  return (
    <React.Fragment>
      <tr className={activeAcc ? "activeAccordion" : "accordion"}>
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
          <div className="order-id">{slider.sliderCode}</div>
        </td>
        <td>
          <div className="cu-avatar">
            <img
              src={slider ? env.siteApiUrl + slider.thumbUrl : ""}
              alt={slider ? slider.title : "default"}
            />
            <div
              className="cu-name"
              onClick={() =>
                (window.location.href = "/sliders/detail/" + slider._id)
              }
            >
              <p className="name">{slider.title}</p>
              <p className="email">{slider.sku}</p>
            </div>
            {slider.moreInformation ? (
              <i className="fa fa-comment-o" title={slider.moreInformation}></i>
            ) : (
              <></>
            )}
          </div>
        </td>

        <td>
          <div className="more-btn">
            <i
              className="tableIcon fas fa-edit"
              onClick={() =>
                (window.location.href = "/sliders/detail/" + slider._id)
              }
            ></i>
          </div>
          {openOption ? (
            <div className="sub-more-menu">
              <div className="sub-option sub-delete">
                <i
                  className="tableIcon fas fa-remove"
                  style={{ color: "#ff0000" }}
                ></i>
                <p>Delete</p>
              </div>
              <div className="sub-option sub-edit">
                <i className="tableIcon fas fa-edit"></i>
                <p>Edit</p>
              </div>
            </div>
          ) : (
            <></>
          )}
        </td>
      </tr>
    </React.Fragment>
  );
}
export default SlidersTableRow;
