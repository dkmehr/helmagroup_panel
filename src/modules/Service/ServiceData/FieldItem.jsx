import React, { useState, useEffect } from "react";
import FieldDialog from "./FieldDialog";
import Chip from "@mui/material/Chip";
import PostReq from "../../../utils/PostReq";
const FieldItem = ({ field, setLoader }) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDelete = async () => {
    const result = await PostReq({
      method: "Post",
      url: "/panel/product/remove-service-item",
      body: { serviceItemId: field._id },
    });
    setLoader(Math.random());
  };
  return (
    <>
      <Chip
        label={field.title}
        onClick={handleClickOpen}
        onDelete={handleDelete}
        sx={{ direction: "ltr", fontSize: "1.2rem" }}
      />
      <FieldDialog
        handleClose={handleClose}
        open={open}
        setOpen={setOpen}
        data={field}
        setLoader={setLoader}
        serviceId={field.serviceCode}
      />
    </>
  );
};

export default FieldItem;
