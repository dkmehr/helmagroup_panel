import React, { useState } from "react";
import Status from "../Components/Status";
import env, { normalPriceCount, rxFindCount } from "../../env";
import ProductQuickDetail from "./ProductComponent/ProductQuickDetail";

function ProductTableRow(props) {
  const [openOption, setOpenOption] = useState(0);
  const [Count, setCount] = useState("");
  const activeAcc = props.index === props.detail;
  const product = props.product;
  const selectItems = props.selectItems;
  var index = props.index;

  const updateCheckBox = (e) => {
    props.setSelectItems((existingItems) => {
      return [
        ...existingItems.slice(0, index),
        e.target.checked ? product.sku : false,
        ...existingItems.slice(index + 1),
      ];
    });
  };

  return (
    <React.Fragment>
      <tr className={activeAcc ? "activeAccordion" : "accordion"}>
        <td>{props.index + 1}</td>
        <td className="checkBoxStyle">
          {product.isMaster ? (
            <></>
          ) : (
            <input
              type="checkbox"
              checked={selectItems[index]}
              onChange={(e) => updateCheckBox(e)}
            />
          )}
        </td>

        <td>
          <div className="cu-avatar">
            <img
              src={
                product.thumbUrl
                  ? env.siteApiUrl + product.thumbUrl
                  : env.defaultProduct
              }
              alt={product ? product.title : "default"}
              className={product.isMaster ? "masterImage" : "slaveImage"}
            />
            <div
              className="cu-name"
              onClick={() =>
                (window.location.href = "/products/detail/" + product._id)
              }
            >
              <p className="name">{product.title}</p>
              <p className="email">{product.sku}</p>
            </div>
            {product.moreInformation ? (
              <i
                className="fa fa-comment-o"
                title={product.moreInformation}
              ></i>
            ) : (
              <></>
            )}
          </div>
        </td>

        <td>
          <div className="order-price">
            <p>{normalPriceCount(product.sellPrice)}</p>
          </div>
        </td>
        <td>
          <div className="order-price">
            <p>
              {product.categories &&
                product.categories.map((cat, i) => (
                  <small key={i}>{cat.title} | </small>
                ))}
            </p>
          </div>
        </td>
        <td>
          <div className="order-num">
            <span>
              {product.stock ? product.stock : "ناموجود"} {product.unit}
            </span>
          </div>
        </td>

        <td>
          <div className="more-btn">
            <i
              className="tableIcon fas fa-edit"
              onClick={() =>
                (window.location.href = "/products/detail/" + product._id)
              }
            ></i>
            {/* <i className="tableIcon fas fa-ellipsis-v"></i> */}
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
            <ProductQuickDetail product={product} />
          </td>
        </tr>
      ) : (
        <React.Fragment></React.Fragment>
      )}
    </React.Fragment>
  );
}
export default ProductTableRow;
