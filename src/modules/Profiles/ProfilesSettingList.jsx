import React from "react";
import env from "../../env";
import { useState, useEffect } from "react";
import formtrans from "../../translate/forms";
import StyleSelect from "../../components/Button/AutoComplete";
import StyleInput from "../../components/Button/Input";
import { Autocomplete, TextField } from "@mui/material";
import PostReq from "../../utils/PostReq";
const ProfilesSettingList = (props) => {
  const {
    data,
    handleChanges,
    direction,
    lang,
    Loader,
    Setting,
    setSetting,
    UpdateProfile,
  } = props;
  const [AccessLists, setAccessLists] = useState();
  const [StoreList, setStoreList] = useState();
  const [ProfilesList, setProfilesList] = useState();
  const handleMultiple = (type, value) => {
    let newValue = value.map((item) => item._id);
    handleChanges(type, newValue);
  };
  useEffect(() => {
    FetchLists();
    FetchProfileLists();
  }, []);
  const FetchLists = async () => {
    const result = await PostReq({
      method: "Post",
      url: "/panel/user/list",
      body: {},
    });
    setAccessLists(result.access);
    setStoreList(result.storeList);
  };
  const FetchProfileLists = async () => {
    const result = await PostReq({
      method: "Post",
      url: "/panel/user/list-profiles",
      body: {},
    });
    setProfilesList(result.profiles);
  };

  return (
    <div className="ProfilesSettingList">
      <div className="side-by-side">
        <StyleInput
          title={formtrans.username[lang]}
          direction={direction}
          defaultValue={(data && data.username) || ""}
          class={"formInput"}
          action={(e) => handleChanges("username", e)}
        />
        <StyleInput
          title={formtrans.usercode[lang]}
          direction={direction}
          class={"formInput"}
          defaultValue={data && data.CustomerID}
          action={(e) => handleChanges("CustomerID", e)}
        />
        <StyleInput
          title={formtrans.newPassword[lang]}
          direction={direction}
          defaultValue={(data && data.password) || ""}
          class={"formInput"}
          action={(e) => handleChanges("password", e)}
        />
        <StyleInput
          title={formtrans.emailAddress[props.lang]}
          direction={props.direction}
          defaultValue={(data && data.email) || ""}
          class={"formInput"}
          action={(e) => handleChanges("email", e)}
        />
      </div>
      <div className="rows">
        <StyleSelect
          title={formtrans.access[lang]}
          direction={direction}
          defaultValue={data && data.access ? data.access : ""}
          class={"formInput"}
          options={AccessLists || []}
          label={"profileName"}
          action={(e) => handleChanges("access", e)}
        />

        <div className="formInput">
          <Autocomplete
            multiple
            options={ProfilesList || []}
            getOptionLabel={(item) => item.profileName || ""}
            style={{ width: "100%" }}
            defaultValue={data && data.profileData}
            onChange={(e, value) => handleMultiple("profile", value)}
            renderInput={(params) => (
              <TextField {...params} label="پروفایل" variant="outlined" />
            )}
          />
        </div>
        {/* <StyleSelect
          title={formtrans.store[lang]}
          direction={direction}
          class={"formInput"}
          defaultValue={
            StoreList &&
            StoreList.find((store) => store.StockID == data && data.StockId)
          }
          options={StoreList || []}
          label={"Title"}
          action={(e) => handleChanges("StockId", e.StockID)}
        /> */}

        {/* <div class="formInput">
          <Autocomplete
            multiple
            options={StoreList || []}
            getOptionLabel={(item) => item.Title || ""}
            style={{ width: "100%" }}
            defaultValue={data && data.StockArr}
            onChange={(e, value) => handleChanges("StockArr", value)}
            renderInput={(params) => (
              <TextField {...params} label="انبار" variant="outlined" />
            )}
          />
        </div> */}
      </div>
      <div className="create-btn-wrapper">
        <button
          type="button"
          className="add-btn"
          onClick={() => UpdateProfile(Setting == "new" ? "" : data._id)}
        >
          {formtrans.saveChanges[lang]}
        </button>
        <button
          type="button"
          className="cancel-btn"
          onClick={() => setSetting(false)}
        >
          {formtrans.cancel[lang]}
        </button>
      </div>
    </div>
  );
};

export default ProfilesSettingList;
