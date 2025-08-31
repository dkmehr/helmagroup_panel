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

  if (!data) return;

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
                            style={{ width: "100%" }}
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
