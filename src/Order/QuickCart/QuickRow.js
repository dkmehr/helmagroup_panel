import { useState, useEffect } from "react";
import ErrorAction from "../../components/Modal/ErrorAction";
import env, { normalPriceCount, payValue, normalPriceRound } from "../../env";
import DataModal from "../../components/Modal/dataModal";
import QuickOff from "./QuickOff";
import QuickCounter from "./QuickCounter";
import PostReq from "../../utils/PostReq";
function QuickRow(props) {
  const data = props.data;
  const token = props.token;
  const user = props.user;
  const tab = props.tab;
  const type = props.cart && props.cart.isQuote && props.cart.isQuote;
  const LiveCount = props.LiveCount;
  const setLiveCount = props.setLiveCount;
  const setTab = props.setTab ?? props.setTab;
  const ErrorAmount = props.ErrorAmount;
  const Status = props.faktorData && props.faktorData.status;
  const [showDesc, setShowDesc] = useState(0);
  const [editMode, setEditMode] = useState(0);
  const [changes, setChanges] = useState();
  const [Amount, setAmount] = useState("");
  const [showRemove, setShowRemove] = useState();
  const [AmountState, setAmountState] = useState(false);
  if (type == true) {
    setTab(true);
  }
  console.log(LiveCount);
  const updateField = async (changes) => {
    if (!changes) return;
    const result = await PostReq({
      method: "Post",
      url: "/panel/faktor/update-faktor-item-data",
      body: {
        userId: user
          ? user.Code
            ? user.Code
            : user._id
          : token && token.userId,
        itemID: data._id,
        changes,
        isQuote: tab ? true : false,
      },
    });
    props.setCart(result);
  };

  const removeItem = async () => {
    const result = await PostReq({
      method: "Post",
      url: "/panel/faktor/remove-faktor-item-data",
      body: {
        userId: user
          ? user.Code
            ? user.Code
            : user._id
          : token && token.userId,
        itemID: data._id,
        isQuote: tab ? true : false,
      },
    });
    props.setCart(result);
  };
  // const updateField = (changes) => {
  //   console.log(tab);
  //   if (!changes) return;

  //   const postOptions = {
  //     method: "post",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "x-access-token": token && token.token,
  //       userId: token && token.userId,
  //     },
  //     body: JSON.stringify({
  //       userId: user
  //         ? user.Code
  //           ? user.Code
  //           : user._id
  //         : token && token.userId,
  //       itemID: data._id,
  //       changes,
  //       isQuote: tab ? true : false,
  //     }),
  //   };

  //   fetch(
  //     env.siteApi + `/panel/faktor/update-faktor-item-data`,

  //     postOptions
  //   )
  //     .then((res) => res.json())
  //     .then(
  //       (result) => {
  //         if (result.error) {
  //           props.setError({ message: result.error, color: "brown" });
  //           setTimeout(
  //             () => props.setError({ message: "", color: "brown" }),
  //             3000
  //           );
  //         } else {
  //           props.setCart(result);
  //           props.setError({ message: result.message, color: "orange" });
  //           setTimeout(
  //             () => props.setError({ message: "", color: "brown" }),
  //             3000
  //           );
  //         }
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     );
  // };

  // const removeItem = () => {
  //   const postOptions = {
  //     method: "post",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "x-access-token": token && token.token,
  //       userId: token && token.userId,
  //     },
  //     body: JSON.stringify({
  //       userId: user
  //         ? user.Code
  //           ? user.Code
  //           : user._id
  //         : token && token.userId,
  //       itemID: data._id,
  //       isQuote: tab ? true : false,
  //     }),
  //   };
  //   console.log(postOptions);
  //   fetch(env.siteApi + `/panel/faktor/remove-faktor-item-data`, postOptions)
  //     .then((res) => res.json())
  //     .then(
  //       (result) => {
  //         if (result.error) {
  //           props.setError({ message: result.error, color: "brown" });
  //           setTimeout(
  //             () => props.setError({ message: "", color: "brown" }),
  //             3000
  //           );
  //         } else {
  //           props.setCart(result);
  //           props.setError({ message: result.message, color: "orange" });
  //           setTimeout(
  //             () => props.setError({ message: "", color: "brown" }),
  //             3000
  //           );
  //         }
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     );
  // };
  // const defAction = () => {
  //   props.action({ cartID: data.id });
  // };
  const saveChanges = () => {
    updateField(changes);
    console.log(changes);
    setEditMode(0);
  };

  useEffect(() => {
    if (ErrorAmount && ErrorAmount.filter((l) => l.sku === data.sku).length) {
      setAmountState(true);
    } else {
      setAmountState(false);
    }
  }, [ErrorAmount]);
  console.log(props.canEdit);
  return (
    <>
      <tr
        className={`product-tr ${data.isRecieved ? "receivedTr" : ""} ${
          AmountState ? "red-bg" : ""
        } ${data.status && data.status == "quote" ? "quote-row" : ""}`}
      >
        <td data-cell="ردیف">
          <p>{props.index}</p>
        </td>
        <td data-cell="کد کالا">
          <p>{data.sku}</p>
        </td>

        <td data-cell="شرح کالا">
          <div
            className="product-title"
            style={{ flexDirection: "row", position: "relative" }}
          >
            <div
              className="product-name"
              style={{ display: "flex", flexDirection: "row", gap: "6px" }}
            >
              <p className="name" style={{ width: "100%" }}>
                {data.title}
              </p>
              <span
                style={{
                  color: "darkRed",
                }}
              >
                موجودی:{data.productData[0] && data.productData[0]?.stock}
              </span>
            </div>
          </div>
        </td>
        <td data-cell="تعداد">
          {editMode ? (
            <div className="input-tr">
              <QuickCounter
                setCount={(e) =>
                  setChanges((prevState) => ({
                    ...prevState,
                    count: e,
                  }))
                }
                unit={data && data.perBox ? data.perBox : 10}
                count={changes ? changes.count : data.count}
              />
            </div>
          ) : (
            <p>
              {data.count}
              {Status == "prepair" && (
                <span style={{ color: "green" }}>
                  ({data.recieveCount ? data.recieveCount : "0"})
                </span>
              )}
            </p>
          )}
        </td>

        <td data-cell="مبلغ واحد">
          {editMode ? (
            <input
              type="text"
              placeholder="قیمت واحد"
              value={changes ? changes.unitPrice : data.unitPrice}
              className="price-edit-input"
              onChange={(e) =>
                setChanges((prevState) => ({
                  ...prevState,
                  unitPrice: e ? e.target.value : "",
                }))
              }
            />
          ) : (
            <p>{normalPriceCount(data.unitPrice)}</p>
          )}
        </td>
        <td data-cell="تخفیف">
          {editMode ? (
            <div className="input-tr">
              <QuickOff
                change={(e) =>
                  setChanges((prevState) => ({
                    ...prevState,
                    discount: e,
                  }))
                }
                discount={changes ? changes.discount : data.discount}
                def={data.discount}
              />
            </div>
          ) : (
            <div className="discount-td">
              <p>
                {data.discount && data.discount}
                {parseInt(data.discount && data.discount) < 100 ? "%" : ""}
              </p>
              <span className="total-discount">
                {props.cart &&
                props.cart.discount &&
                props.cart.discount !== "0"
                  ? "+" + props.cart.discount + "%"
                  : ""}
              </span>
            </div>
          )}
        </td>
        <td data-cell="مبلغ کل">
          <p>{normalPriceCount(data.price && data.price)}</p>
        </td>
        <td>
          {editMode ? (
            <div className="more-btn">
              <i className="fa-solid fa-save" onClick={saveChanges}></i>
              <i
                className="fa-solid fa-remove"
                onClick={() => setEditMode(0)}
              ></i>
            </div>
          ) : (
            <div className="more-btn">
              <i
                className="fa-solid fa-comment"
                onClick={() => setShowDesc(1)}
              ></i>
              {props.isEdit ? (
                <>
                  <i
                    className="fa-solid fa-pen"
                    onClick={() => setEditMode(1)}
                  ></i>

                  <i
                    className="fa-solid fa-trash"
                    style={{ color: "red" }}
                    onClick={() => setShowRemove(1)}
                  ></i>
                </>
              ) : (
                <></>
              )}
            </div>
          )}
        </td>
      </tr>
      {showRemove ? (
        <ErrorAction
          status={"DELETE"}
          title={"حذف آیتم"}
          text={"آیتم انتخاب شده حذف خواهد شد. آیا مطمئن هستید؟"}
          linkText={""}
          style={{ direction: "rtl" }}
          buttonText="حذف"
          close={() => setShowRemove()}
          color="red"
          // action={() => (props.action ? defAction() : removeItem())}
          action={() => removeItem()}
        />
      ) : (
        <></>
      )}
      {showDesc ? (
        <DataModal
          action={(e) => updateField({ description: e })}
          close={() => setShowDesc(0)}
          color="darkblue"
          buttonText="تغییر توضیحات"
          def={data.description}
          title={"تغییر توضیحات"}
        />
      ) : (
        <></>
      )}
    </>
  );
}
export default QuickRow;
