import React, { useState, useEffect } from "react";
import Status from "../Components/Status";
import PayStatus from "../Components/PayStatus";
import { normalPriceCount, normalPriceRound, rxFindCount } from "../../env";
import OrderQuickDetail from "./OrderComponent/OrderQuickDetail";
import tabletrans from "../../translate/tables";
import OrderQuickCart from "./OrderComponent/OrderQuickCart";
import env from "../../env";
import PostReq from "../../utils/PostReq";
function OrderTableRow(props) {
  const [openOption, setOpenOption] = useState(0);
  const [checkState, setCheckState] = useState(0);
  const [DetailData, setDetailData] = useState();
  const [showDetail, setDetail] = useState(0);

  const activeAcc = props.index === props.detail;
  const order = props.order;
  const lang = props.lang;
  const user = props.user;
  const cart = props.cart;
  useEffect(() => {
    setCheckState(props.allcheck);
  }, [props.allcheck]);

  const updateCheckBox = (field, action) => {
    setCheckState(action ? false : true);
    if (!action) {
      if (props.selectedOrder) {
        var index = props.selectedOrder && props.selectedOrder.length;
        props.setSelectedOrder((existingItems) => {
          return [
            ...existingItems.slice(0, index),
            field,
            ...existingItems.slice(index + 1),
          ];
        });
      } else {
        props.setSelectedOrder([field]);
      }
    } else {
      //const cartNo = e.target.getAttribute("cartNo")
      props.setSelectedOrder((l) =>
        l.filter((item) => item.cartNo !== field.cartNo)
      );
    }
    console.log(props.selectedOrder);
  };
  const HandleDetail = () => {
    if (showDetail) {
      setDetail(0);
    } else {
      setDetail(1);
      FetchFaktor(order.faktorNo);
    }
  };
  const FetchFaktor = async (value) => {
    const result = await PostReq({
      method: "Post",
      url: "/panel/faktor/fetch-faktor",
      body: { faktorNo: value },
    });
    setDetailData(result.data.items);
  };
  console.log(user);
  return (
    <React.Fragment>
      <tr className={showDetail ? "activeAccordion" : "accordion"}>
        <td>{props.index + 1}</td>
        <td className="checkBoxStyle">
          {order.taskInfo &&
          order.taskInfo[0] &&
          order.taskInfo[0].taskStep == "done" ? (
            <input
              type="checkbox"
              checked={checkState}
              onChange={(e) => updateCheckBox(order, checkState)}
            />
          ) : (
            <></>
          )}
        </td>
        <td>
          <div className="order-id">
            <p
              onClick={() =>
                (window.location.href = "/orders/detail/" + order.faktorNo)
              }
            >
              {order.faktorNo}
            </p>
          </div>
        </td>
        <td>
          <div className="cu-avatar">
            <img src="/img/avatar/avatar_1.jpg" alt="avatar" />
            <div className="cu-name">
              <p className="name">{order.cName ? order.cName : "---"}</p>
              <p className="name">{order.phone ? order.phone : "---"}</p>
            </div>
            {order.moreInformation ? (
              <i className="fa fa-comment-o" title={order.moreInformation}></i>
            ) : (
              <></>
            )}
          </div>
        </td>
        {/* <td>
          <div className="order-num">
            <p className="email">
              {order.userInfo && order.userInfo[0]
                ? order.userInfo[0].phone
                : tabletrans.notEntered[lang]}
            </p>
          </div>
        </td> */}
        {/* <td>
          <PayStatus
            payStatus={order.payStatus}
            class={"order-status"}
            lang={props.lang}
          />
        </td> */}
        <td>
          <div className="order-num">
            <p>{order.transport}</p>
          </div>
        </td>
        <td>
          <div className="or-date">
            <p className="date">
              {new Date(order.initDate).toLocaleDateString("fa")}
            </p>
            <p className="time">
              {new Date(order.initDate).toLocaleTimeString(
                props.lang === "persian" ? "fa" : "en"
              )}
            </p>
          </div>
        </td>

        <td>
          <div className="order-price">
            <p>{normalPriceRound(order && order.totalPrice)}</p>
          </div>
        </td>
        <td>
          {/* {order.status && order.status == "archive" ? "آماده" : ""} */}
          <Status
            status={order.status}
            class={"order-status"}
            lang={props.lang}
          />
        </td>

        <td>
          <div className="more-btn">
            <i
              className={`tableIcon fas ${
                activeAcc ? "fa-chevron-up" : "fa-chevron-down"
              }`}
              onClick={HandleDetail}
            ></i>
            {/* <i
              className="tableIcon fas fa-edit"
              onClick={() =>
                (window.location.href = "/orders/detail/" + order.cartNo)
              }
            ></i> */}
            <i
              className="tableIcon fas fa-print"
              onClick={() =>
                (window.location.href = "/print/official/" + order.faktorNo)
              }
            ></i>
          </div>
        </td>
      </tr>
      {showDetail ? (
        <tr className="sub-order">
          <td colSpan="10">
            {DetailData ? (
              <div className="sub-order-table">
                {DetailData.map((item, i) => (
                  <div className="sub-row" key={i}>
                    <div className="sub-avatar">
                      <div className="sub-avatar-container">
                        <img
                          src={env.siteApiUrl + item.productData[0].thumbUrl}
                          alt={item.sku}
                        />
                        <div className="sub-info">
                          <p className="sub-name">{item.title}</p>
                          <p className="sub-id">کد محصول: {item.sku}</p>
                        </div>
                      </div>
                    </div>
                    <div className="sub-num">{item.count}</div>
                    <div className="sub-price">
                      {normalPriceCount(item.price)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              env.loader
            )}
          </td>
        </tr>
      ) : (
        <React.Fragment></React.Fragment>
      )}
    </React.Fragment>
  );
}
export default OrderTableRow;
