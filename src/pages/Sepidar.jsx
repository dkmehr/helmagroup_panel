import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import env from "../env";
import errortrans from "../translate/error";
import ShowError from "../components/Modal/ShowError";

const cookies = new Cookies();
function Sepidar(props) {
  const direction = props.lang ? props.lang.dir : errortrans.defaultDir;
  const lang = props.lang ? props.lang.lang : errortrans.defaultLang;
  const [error, setError] = useState({ message: "", color: "brown" });
  const [updateTime, setUpdateTime] = useState();
  const [Loader, setLoader] = useState(0);
  const token = cookies.get(env.cookieName);
  console.log(error);
  useEffect(() => {
    const postOptions = {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token && token.token,
        userId: token && token.userId,
      },
    };
    fetch(env.siteApi + "/update-log", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          const logList = result;
          var lastLog = {
            product: logList && logList.productLog && logList.productLog[0],
            // price: logList.priceLog[0],
            customers: logList && logList.customerLog && logList.customerLog[0],
          };
          console.log(lastLog);
          setUpdateTime(lastLog);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  const updateSepidar = (db) => {
    setLoader(db);
    const postOptions = {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token && token.token,
        userId: token && token.userId,
      },
      body: JSON.stringify(),
    };
    fetch(env.siteApi + "/get-" + db, postOptions, { mode: "cors" })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.error) {
            setError({ message: result.message, color: "brown" });
            setTimeout(() => setError({ message: "", color: "brown" }), 3000);
            setLoader(0);
          } else {
            setError({ message: result.message, color: "green" });
            setTimeout(() => window.location.reload(), 3000);
            setLoader(0);
          }
        },
        (error) => {
          console.log(error);
          setLoader(0);
        }
      );
  };
  const content = [
    {
      title: "محصولات و قیمت",
      enTitle: "product",
      description: "بروزرسانی محتوای محصولات",
    },
    // {
    //   title: "قیمت محصولات",
    //   enTitle: "price",
    //   description: "بروزرسانی قیمت محصولات",
    // },
    {
      title: "مشتریان",
      enTitle: "customers",
      description: "بروزرسانی مشتریان",
    },
  ];

  return (
    <div
      className="profiles"
      style={{ direction: direction, padding: "0px", overflow: "hidden" }}
    >
      <div
        className={
          direction === "ltr" ? "profile-table" : "profile-table profileRtl"
        }
      >
        <table>
          <tbody>
            {content &&
              content.map((filter, i) => (
                <tr key={i}>
                  <td>
                    <div className="profiles-title">
                      <i
                        className="fa-solid fa-certificate fa-sm"
                        style={{ color: "#00c6c6" }}
                      ></i>
                      <div className="p-wrapper">
                        <p>
                          {filter.title}
                          <span>({filter.enTitle})</span>
                        </p>
                        <p>{filter.description}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    {Loader == filter.enTitle ? (
                      <input
                        type="button"
                        value="درحال بروزرسانی"
                        className="btn bg-gradient-info my-4 mb-2"
                      />
                    ) : (
                      <input
                        type="button"
                        value="بروزرسانی"
                        className="btn bg-gradient-info my-4 mb-2"
                        onClick={() => updateSepidar(filter.enTitle)}
                      />
                    )}
                  </td>
                  <td>
                    {updateTime &&
                      updateTime[filter.enTitle] &&
                      new Date(
                        updateTime[filter.enTitle].date
                      ).toLocaleDateString("fa")}
                    <br />
                    <smal>
                      {updateTime &&
                        updateTime[filter.enTitle] &&
                        new Date(
                          updateTime[filter.enTitle].date
                        ).toLocaleTimeString("fa")}
                    </smal>
                  </td>
                  <td>
                    <small>
                      <span>کاربر: </span>
                      {updateTime &&
                        updateTime[filter.enTitle] &&
                        updateTime[filter.enTitle].updateUser}
                    </small>
                    <br />
                    <small>
                      <span>انبار: </span>
                      {updateTime &&
                        updateTime[filter.enTitle] &&
                        updateTime[filter.enTitle].Stock}
                    </small>
                  </td>
                  <td>
                    <div className="profiles-icons">
                      <i
                        className="fa-solid fa-pen-to-square fa-sm"
                        style={{ color: "#c0c0c0" }}
                      ></i>
                      <i
                        className="fa-solid fa-trash fa-sm"
                        style={{ color: "#c0c0c0" }}
                      ></i>
                    </div>
                  </td>
                </tr>
              ))}
            <tr>
              <td>
                <div className="profiles-title">
                  <i
                    className="fa-solid fa-certificate fa-sm"
                    style={{ color: "#00c6c6" }}
                  ></i>
                  <div className="p-wrapper">
                    <p>
                      همه
                      <span>(all)</span>
                    </p>
                    <p>بروزرسانی همه موارد</p>
                  </div>
                </div>
              </td>
              <td>
                {Loader == "all" ? (
                  <input
                    type="button"
                    value="درحال بروزرسانی"
                    className="btn bg-gradient-info my-4 mb-2"
                  />
                ) : (
                  <input
                    type="button"
                    value="بروزرسانی"
                    className="btn bg-gradient-success  my-4 mb-2"
                    onClick={() => updateSepidar("all")}
                  />
                )}
              </td>
              <td></td>
              <td></td>
              <td>
                <div className="profiles-icons">
                  <i
                    className="fa-solid fa-pen-to-square fa-sm"
                    style={{ color: "#c0c0c0" }}
                  ></i>
                  <i
                    className="fa-solid fa-trash fa-sm"
                    style={{ color: "#c0c0c0" }}
                  ></i>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {error && error.message ? (
        <ShowError title="" text={error.message} color={error.color} />
      ) : (
        <></>
      )}
    </div>
  );
}
export default Sepidar;
