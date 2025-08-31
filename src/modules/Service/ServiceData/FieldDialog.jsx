import React, { useState, useEffect } from "react";
import PostReq from "../../../utils/PostReq";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import formtrans from "../../../translate/forms";
import StyleInput from "../../../components/Button/Input";
import StyleSelect from "../../../components/Button/AutoComplete";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Chip } from "@mui/material";
const FieldDialog = (props) => {
  const { handleClose, setOpen, open, data, setLoader, serviceId } = props;
  const inputFields = ["title", "enTitle"];
  const [Changes, setChanges] = useState({});
  const [OptionList, setOptionList] = useState();
  const [itemInput, setItemInput] = useState("");
  const [items, setItems] = useState([]);
  const typeOptions = [
    { value: "Select", title: "لیست انتخابی" },
    { value: "input", title: "متن ساده" },
    { value: "CheckBox", title: "چک‌باکس" },
    { value: "Image", title: "آپلود تصویر" },
  ];
  useEffect(() => {
    if (data && data.options) setItems(data.options);
  }, [open]);
  console.log(data && data.options, items);
  const handleAddItem = () => {
    if (itemInput.trim() !== "") {
      setItems([...items, itemInput.trim()]);
      setItemInput("");
    }
  };
  const handleRemoveItem = (idx) => {
    setItems(items.filter((_, i) => i !== idx));
  };
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
  const handleSaveField = async () => {
    const result = await PostReq({
      method: "Post",
      url: "/panel/product/update-service-item",
      body: {
        serviceCode: serviceId,
        serviceItemId: data ? data._id : "",
        ...Changes,
        options: items,
      },
    });
    handleClose();
    setLoader(Math.random());
  };

  if (!data) return;
  return (
    <Dialog open={open} onClose={handleClose} sx={{ direction: "rtl" }}>
      <DialogTitle>ویرایش فیلد</DialogTitle>
      <DialogContent sx={{ paddingBottom: 0 }}>
        <div className="input-container">
          {inputFields.map((field) => (
            <StyleInput
              key={field}
              title={formtrans[field]["persian"]}
              value={Changes[field] || ""}
              defaultValue={data[field]}
              class={"formInput"}
              action={(e) => handleChanges(field, e)}
            />
          ))}
          <StyleSelect
            title={formtrans["type"]["persian"]}
            label="title"
            defaultValue={typeOptions.find(
              (opt) => opt.value === (data.type || "")
            )}
            class={"formInput"}
            options={typeOptions}
            action={(e) => handleChanges("type", e ? e.value : "")}
          />
          {data.type == "Select" || Changes.type == "Select" ? (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <TextField
                  label="افزودن آیتم"
                  value={itemInput}
                  onChange={(e) => setItemInput(e.target.value)}
                  size="small"
                  variant="outlined"
                />
                <IconButton
                  color="primary"
                  onClick={handleAddItem}
                  sx={{ ml: 1 }}
                >
                  <i class="fa fa-plus" aria-hidden="true"></i>
                </IconButton>
              </div>
              {items.map((item, i) => (
                <Chip
                  key={i}
                  label={item}
                  onDelete={() => handleRemoveItem(i)}
                  sx={{ direction: "ltr", margin: "6px" }}
                />
              ))}
              {/* <List dense>
                {items.map((item, idx) => (
                  <ListItem
                    key={idx}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleRemoveItem(idx)}
                      >
                        <i class="fa fa-times" aria-hidden="true"></i>
                      </IconButton>
                    }
                  >
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List> */}
            </>
          ) : (
            <></>
          )}
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
          <Button onClick={handleSaveField} type="submit">
            ذخیره
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default FieldDialog;
