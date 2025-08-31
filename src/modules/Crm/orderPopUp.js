import { useEffect, useState } from "react";
import TaskMainPart from "./Tasks/TaskMainPart";
import env, { defPay, normalPriceCount, normalPriceRound } from "../../env";
import QuickCartHolder from "../../Order/QuickCart/QuickCartHolder";
import ShowError from "../../components/Modal/ShowError";
import TaskAction from "./Tasks/TaskAction";
import QuickRow from "../../Order/QuickCart/QuickRow";
import TaskBtns from "./Tasks/TaskBtns";
import TaskBarcode from "./Tasks/TaskBarcode";
import TaskDiscount from "./Tasks/TaskDiscount";
import PostReq from "../../utils/PostReq";
import DataModal from "../../components/Modal/dataModal";
function OrderPopUp(props) {
  const data = props.data;
  const token = props.token;
  const [payValue, setPayValue] = useState(defPay);
  const [content, setContent] = useState();
  const [BarcodeLoader, setBarcodeLoader] = useState("");
  const [showDescCart, setShowDescCart] = useState();

  //console.log(content)
  const [error, setError] = useState({ message: "", color: "brown" });
  useEffect(() => {
    const postOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token && token.token,
        userId: token && token.userId,
      },
      body: JSON.stringify({ faktorNo: data ? data.faktorNo : "" }),
    };
    fetch(env.siteApi + "/panel/faktor/fetch-faktor", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          setContent(result);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);
  const updateDesc = async (changes) => {
    if (!changes) return;
    const result = await PostReq({
      method: "Post",
      url: "/panel/faktor/update-faktor-data",
      body: {
        faktorNo: content.data.faktorNo,
        changes,
      },
    });
    setContent(result);
  };
  if (!content) {
    return;
  } else
    return (
      <section className="delete-modal">
        <div className="modal-backdrop show-modal">
          <div className="task-popup fullPopUp">
            <div className="orderModalTitle">
              <span>{data.cName} </span>
              <sub>({data.phone})</sub>
              <span> شماره سفارش: {data.faktorNo}</span>
              <span
                style={data.waitPay ? { color: "green" } : { color: "orange" }}
              >
                {" "}
                وضعیت پرداخت: {data.waitPay ? "پرداخت شده" : "در انتظار پرداخت"}
              </span>
              <div className="address-status">
                آدرس:
                {content.userDetail ? content.userDetail.Address : "-"}
              </div>
            </div>
            <div className="orderModalDate">
              <p className="date">
                {new Date(data.initDate).toLocaleDateString("fa")}
              </p>
              <p className="time">
                {new Date(data.initDate).toLocaleTimeString("fa")}
              </p>
            </div>
            <i className="fa fa-remove closeModal" onClick={props.close}></i>
            <div
              className="new-sharif sharif sharif-popup"
              style={{ padding: "70px 10px 10px", minHeight: "unset" }}
            >
              <main className="sharif-order-main" style={{ minHeight: "80vh" }}>
                <section
                  className="admin-table-sec "
                  style={{
                    maxHeight: "70%",
                    overflow: "auto",
                    display: "block",
                  }}
                >
                  <table>
                    <tbody>
                      <tr>
                        <th data-cell="ردیف">
                          <p>ردیف</p>
                        </th>
                        <th data-cell="کد کالا">
                          <p>کد کالا</p>
                        </th>
                        <th data-cell="شرح">
                          <p>شرح</p>
                        </th>
                        <th data-cell="تعداد">
                          <p>تعداد</p>
                        </th>
                        <th data-cell="مبلغ واحد">
                          <p>مبلغ واحد</p>
                        </th>
                        <th data-cell="تخفیف">
                          <p>تخفیف</p>
                        </th>
                        <th data-cell="مبلغ(ریال)">
                          <p>مبلغ کل</p>
                        </th>
                        <th></th>
                      </tr>
                      {content ? (
                        content.data &&
                        content.data.items.map((item, i) => (
                          <QuickRow
                            data={item}
                            key={i}
                            index={i + 1}
                            payValue={props.payValue ? props.payValue : "4"}
                            action={props.delete}
                            setError={props.setError}
                            token={props.token}
                            user={props.user}
                            setCart={setContent}
                            cartNo={props.cartNo}
                            canEdit={props.canEdit}
                            isEdit={content.canEdit}
                            setContent={setContent}
                            faktorData={content.data}
                            setBarcodeLoader={setBarcodeLoader}
                          />
                        ))
                      ) : (
                        <div>{env.loader}</div>
                      )}
                    </tbody>
                  </table>
                  {content && content.data.description && (
                    <>
                      <div className="order-desc">
                        <p>توضیحات:{content.data.description}</p>
                      </div>
                    </>
                  )}

                  <div class="product-table-btn-wrapper">
                    <div class="btn-wrapper" style={{ width: "fit-content" }}>
                      <button
                        type="button"
                        className="product-table-btn"
                        onClick={() => setShowDescCart(true)}
                      >
                        <p>توضیحات</p>
                        <i className="fa-solid fa-comment"></i>
                      </button>
                    </div>
                    <div class="total-amount" style={{ marginBottom: "0px" }}>
                      <div className="table">
                        <div className="t-wrapper">
                          <p>جمع فاکتور</p>
                          <p>
                            {normalPriceCount(content.data.totalPrice) || "-"}
                          </p>
                        </div>
                        <div className="t-wrapper">
                          <p>هزینه ارسال</p>
                          <p>
                            {normalPriceCount(content.data.transportPrice) ||
                              "-"}
                          </p>
                        </div>
                        <div className="t-wrapper">
                          <p>تخفیف کل</p>
                          <p>
                            {normalPriceCount(content.data.totalDiscountCart) ||
                              "-"}
                          </p>
                        </div>
                        <div className="t-wrapper">
                          <p>مبلغ کل </p>
                          <p>
                            {normalPriceRound(content.data.fullPrice) || "-"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </main>
            </div>
            {props.access && props.access === "edit" ? (
              <div className="crmAction">
                <TaskBtns
                  content={content}
                  token={token}
                  setError={setError}
                  data={props.data}
                  setBoard={(e) => props.setBoardArray(e)}
                  close={props.close}
                  setLoading={props.setLoading}
                  BarcodeLoader={BarcodeLoader}
                />
                {props.columnData.isStore ? (
                  <TaskBarcode
                    faktorNum={data.faktorNo}
                    setContent={setContent}
                    setBarcodeLoader={setBarcodeLoader}
                    BarcodeLoader={BarcodeLoader}
                  />
                ) : (
                  <></>
                )}
                {content.canEdit ? (
                  <TaskDiscount
                    faktorNum={data.faktorNo}
                    setContent={setContent}
                    setLoading={props.setLoading}
                  />
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        {error && error.message ? (
          <ShowError
            color={error.color}
            status={"مدیریت"}
            text={error.message}
          />
        ) : (
          <></>
        )}
        {showDescCart ? (
          <DataModal
            action={(e) => updateDesc({ description: e })}
            close={() => setShowDescCart(0)}
            color="darkblue"
            buttonText="ثبت توضیحات"
            title={"افزودن توضیحات فروش"}
            def={content.data.description}
          />
        ) : (
          <></>
        )}
      </section>
    );
}
export default OrderPopUp;
