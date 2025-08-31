import { useEffect, useState } from "react";
import env from "../../../env";
import ImageSimple from "../../../components/ImageSimple";

function TaskUpload(props) {
  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState(props.defaultValue);
  console.log(imageUrl);
  useEffect(() => {
    const postOptions = {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        base64image: image && image.base64,
        imgName: image && image.fileName,
        folderName: "task",
      }),
    };
    image &&
      fetch(env.siteApi + "/panel/user/upload", postOptions)
        .then((res) => res.json())
        .then(
          (result) => {
            //console.log(result)
            props.action(env.siteApiUrl + "/" + result.url);
            setImageUrl(env.siteApiUrl + "/" + result.url);
          },
          (error) => {
            console.log(error);
          }
        )
        .catch((error) => {
          console.log(error);
        });
  }, [image]);
  return (
    <>
      <div className="prob-wrapper image-wrapper">
        {!imageUrl ? (
          <>
            <i className="fa-solid fa-upload" style={{ color: "#c0c0c0" }}></i>
            <div className="file-input">
              <ImageSimple
                cardName="Input Image"
                upTitle={"افزودن فایل"} // eslint-disable-line
                icon={"fa-paperclip"}
                htmlFor="file"
                setImage={setImage}
                setImageUrl={setImageUrl}
                part={2}
              />
              <input type="file" name="" id="file" />
            </div>
          </>
        ) : (
          <>
            <img src={imageUrl} className="imageTask " />
            <i
              class="fa fa-trash"
              aria-hidden="true"
              onClick={() => setImageUrl("")}
              style={{color:"red"}}
            ></i>
          </>
        )}
      </div>
    </>
  );
}
export default TaskUpload;
