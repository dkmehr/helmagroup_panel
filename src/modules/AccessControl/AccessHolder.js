import { useEffect, useState } from "react";
import env from "../../env";
import errortrans from "../../translate/error";
import PostReq from "../../utils/PostReq";
function AccessHolder(props) {
  const direction = props.lang ? props.lang.dir : errortrans.defaultDir;
  const lang = props.lang ? props.lang.lang : errortrans.defaultLang;
  const [content, setContent] = useState("");
  useEffect(() => {
    const body = {
      access: "manager",
    };
    const postOptions = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    console.log(postOptions);
    fetch(env.siteApi + "/panel/user/list-profiles", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          setContent(result.profiles);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);
  const RemoveAccess = async (id) => {
    const result = await PostReq({
      method: "Post",
      url: "/panel/user/delete-profile",
      body: { profileId: id },
    });
    window.location.reload();
  };
  console.log(content);
  return (
    <div className="profiles" style={{ direction: direction }}>
      <div className="profiles-header">
        <h5>{errortrans.profiles[lang]}</h5>
        <div
          className="add-profile-btn"
          onClick={() => (window.location.href = "/access/detail/new")}
        >
          <i className="fa-solid fa-plus" style={{ color: "#ffffff" }}></i>
          <p>{errortrans.profile[lang]}</p>
        </div>
      </div>
      <div
        className={
          direction === "ltr" ? "profile-table" : "profile-table profileRtl"
        }
      >
        <table>
          <thead>
            <tr>
              <th>{errortrans.profileName[lang]}</th>
              <th>{errortrans.createdBy[lang]}</th>
              <th>{errortrans.createdOn[lang]}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {content &&
              content.map((profile, i) => (
                <tr key={i}>
                  <td>
                    <div className="profiles-title">
                      <i
                        className="fa-solid fa-certificate fa-sm"
                        style={{ color: "#00c6c6" }}
                      ></i>
                      <div
                        className="p-wrapper"
                        onClick={() =>
                          (window.location.href =
                            "/access/detail/" + profile._id)
                        }
                      >
                        <p>
                          {profile.profileName}
                          <span>({profile.profileCode})</span>
                        </p>
                        <p>{profile.description}</p>
                      </div>
                    </div>
                  </td>
                  <td>مدیریت</td>
                  <td>{new Date(profile.date).toLocaleDateString("fa")}</td>
                  <td>
                    <div className="profiles-icons">
                      <i
                        className="fa-solid fa-pen-to-square fa-sm"
                        style={{ color: "#c0c0c0" }}
                      ></i>
                      <i
                        className="fa-solid fa-trash fa-sm"
                        style={{ color: "#c0c0c0" }}
                        onClick={() => RemoveAccess(profile._id)}
                      ></i>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default AccessHolder;
