import PreOrderItem from "./PreOrderItem";
import { useState } from "react";
import env from "../../env";
import tabletrans from "../../translate/tables";
import StyleDatePicker from "../../components/Button/DatePicker";
function PreOrderHolder(props) {
  const token = props.token;
  const user = props.user;
  const cart = props.cart && props.cart.faktors;
  const total = props.cart && props.cart.cartDetail;
  if (!cart) return <></>;
  else
    return (
      <section className="orders-sec">
        <div className="title">
          <p>سفارشات</p>
          <div class="serach-input">
            <StyleDatePicker
              title={tabletrans.selectDate[props.lang.lang]}
              class="filterComponent"
              direction={props.lang.dir}
              local={props.lang.dir === "ltr" ? "en" : "fa"}
              action={(e) => props.setDate(e)}
            />
          </div>
          <div className="orders-total" style={{ minWidth: "fit-content" }}>
            <p style={{ whiteSpace: "nowrap" }}>
              تعداد سفارشات : {cart.length}
            </p>
          </div>
        </div>
        {cart.map((cart, i) => (
          <PreOrderItem
            key={i}
            data={cart}
            setCart={props.setCart}
            total={total}
            index={i}
            token={token}
            user={user}
            setError={props.setError}
          />
        ))}
      </section>
    );
}
export default PreOrderHolder;
