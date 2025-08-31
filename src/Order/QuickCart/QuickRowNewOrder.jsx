import { useState, useEffect } from "react";
import ErrorAction from "../../components/Modal/ErrorAction";
import env, { normalPriceCount, payValue, normalPriceRound } from "../../env";
import DataModal from "../../components/Modal/dataModal";
import QuickOff from "./QuickOff";
import QuickCounter from "./QuickCounter";
import PostReq from "../../utils/PostReq";
import ServiceDialog from "./ServiceDialog";
function QuickRowNewOrder(props) {
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

  const [AmountState, setAmountState] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  if (type == true) {
    setTab(true);
  }
  const fetchAmount = async (sku) => {
    setEditMode(1);
    const result = await PostReq({
      method: "Post",
      url: "/panel/faktor/calc-count",
      body: { sku: sku, stockId: props.cart.stockId },
    });
    setLiveCount(true);
    setAmount("");
    setTimeout(() => setAmount(result.count.quantity), 200);
  };
  console.log(LiveCount);
  const updateField = (changes) => {
    console.log(tab);
    if (!changes) return;

    const postOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token && token.token,
        userId: token && token.userId,
      },
      body: JSON.stringify({
        userId: user
          ? user.Code
            ? user.Code
            : user._id
          : token && token.userId,
        cartNo: props.cartNo,
        cartID: data._id,
        changes,
        isQuote: tab ? true : false,
      }),
    };

    fetch(
      env.siteApi +
        (props.cartNo
          ? `/panel/faktor/update-Item-cart`
          : `/panel/faktor/update-Item`),
      postOptions
    )
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.error) {
            props.setError({ message: result.error, color: "brown" });
            setTimeout(
              () => props.setError({ message: "", color: "brown" }),
              3000
            );
          } else {
            props.setCart(result);
            props.setError({ message: result.message, color: "orange" });
            setTimeout(
              () => props.setError({ message: "", color: "brown" }),
              3000
            );
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const [showRemove, setShowRemove] = useState();
  const removeItem = () => {
    const postOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token && token.token,
        userId: token && token.userId,
      },
      body: JSON.stringify({
        userId: user
          ? user.Code
            ? user.Code
            : user._id
          : token && token.userId,
        id: data._id,
        isQuote: tab ? true : false,
      }),
    };
    console.log(postOptions);
    fetch(env.siteApi + `/panel/faktor/remove-cart`, postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.error) {
            props.setError({ message: result.error, color: "brown" });
            setTimeout(
              () => props.setError({ message: "", color: "brown" }),
              3000
            );
          } else {
            props.setCart(result);
            props.setError({ message: result.message, color: "orange" });
            setTimeout(
              () => props.setError({ message: "", color: "brown" }),
              3000
            );
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };
  const defAction = () => {
    props.action({ cartID: data.id });
  };
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
          <div className="product-title" style={{ flexDirection: "row" }}>
            <div className="product-name">
              <p className="name" style={{ width: "100%" }}>
                {data.title}
              </p>
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
            <p>{data.count}</p>
          )}
        </td>

        <td data-cell="مبلغ واحد">
          {editMode ? (
            <input
              type="text"
              placeholder="قیمت واحد"
              value={changes ? changes.price : data.unitPrice}
              className="price-edit-input"
              onChange={(e) =>
                setChanges((prevState) => ({
                  ...prevState,
                  price: e ? e.target.value : "",
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
            <div className="more-btn" style={{ gap: ".5rem" }}>
              <i
                class="fa fa-server"
                aria-hidden="true"
                style={{ fontSize: "1.2rem" }}
                onClick={handleClickOpen}
              ></i>

              <i
                className="fa-solid fa-comment"
                onClick={() => setShowDesc(1)}
                style={{ fontSize: "1.2rem" }}
              ></i>

              <>
                <i
                  className="fa-solid fa-pen"
                  onClick={() => setEditMode(1)}
                  style={{ fontSize: "1.2rem" }}
                ></i>

                <i
                  className="fa-solid fa-trash"
                  style={{ color: "red", fontSize: "1.2rem" }}
                  onClick={() => setShowRemove(1)}
                ></i>
              </>
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
          action={() => (props.action ? defAction() : removeItem())}
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
      {open && (
        <ServiceDialog
          handleClose={handleClose}
          open={open}
          setOpen={setOpen}
          user={user}
          cartId={data._id}
          data={data?.service}
          setLoader={props.setLoader}
        />
      )}
    </>
  );
}
export default QuickRowNewOrder;
