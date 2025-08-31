import React, { useState } from "react";
import formtrans from "../../../translate/forms";
import StyleInput from "../../../components/Button/Input";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Paper } from "@mui/material";
import PostReq from "../../../utils/PostReq";
const ServiceInfo = (props) => {
  const { lang, data, direction, setServiceLaoder } = props;
  const [Changes, setChanges] = useState({});
  const handleChanges = (type, value) => {
    setChanges((prevState) => ({
      ...prevState,
      [type]: value ? value : "",
    }));
  };
  const SwitchStatusHandler = (type, e) => {
    setChanges((prevState) => ({
      ...prevState,
      [type]: e.target.checked,
    }));
  };
  const saveServiceChanges = async () => {
    const result = await PostReq({
      method: "post",
      url: "/panel/product/update-service",
      body: { serviceId: data._id, ...Changes },
    });
    setServiceLaoder(Math.random());
  };
  const inputFields = ["title", "enTitle", "hesabfa", "price"];
  return (
    <Paper>
      <div className="input-container">
        {inputFields.map((field) => (
          <StyleInput
            key={field}
            title={formtrans[field][lang]}
            value={Changes[field] || ""}
            direction={direction}
            defaultValue={data[field]}
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
      <div
        className="btn-wrapper"
        style={{ display: "flex", justifyContent: "flex-end" }}
      >
        {Object.keys(Changes).length > 0 && (
          <button className="save-btn" onClick={saveServiceChanges}>
            {formtrans.saveChanges[lang]}
          </button>
        )}
      </div>
    </Paper>
  );
};

export default ServiceInfo;
