import React, { useState, useEffect } from "react";
import env from "../../env";
import PostReq from "../../utils/PostReq";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import formtrans from "../../translate/forms";
import StyleInput from "../../components/Button/Input";
import StyleSelect from "../../components/Button/AutoComplete";
import Button from "@mui/material/Button";
import { Checkbox, FormControlLabel } from "@mui/material";
import ImageSimple from "../../components/Button/ImageSimple";
const ServiceDialog = (props) => {
  const {
    handleClose,
    setOpen,
    open,
    data,
    serviceId,
    user,
    cartId,
    setLoader,
  } = props;
  const [Changes, setChanges] = useState({});

  const [ServiceList, setServiceList] = useState();
  const [FiledList, setFiledList] = useState();
  const [SelectedService, setSelectedService] = useState();
  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const UploadImage = async () => {
    if (!image) return;
    const result = await PostReq({
      method: "Post",
      url: "/panel/user/upload",
      body: {
        base64image: image && image.base64,
        imgName: image && image.fileName,
        folderName: "service",
      },
    });
    handleChanges("imageUrl", result.url);
  };
  useEffect(() => {
    UploadImage();
  }, [image]);
  // useEffect(() => {
  //   const postOptions = {
  //     method: "post",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       base64image: image && image.base64,
  //       imgName: image && image.fileName,
  //       folderName: "brand",
  //     }),
  //   }; //URL.createObjectURL(image)
  //   //console.log(postOptions)
  //   image &&
  //     fetch(env.siteApi + "/panel/user/upload", postOptions)
  //       .then((res) => res.json())
  //       .then(
  //         (result) => {
  //           console.log(result);
  //           props.action(result.url);
  //         },
  //         (error) => {
  //           console.log(error);
  //         }
  //       )
  //       .catch((error) => {
  //         console.log(error);
  //       });
  // }, [image]);
  const handleChanges = (type, value) => {
    setChanges((prevState) => ({
      ...prevState,
      [type]: value ? value : "",
    }));
  };

  const fetchServices = async () => {
    const result = await PostReq({
      method: "Post",
      url: "/panel/product/list-services",
      body: {},
    });
    setServiceList(result.filter);
  };
  const fetchFields = async (ServiceId) => {
    const result = await PostReq({
      method: "Post",
      url: "/panel/product/list-service-item",
      body: {
        serviceCode: ServiceId,
      },
    });
    setFiledList(result.filter);
  };

  const submitService = async () => {
    const result = await PostReq({
      method: "Post",
      url: "/panel/faktor/add-service-cart",
      body: {
        userId: user._id,
        cartId: cartId,
        ...Changes,
        hesabfa: SelectedService ? SelectedService.hesabfa : "",
      },
    });
    setLoader(Math.random());
  };
  useEffect(() => {
    fetchServices();
    if (data) {
      fetchFields(data.serviceId);
      setSelectedService(data);
      setChanges({ ...data }); // <-- This line initializes Changes with data values
    } else {
      setChanges({});
    }
  }, []);
  const handleServiceChanges = (e) => {
    fetchFields(e ? e._id : "");
    setSelectedService(e);
  };
  const handleReset = () => {
    handleClose();
    setChanges({});
  };
  console.log(Changes);
  if (!ServiceList) return;
  const matchedService =
    data && ServiceList
      ? ServiceList.find((service) => service.hesabfa === data.hesabfa)
      : null;
  return (
    <Dialog open={open} onClose={handleClose} sx={{ direction: "rtl" }}>
      <DialogTitle>خدمات</DialogTitle>
      <DialogContent sx={{ paddingBottom: 0 }}>
        <div className="input-container">
          <StyleSelect
            title={formtrans["type"]["persian"]}
            label="title"
            class={"formInput"}
            options={ServiceList}
            defaultValue={matchedService}
            action={handleServiceChanges}
          />
          {SelectedService &&
            FiledList &&
            FiledList.map((field) => {
              switch (field.type) {
                case "input":
                  return (
                    <StyleInput
                      key={field.name}
                      title={field.title || formtrans[field.name]?.persian}
                      value={Changes[field.enTitle] || ""}
                      defaultValue={Changes[field.enTitle] || ""}
                      class={"formInput"}
                      action={(e) => handleChanges(field.enTitle, e)}
                      style={{ width: "100%" }}
                    />
                  );
                case "Select":
                  return (
                    <StyleSelect
                      key={field.name}
                      title={field.title || formtrans[field.name]?.persian}
                      label="title"
                      class={"formInput"}
                      defaultValue={Changes[field.enTitle] || ""}
                      options={field.options || []}
                      value={Changes[field.enTitle] || ""}
                      action={(e) => handleChanges(field.enTitle, e)}
                    />
                  );
                case "CheckBox":
                  return (
                    <FormControlLabel
                      className={"formInput"}
                      sx={{ width: "100%" }}
                      key={field.name}
                      control={
                        <Checkbox
                          checked={!!Changes[field.enTitle]}
                          onChange={(e) =>
                            handleChanges(field.enTitle, e.target.checked)
                          }
                        />
                      }
                      label={field.title || formtrans[field.name]?.persian}
                    />
                  );
                case "Image":
                  return (
                    <div className="images" style={{ position: "relative" }}>
                      {Changes && Changes.imageUrl ? (
                        <>
                          <img
                            src={
                              Changes && Changes.imageUrl
                                ? env.siteApiUrl + Changes.imageUrl
                                : ""
                            }
                            style={{ width: "100%", position: "unset" }}
                          />
                        </>
                      ) : (
                        <ImageSimple
                          cardName="Input Image"
                          imageGallery={[]}
                          setImage={setImage}
                          setImageUrl={setImageUrl}
                          part={props.part}
                        />
                      )}
                    </div>
                  );
                default:
                  return null;
              }
            })}
        </div>

        <DialogActions>
          <Button onClick={handleReset}>لغو</Button>
          <Button onClick={submitService}>ذخیره</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDialog;
