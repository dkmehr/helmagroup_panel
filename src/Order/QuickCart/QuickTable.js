import { useState } from "react";
import QuickNew from "./QuickNew";
import QuickRowNewOrder from "./QuickRowNewOrder";

function QuickTable(props) {
  const qCart = props.cart;
  const setTab = props.setTab;
  const [reload, setReload] = useState(1);
  const [LiveCount, setLiveCount] = useState("");
  console.log(qCart);
  return (
    <table>
      <thead>
        <tr>
          <th data-cell="ردیف">
            <p>ردیف</p>
          </th>
          <th data-cell="کد کالا">
            <p>کد کالا</p>
          </th>
          <th data-cell="شرح کالا">
            <p>شرح کالا</p>
          </th>
          {/* {LiveCount ? (
            <th data-cell="موجودی">
              <p>موجودی</p>
            </th>
          ) : (
            <></>
          )} */}
          <th data-cell="تعداد">
            <p>تعداد</p>
          </th>
          <th data-cell="مبلغ واحد">
            <p>مبلغ واحد</p>
          </th>
          <th data-cell="تخفیف">
            <p>تخفیف</p>
          </th>
          <th data-cell="مبلغ کل">
            <p>مبلغ کل</p>
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {reload ? (
          props.canEdit ? (
            <QuickNew
              tab={props.tab}
              data={props.data}
              setdata={props.setdata}
              token={props.token}
              payValue={props.payValue ? props.payValue : "4"}
              setCart={props.setCart}
              user={props.user}
              action={props.action}
              setError={props.setError}
              search={props.search}
              setSearch={props.setSearch}
              setReload={setReload}
              setLoading={props.setLoading}
              LiveCount={LiveCount}
            />
          ) : (
            <></>
          )
        ) : (
          <tr className="input-tr">
            <td colSpan={5}>
              <p>در حال ثبت</p>
            </td>
          </tr>
        )}
        {qCart &&
          qCart.cart &&
          qCart.cart.map((item, i) => (
            <QuickRowNewOrder
              ErrorAmount={props.ErrorAmount}
              setTab={setTab}
              tab={props.tab}
              data={item}
              cart={qCart}
              key={i}
              index={i + 1}
              payValue={props.payValue ? props.payValue : "4"}
              action={props.delete}
              setError={props.setError}
              token={props.token}
              user={props.user}
              setCart={props.setCart}
              cartNo={props.cartNo}
              canEdit={props.canEdit}
              setLiveCount={setLiveCount}
              LiveCount={LiveCount}
              setLoader={props.setLoader}
            />
          ))}
      </tbody>
    </table>
  );
}
export default QuickTable;
