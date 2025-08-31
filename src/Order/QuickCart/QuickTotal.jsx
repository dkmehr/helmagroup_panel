import { useState, useEffect, useRef } from "react";
import env, { normalPriceCount, normalPriceRound } from "../../env";
import ErrorActionKey from "../../components/Modal/ErrorActionKey";

function QuickTotal(props) {
  const token = props.token;
  const qCart = props.data;
  const user = props.user;
  const tab = props.tab;
  const inPerson = props.inPerson;
  const setPrintPop = props.setPrintPop;
  const [loading, setLoading] = useState(0);

  const [PopUp, setPopUp] = useState("");
  const focusBtn = useRef();
  const focusPop = useRef();

  const [preKey, setPreKey] = useState("");

  useEffect(() => {
    if (!props.action) {
      focusBtn.current && focusBtn.current.focus();
    }
  }, [qCart]);
  const SetOrder = (print) => {
    setLoading(1);
    setPrintPop("");

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
        isQuote: tab ? true : false,
        inPerson,
      }),
    };
    //console.log(postOptions)
    fetch(env.siteApi + `/panel/faktor/cart-to-faktor`, postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.error) {
            props.setError({ message: result.error, color: "brown" });
            setTimeout(
              () => props.setError({ message: "", color: "brown" }),
              5000
            );
            setLoading(0);
          } else {
            props.setError({ message: "کالا اضافه شد", color: "green" });
            setTimeout(
              () => props.setError({ message: "", color: "brown" }),
              2000
            );
            props.setCart(result);

            setLoading(0);
            if (print) {
              setPrintPop(result.cart[0].cartNo);
              setTimeout(() => {
                props.reactToPrintFn();
              }, 1000);
            }
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };
  const defAction = () => {
    props.action({ message: "acting" });
  };
  if (!qCart) return <div className="total-amount"></div>;
  else
    return (
      <div className="total-amount">
        <div className="table">
          <div className="t-wrapper">
            <p>تعداد</p>
            <p>{qCart.totalCount}</p>
          </div>
          <div className="t-wrapper">
            <p>حمل و نقل</p>
            <p>{normalPriceCount(qCart.transportPrice) || "-"}</p>
          </div>
          <div className="t-wrapper">
            <p>مجموع خدمات</p>
            <p>{normalPriceCount(qCart.totalServicePrice) || "-"}</p>
          </div>
          <div className="t-wrapper">
            <p>مجموع فاکتور</p>
            <p>{normalPriceCount(qCart.cartPrice) || "-"}</p>
          </div>
          <div className="t-wrapper">
            <p>تخفیف کل</p>
            <p>{normalPriceCount(qCart.totalDiscountCart) || "-"}</p>
          </div>
          {/* <div className="t-wrapper">
            <p>مالیات</p>
            <p>{normalPriceRound(qCart.totalTax)}</p>
          </div> */}
          <div className="t-wrapper">
            <p>مبلغ کل </p>
            <p>{normalPriceRound(qCart.fullPrice) || "-"}</p>
          </div>
        </div>

        {props.action ? (
          <></>
        ) : (
          <div className="total-btn-wrapper">
            {loading ? (
              <button className="product-table-btn temp-btn">
                <p>در حال پردازش</p>
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className="product-table-btn temp-btn"
                  // onClick={() => props.setOrderPop(true)}
                  onKeyDown={(e) =>
                    e.keyCode === 13
                      ? setPopUp({
                          action: false,
                          title: "ثبت درخواست",
                          print: false,
                        })
                      : null
                  }
                  onClick={() =>
                    setPopUp({
                      action: false,
                      title: "ثبت درخواست",
                      print: false,
                    })
                  }
                >
                  <p>ثبت درخواست</p>
                </button>
              </>
            )}
          </div>
        )}
        {PopUp ? (
          <ErrorActionKey
            preKey={preKey}
            setPreKey={setPreKey}
            focusPop={focusPop}
            status={"DELETE"}
            title={PopUp.title}
            text={"آیا از ثبت سفارش مطمئن هستید؟"}
            buttonText="تایید"
            close={() => setPopUp(0)}
            color="orange"
            action={() => SetOrder(PopUp.print)}
          />
        ) : (
          <></>
        )}
      </div>
    );
}
export default QuickTotal;
