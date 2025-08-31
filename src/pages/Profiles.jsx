import React, { useEffect, useState } from "react";
import env from "../env";
import PostReq from "../utils/PostReq";
import formtrans from "../translate/forms";
import errortrans from "../translate/error";
import ProfilesFilters from "../modules/Profiles/ProfilesFilters";
import ProfilesSetting from "../modules/Profiles/ProfilesSetting";
import ProfilesCardList from "../modules/Profiles/ProfilesCardList";
import Paging from "../modules/Components/Paging";
import "../modules/Profiles/Profiles.css";
import { updateUrlWithFilters } from "../utils/filterUtils";
const Profiles = (props) => {
  const direction = props.lang ? props.lang.dir : errortrans.defaultDir;
  const lang = props.lang ? props.lang.lang : errortrans.defaultLang;
  const [filters, setFilters] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [Setting, setSetting] = useState(false);
  const [Size, setSize] = useState();

  useEffect(() => {
    fetchProfileList();
  }, [filters]);
  const fetchProfileList = async () => {
    const result = await PostReq({
      method: "Post",
      url: "/panel/user/list",
      body: {
        offset: filters.offset || "0",
        pageSize: filters.pageSize || "25",

        search: filters.search,
      },
    });
    setProfiles(result.filter);
    setSize(result.size);
  };
  const HandleSetting = (setting) => {
    setSetting(setting);
  };
  return (
    <div className="Profile-Page" style={{ direction: direction }}>
      <div className="Profile-Header">
        <h4>{formtrans.users[lang]}</h4>
        <div className="Profile-search">
          <input type="search" placeholder="جستجو کاربر" />
          <i class="fa fa-search" aria-hidden="true"></i>
        </div>
        <button className="add-profile" onClick={() => HandleSetting("new")}>
          <i class="fa fa-plus" aria-hidden="true"></i>

          {formtrans.addUser[lang]}
        </button>
      </div>
      <div className="Profile-main">
        {Setting && (
          <ProfilesSetting
            setSetting={setSetting}
            Setting={Setting}
            lang={lang}
            direction={direction}
          />
        )}
        <ProfilesCardList profiles={profiles} setSetting={setSetting} />
        <Paging
          content={profiles}
          size={Size}
          filters={filters}
          lang={lang}
          setFilters={setFilters}
          updateUrlWithFilters={updateUrlWithFilters}
          // Pass the function as a prop
        />
      </div>
    </div>
  );
};

export default Profiles;
