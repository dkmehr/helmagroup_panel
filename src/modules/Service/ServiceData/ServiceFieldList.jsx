import React, { useState, useEffect } from "react";
import PostReq from "../../../utils/PostReq";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { Paper } from "@mui/material";
import FieldItem from "./FieldItem";
import FieldDialog from "./FieldDialog";

const ServiceFieldList = (props) => {
  const { serviceId, direction, lang } = props;
  const [Data, setData] = useState();
  const [loader, setLoader] = useState(1);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const FetchFieldList = async () => {
    const result = await PostReq({
      method: "Post",
      url: "/panel/product/list-service-item",
      body: { serviceCode: serviceId },
    });
    setData(result);
  };
  useEffect(() => {
    FetchFieldList();
  }, [loader]);

  return (
    <Paper
      className="stepGroupe-container"
      style={{ marginTop: "1rem", padding: "1rem" }}
    >
      <Stack
        className="stepGroupe-header"
        direction="row"
        spacing={2}
        alignItems={"center"}
      >
        <h5 style={{ marginLeft: "1rem" }}>فیلد ها</h5>
        <Chip
          label="افزودن فیلد"
          onClick={handleClickOpen}
          color="success"
          sx={{ fontSize: "1.2rem" }}
        />
      </Stack>
      {Data && (
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            gap: ".5rem",
            marginTop: "1rem",
          }}
        >
          {Data.filter.map((field, i) => (
            <FieldItem field={field} key={i} setLoader={setLoader} />
          ))}
        </div>
      )}
      <FieldDialog
        handleClose={handleClose}
        open={open}
        setOpen={setOpen}
        data={[]}
        setLoader={setLoader}
        serviceId={serviceId}
      />
    </Paper>
  );
};

export default ServiceFieldList;
