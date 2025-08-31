import React from "react";
import { useState, useEffect } from "react";
import formtrans from "../../translate/forms";
import ProfilesSettingList from "./ProfilesSettingList";
import PostReq from "../../utils/PostReq";
import env from "../../env";
const ProfilesSetting = (props) => {
  const { setSetting, Setting, lang, direction } = props;
  const [Data, setData] = useState();
  const [Changes, setChanges] = useState();
  const [Loader, setLoader] = useState(true);
  const handleChanges = (type, value) => {
    setChanges((prevState) => ({
      ...prevState,
      [type]: value ? value : "",
    }));
  };
  const FetchProfile = async () => {
    if (Setting == "new") return setLoader(false);

    const result = await PostReq({
      method: "Post",
      url: "/panel/user/fetch-user",
      body: { userId: Setting },
    });
    setData(result.data);
    setLoader(false);
  };
  useEffect(() => {
    setLoader(true);
    FetchProfile();
  }, []);
  const UpdateProfile = async (userId) => {
    const result = await PostReq({
      method: "Post",
      url: "/panel/user/update-user",
      body: { _id: userId, ...Changes },
    });
    setTimeout(() => (window.location.reload(), 3000));
  };

  return (
    <div className="delete-modal">
      <div className="modal-backdrop show-modal">
        <div className="d-m-box profile-popup">
          <div className="d-m-header">
            {Setting == "new" ? <h4>کاربر جدید</h4> : <h4>اطلاعات کاربر</h4>}
            <i
              class="fa fa-times"
              aria-hidden="true"
              onClick={() => setSetting(false)}
            ></i>
          </div>
          <div className="d-m-content">
            <div className="profile-setting-wrapper">
              {!Loader ? (
                <ProfilesSettingList
                  data={Data}
                  handleChanges={handleChanges}
                  direction={direction}
                  lang={lang}
                  Loader={Loader}
                  setSetting={setSetting}
                  Setting={Setting}
                  UpdateProfile={UpdateProfile}
                />
              ) : (
                <>{env.loader}</>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilesSetting;
