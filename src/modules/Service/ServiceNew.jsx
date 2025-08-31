import React, { useState, useEffect } from "react";
import PostReq from "../../utils/PostReq";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import formtrans from "../../translate/forms";
import StyleInput from "../../components/Button/Input";
import Button from "@mui/material/Button";
const ServiceNew = (props) => {
  const { handleClose, setOpen, open } = props;
  const inputFields = ["title", "enTitle", "hesabfa", "price"];
  const [Changes, setChanges] = useState({});

  const handleChanges = (type, value) => {
    setChanges((prevState) => ({
      ...prevState,
      [type]: value ? value : "",
    }));
  };

  const saveService = async () => {
    const result = await PostReq({
      method: "post",
      url: "/panel/product/update-service",
      body: { ...Changes },
    });
    window.location.reload();
  };

  return (
    <Dialog open={open} onClose={handleClose} sx={{ direction: "rtl" }}>
      <DialogTitle>خدمات جدید</DialogTitle>
      <DialogContent sx={{ paddingBottom: 0 }}>
        <div className="input-container">
          {inputFields.map((field) => (
            <StyleInput
              key={field}
              title={formtrans[field]["persian"]}
              value={Changes[field] || ""}
              class={"formInput"}
              action={(e) => handleChanges(field, e)}
            />
          ))}
        </div>

        {/* <div className="switch-container">
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={
                    Changes.active !== undefined ? Changes.active : data.active
                  }
                  onChange={(e) => SwitchStatusHandler("active", e)}
                  inputProps={{ "aria-label": "controlled" }}
                  color="success"
                />
              }
              label="وضعیت"
            />
          </FormGroup>
        </div> */}
        <DialogActions>
          <Button onClick={handleClose}>لغو</Button>
          <Button onClick={saveService} type="submit">
            ذخیره
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceNew;
