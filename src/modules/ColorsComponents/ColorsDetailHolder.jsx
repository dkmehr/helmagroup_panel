import React, { useRef, useEffect, useState } from "react";
import env from "../../env";
import StyleInput from "../../components/Button/Input";
import errortrans from "../../translate/error";
import tabletrans from "../../translate/tables";
import formtrans from "../../translate/forms";
import { MuiColorInput } from "mui-color-input";
import PostReq from "../../utils/PostReq";

function ColorsDetailHolder(props) {
  const url = window.location.pathname.split("/")[3];
  const direction = props.lang ? props.lang.dir : errortrans.defaultDir;
  const lang = props.lang ? props.lang.lang : errortrans.defaultLang;
  const [ColorChange, setColorChange] = useState();
  const [content, setContent] = useState();
  const [value, setValue] = useState();
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    FetchColor();
  }, []);
  const FetchColor = async () => {
    if (url == "new") return;
    const result = await PostReq({
      method: "Post",
      url: "/panel/product/fetch-color",
      body: { colorId: url },
    });

    setContent(result.filter);
    setValue(result.filter.colorCode);
  };
  const UpdateColor = async () => {
    const result = await PostReq({
      method: "Post",
      url: "/panel/product/update-color",
      body: { colorId: url, ...ColorChange, colorCode: value },
    });
    setTimeout(() => (window.location.href = "/colors"), 2000);
  };

  return (
    <div className="new-item" style={{ direction: direction }}>
      <div className="create-product">
        {url == "new" ? (
          <h4>{tabletrans.addColor[lang]}</h4>
        ) : (
          <h4>{tabletrans.editColor[lang]}</h4>
        )}
        {content || url === "new" ? (
          <div className="pages-wrapper">
            <div className="item-box color-details-holder">
              <StyleInput
                title={tabletrans.colorName[lang]}
                direction={direction}
                defaultValue={content ? content.title : ""}
                action={(e) =>
                  setColorChange((prevState) => ({
                    ...prevState,
                    title: e,
                  }))
                }
              />
              <StyleInput
                title={tabletrans.colorenName[lang]}
                direction={direction}
                defaultValue={content ? content.enTitle : ""}
                action={(e) =>
                  setColorChange((prevState) => ({
                    ...prevState,
                    enTitle: e,
                  }))
                }
              />
              <MuiColorInput
                format="hex"
                value={value}
                onChange={handleChange}
              />
            </div>
            <div className="create-btn-wrapper">
              <div className="add-btn" onClick={UpdateColor}>
                {formtrans.saveChanges[lang]}
              </div>
              <div
                className="cancel-btn"
                onClick={() => (window.location.href = "/colors")}
              >
                {formtrans.cancel[lang]}
              </div>
            </div>
          </div>
        ) : (
          <div>{env.loader}</div>
        )}
      </div>
    </div>
  );
}
export default ColorsDetailHolder;
