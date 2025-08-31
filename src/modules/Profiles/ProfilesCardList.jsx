import React from "react";
import ProfilesCard from "./ProfilesCard";
const ProfilesCardList = (props) => {
  const { profiles, setSetting } = props;
  return (
    <div className="ProfilesCardList">
      {profiles &&
        profiles.map((profile, p) => (
          <ProfilesCard data={profile} key={p} setSetting={setSetting} />
        ))}
          
    </div>
  );
};

export default ProfilesCardList;
