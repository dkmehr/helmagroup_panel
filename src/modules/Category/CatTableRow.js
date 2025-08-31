import React, { useState } from "react";
import Status from "../Components/Status";
import env, { normalPriceCount, rxFindCount } from "../../env";
import CatQuickDetail from "./CatComponent/CatQuickDetail";

function CatTableRow(props) {
  const [openOption, setOpenOption] = useState(0);
  const [checkState, setCheckState] = useState(false);
  const activeAcc = props.index === props.detail;
  const cat = props.cat;
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
          <div className="order-id">
            <p
              onClick={() =>
                (window.location.href = "/category/detail/" + cat._id)
              }
            >
              {cat.catCode}
            </p>
          </div>
        </td>
        <td>
          <div className="cu-avatar">
            <img
              src={cat ? env.siteApiUrl + cat.iconUrl : ""}
              alt={cat.title}
            />
            <div
              className="cu-name"
              onClick={() =>
                (window.location.href = "/category/detail/" + cat._id)
              }
            >
              <p className="name">{cat.title}</p>
              <p className="email">{cat.link}</p>
            </div>
            {cat.moreInformation ? (
              <i className="fa fa-comment-o" title={cat.moreInformation}></i>
            ) : (
              <></>
            )}
          </div>
        </td>
        <td>
          <div className="or-date">
            <p className="date">
              {new Date(cat.date).toLocaleDateString(
                props.lang === "persian" ? "fa" : "en"
              )}
            </p>
            <p className="time">
              {new Date(cat.date).toLocaleTimeString(
                props.lang === "persian" ? "fa" : "en"
              )}
            </p>
          </div>
        </td>

        <td>
          <Status
            status={cat.active ? "active" : "deActive"}
            class={"order-status"}
            lang={props.lang}
          />
        </td>
        <td>
          <div className="more-btn">
            <i
              className="tableIcon fas fa-edit"
              onClick={() =>
                (window.location.href = "/category/detail/" + cat._id)
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
      {activeAcc ? (
        <tr className="sub-order">
          <td colSpan="9">
            <CatQuickDetail cat={cat} />
          </td>
        </tr>
      ) : (
        <React.Fragment></React.Fragment>
      )}
    </React.Fragment>
  );
}
export default CatTableRow;
