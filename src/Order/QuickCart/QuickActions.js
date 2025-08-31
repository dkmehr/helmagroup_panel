import { useEffect, useState } from "react";
import DataModal from "../../components/Modal/dataModal";
import env from "../../env";

function QuickActions(props) {
  const { tab, token, cart, setInPerson, inPerson } = props;
  const [showDesc, setShowDesc] = useState(0);
  const [showDescSale, setShowDescSale] = useState(0);
  const [description, setDescription] = useState(cart && cart.description);
  const [showDisc, setShowDisc] = useState(0);
  const [discount, setDiscount] = useState();
  const [disText, setDisText] = useState(cart && cart.totalDiscount);

  const setDisFunc = (value) => {
    let intVal = value ? parseFloat(value) : 0;

    setDisText(intVal);
  };
  useEffect(() => {
    //if(!description&&!discount)return
    if (!cart) return;
    if (cart.discount == disText && cart.description == description) return;
    const postOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token && token.token,
        userId: token && token.userId,
      },
      body: JSON.stringify({
        description: description,
        discount: discount,
        userId: props.user ? props.user._id : "",
        cartNo: props.cartNo,
        isQuote: tab ? true : false,
      }),
    };
    console.log(postOptions);
    fetch(env.siteApi + `/panel/faktor/update-cart-data`, postOptions)
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
            //if(!props.action)
            props.setCart(result);
            props.setError({ message: result.message, color: "green" });
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
  }, [description, discount]);
  useEffect(() => {
    if (!cart || !cart.payValue) return;
    if (cart.payValue == props.payValue) return;
    const postOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token && token.token,
        userId: token && token.userId,
      },
      body: JSON.stringify({
        userId: props.user ? props.user._id : "",
        payValue: props.payValue,
        cartNo: props.cartNo,
        isQuote: tab ? true : false,
      }),
    };
    //console.log(postOptions)
    fetch(env.siteApi + `/panel/faktor/edit-payValue`, postOptions)
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
            //if(!props.action)
            props.setCart(result);
            props.setError({ message: result.message, color: "green" });
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
  }, [props.payValue]);
  return (
    <div className="btn-wrapper">
      {props.canEdit ? (
        <button type="button" className="product-table-btn pay-metod-btn">
          <div
            className={inPerson ? "cash-pay display-on" : "cash-pay"}
            onClick={() => setInPerson(false)}
          >
            <p>تحویل حضوری</p>
            <i class="fa fa-user-o" aria-hidden="true"></i>
          </div>
          <div
            className={!inPerson ? "check-pay display-on" : "check-pay"}
            onClick={() => setInPerson(true)}
          >
            <p>ارسال با پست</p>
            <i class="fa fa-truck" aria-hidden="true"></i>
          </div>
        </button>
      ) : (
        <></>
      )}
      <button
        type="button"
        className="product-table-btn"
        onClick={() => setShowDesc(1)}
      >
        <p>توضیحات</p>
        <i className="fa-solid fa-comment"></i>
      </button>
      {/* <button
        type="button"
        className="product-table-btn"
        onClick={() => setShowDescSale(1)}
      >
        <p>توضیحات فروش</p>
        <i className="fa-solid fa-comment"></i>
      </button> */}
      {props.canEdit ? (
        showDisc ? (
          <button type="button" className="product-table-btn">
            <input
              type="input"
              placeholder="تخفیف"
              value={disText}
              onChange={(e) => setDisFunc(e.target.value)}
            />
            <i
              className="fa fa-check"
              onClick={() => (setDiscount(disText), setShowDisc(0))}
            ></i>
            <i className="fa fa-remove" onClick={() => setShowDisc(0)}></i>
          </button>
        ) : (
          <button
            type="button"
            className="product-table-btn"
            onClick={() => setShowDisc(1)}
          >
            <p>تخفیف</p>
            <i className="fa-solid fa-percent"></i>
          </button>
        )
      ) : (
        <></>
      )}

      {showDesc ? (
        <DataModal
          action={(e) => setDescription(e)}
          close={() => setShowDesc(0)}
          color="darkblue"
          buttonText="ثبت توضیحات"
          def={description}
          title={"افزودن توضیحات"}
        />
      ) : (
        <></>
      )}
      {showDescSale ? (
        <DataModal
          action={(e) => setDescription(e)}
          close={() => setShowDescSale(0)}
          color="darkblue"
          buttonText="ثبت توضیحات"
          def={description}
          title={"افزودن توضیحات فروش"}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
export default QuickActions;
