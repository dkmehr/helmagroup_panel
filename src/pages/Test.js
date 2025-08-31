import Cookies from "universal-cookie";

import { useEffect } from "react";
import { useState } from "react";
import env from "../env";
import PostReq from "../utils/PostReq";
function Test(props) {
  const [Content, setContent] = useState();
  const TestApi = async () => {
    const result = await PostReq({
      method: "Post",
      url: "/auth/login-otp",
      body: { username: "09214234099", otp: "3970" },
    });
    setContent(result);
  };

  return (
    <div className="user">
      <div className="od-header">
        <div className="od-header-info">
          <div className="od-header-name">
            <p>تست</p>
          </div>
        </div>
      </div>
      <div className="list-container">
        <button onClick={TestApi}>کلیک کنید</button>
        {Content&&Content.access}
      </div>
    </div>
  );
}
export default Test;
