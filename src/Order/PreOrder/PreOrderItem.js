import { useState } from "react";
import env, {
  PriceDiscountTax,
  TAX,
  normalPriceCount,
  normalPriceRound,
} from "../../env";
import tabletrans from "../../translate/tables";
import PostReq from "../../utils/PostReq";
function PreOrderItem(props) {
  const token = props.token;
  const data = props.data;
  const [showDetail, setDetail] = useState(0);
  const [DetailData, setDetailData] = useState();
  const [LinkShare, setLinkShare] = useState("");
  const [ShowReorder, setShowReorder] = useState(0);
  const [PayValue, setPayValue] = useState();

  //console.log(data.userData)
  const CreateLink = () => {
    const postOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token && token.token,
        userId: token && token.userId,
      },
      body: JSON.stringify({ cartNo: data.cartNo }),
    };
    fetch(env.siteApi + "/panel/faktor/create-public-link", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setLinkShare("/public-print/" + data.cartNo);
        },
        (error) => {
          console.log(error);
        }
      );
  };
  const HandleDetail = () => {
    if (showDetail) {
      setDetail(0);
    } else {
      setDetail(1);
      FetchFaktor(data.faktorNo);
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
  return (
    <div className="order-wrapper">
      <div className="border-title" onClick={HandleDetail}>
        <div className="bu-name">
          {data ? (
            <div className="col">
              <p>{data.cName ? data.cName : "-"}</p>
              {/* <span>
                {data.userInfo[0].meliCode
                  ? data.userInfo[0].meliCode
                  : "----------"}
                <i
                  className="fa-solid fa-credit-card no-font"
                  aria-hidden="true"
                ></i>
              </span> */}
              <span>
                {data.phone ? data.phone : "----------"}
                <i className="fa-solid fa-phone no-font" aria-hidden="true"></i>
              </span>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="newCol" style={{}}>
          <p>شماره سفارش: {data.faktorNo}</p>

          {/*<p>{normalPriceCount(total.totalPrice,1)}</p>*/}
        </div>
        <div className="newCol">
          <small>
            مبلغ کل:{" "}
            <strong>{data ? normalPriceCount(data.totalPrice) : "-"}</strong>
          </small>
          <div className="col">
            <p>تعداد: {data ? data.totalCount : 1}</p>
          </div>
        </div>
        <div className="newCol">
          <small>
            تاریخ: {new Date(data.initDate).toLocaleDateString("fa")}
          </small>
          <small>
            ساعت: {new Date(data.initDate).toLocaleTimeString("fa")}
          </small>
        </div>
        <div className="newCol">
          {data.description ? <small>توضیحات: </small> : <></>}
          <small>{data.description}</small>
        </div>
        <div class="btn-wrapper">
          <i
            className="tableIcon fas fa-print"
            onClick={() =>
              window.open("/print/official/" + data.faktorNo, "_blank")
            }
          ></i>
          <i
            className="tableIcon fas fa-paper-plane"
            onClick={() => CreateLink()}
          ></i>
          <i
            class="fa fa-refresh"
            aria-hidden="true"
            onClick={() => setShowReorder(data.faktorNo)}
          ></i>
        </div>
        <i
          className={
            showDetail ? "fa-solid fa-angle-up" : "fa-solid fa-angle-down"
          }
        ></i>
      </div>
      {showDetail ? (
        <div className="product-table-sec display-on height-on">
          <table>
            <thead>
              <tr>
                <th data-cell="ردیف">
                  <p>ردیف</p>
                </th>
                <th>
                  <p>{tabletrans.productName["persian"]}</p>
                </th>

                <th>
                  <p>{tabletrans.unitprice["persian"]}</p>
                </th>
                <th>
                  <p>{tabletrans.quantity["persian"]}</p>
                </th>
                <th>
                  <p>{tabletrans.discount["persian"]}</p>
                </th>
                <th>
                  <p>{tabletrans.price["persian"]}</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {DetailData &&
                DetailData.map((item, i) => (
                  <tr key={i}>
                    <td data-cell="ردیف">
                      <p>{i + 1}</p>
                    </td>
                    <td data-cell="شرح کالا">
                      <div className="product-title">
                        <div className="product-name">
                          <p className="name">{item.title}</p>
                          <p className="email">{item.sku}</p>
                        </div>
                      </div>
                    </td>
                    <td data-cell="قیمت واحد">
                      <p>{normalPriceCount(item.unitPrice)}</p>
                    </td>
                    <td data-cell="تعداد">
                      <p>{item.count}</p>
                    </td>

                    <td data-cell="تخفیف">
                      <p>{item.discount ? item.discount + "%" : ""}</p>
                    </td>
                    <td data-cell="قیمت">
                      <p>{normalPriceCount(item.price)}</p>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        <></>
      )}
      {/* {LinkShare ? (
        <LinkModal LinkShare={LinkShare} setLinkShare={setLinkShare} />
      ) : (
        <></>
      )} */}
      {/* {ShowReorder ? (
        <ReorderModal
          ShowReorder={ShowReorder}
          setShowReorder={setShowReorder}
          setPayValue={setPayValue}
          cartNo={ShowReorder}
        />
      ) : (
        <></>
      )} */}
    </div>
  );
}
export default PreOrderItem;
