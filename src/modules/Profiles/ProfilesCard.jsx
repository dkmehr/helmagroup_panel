import React from "react";
import env from "../../env";
import Cookies from "universal-cookie";
const ProfilesCard = ({ data, setSetting }) => {
  const cookies = new Cookies();
  const token = cookies.get(env.cookieName);
  const CurrentUser = token.userId;
  console.log(CurrentUser);
  return (
    <div className="ProfilesCard-wrapper" onClick={() => setSetting(data._id)}>
      <div className="ProfilesCard">
        <div className="main-part">
          {data.access && <div className="access">{data.access}</div>}
          <div className="profile-avatar">
            <img src="/def-profile.png" alt="avatar" />
            <span></span>
          </div>
          <div className="username">
            <p>{data.username}</p>
            
          </div>
        </div>
        <div className="footer-part">
          <div className="email">
            <p>{data.email}</p>
            <i class="fa fa-envelope-o" aria-hidden="true"></i>
          </div>
          {/* <div className="phone">
            <p>09120756356</p>
            <i class="fa fa-phone" aria-hidden="true"></i>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ProfilesCard;
