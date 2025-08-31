import Cookies from "universal-cookie";
import Paging from "../modules/Components/Paging";
import errortrans from "../translate/error";
import ErrorAction from "../components/Modal/ErrorAction";

import { useEffect } from "react";
import { useState } from "react";
import env from "../env";
import {
  getFiltersFromUrl,
  updateUrlWithFilters,
  defaultFilterValues,
  handleFilterChange,
} from "../utils/filterUtils"; // Import the utility functions
import PostReq from "../utils/PostReq";
const cookies = new Cookies();

function Message(props) {
  const direction = props.lang ? props.lang.dir : errortrans.defaultDir;
  const lang = props.lang ? props.lang.lang : errortrans.defaultLang;
  const [content, setContent] = useState("");
  const [UnreadContent, setUnreadContent] = useState("");
  const [filters, setFilters] = useState(getFiltersFromUrl());
  const [loading, setLoading] = useState(0);
  const [formalShow, setFormal] = useState(0);
  const [Loader, setLoader] = useState("");
  const [W8, setW8] = useState(0);
  const token = cookies.get(env.cookieName);

  function handleFilterChange(newFilters) {
    setFilters(newFilters);
    updateUrlWithFilters(newFilters);
  }
  const formalCustomer = async (id) => {
    const result = await PostReq({
      method: "Post",
      url: "/panel/user/official-customer",
      body: { userId: id },
    });
  };
  useEffect(() => {
    setLoading(1);

    const postOptions = {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token && token.token,
        userId: token && token.userId,
      },
      body: JSON.stringify(),
    };
    console.log(postOptions);
    fetch(env.siteApi + "/setting/list-notif", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          setLoading(0);
          setContent("");
          setUnreadContent("");
          setTimeout(() => setContent(result.filter), 200);
          setTimeout(() => setUnreadContent(result.unread), 200);
        },
        (error) => {
          setLoading(0);
          console.log(error);
        }
      );
  }, [filters, Loader]);
  const ReadNotif = async (id) => {
    const result = await PostReq({
      method: "Post",
      url: "/setting/update-notif",
      body: { status: false, notifCode: id },
    });
    setLoader(Loader + 1);
  };

  return (
    <div className="user" style={{ direction: direction }}>
      <div className="od-header">
        <div className="od-header-info">
          <div className="od-header-name">
            <p>{"پیام ها"}</p>
          </div>
        </div>
      </div>
      <div className="list-container">
        <div className="user-list" style={{ padding: ".5rem" }}>
          {loading
            ? env.loader
            : content &&
              content.map((item, i) => (
                <div
                  className="message-wrapper"
                  key={i}
                  style={{
                    backgroundColor:
                      item.status === false ? "lightgrey" : "white",
                  }}
                >
                  <div className="title">{i + 1 + " - " + item.title}</div>
                  <div className="description">{item.content}</div>
                  <div className="date">
                    <span>{new Date(item.date).toLocaleTimeString("fa")}</span>
                    <span>-</span>
                    <span>{new Date(item.date).toLocaleDateString("fa")}</span>
                  </div>
                  <div className="action">
                    <button
                      className="detail-btn"
                      onClick={() =>
                        (window.location.href =
                          "/customers/detail/" + item.customerId)
                      }
                    >
                      جزئیات
                    </button>
                    {/* {W8 ? (
                      <button className="active-btn">در حال پردازش</button>
                    ) : (
                      <button
                        className="active-btn"
                        onClick={() => updateUser(item.user, item._id)}
                      >
                        فعال سازی مشتری
                      </button>
                    )} */}
                  </div>
                  {item.status ? (
                    <i
                      className="fa fa-check close-btn"
                      style={{ color: "green", cursor: "pointer" }}
                      onClick={() => ReadNotif(item._id)}
                    ></i>
                  ) : (
                    <></>
                  )}
                </div>
              ))}
        </div>
        {formalShow ? (
          <ErrorAction
            title="فعال کردن مشتری"
            color="darkslateblue"
            text="مشتری بعد از ثبت در سپیدار، به عنوان مشتری فعال در خواهد آمد."
            close={() => setFormal(0)}
            buttonText="تایید"
            action={(e) => formalCustomer(e)}
          />
        ) : (
          <></>
        )}
        <Paging
          content={content}
          setFilters={handleFilterChange}
          filters={filters}
          lang={props.lang}
          updateUrlWithFilters={updateUrlWithFilters} // Pass the function as a prop
        />
      </div>
    </div>
  );
}
export default Message;
