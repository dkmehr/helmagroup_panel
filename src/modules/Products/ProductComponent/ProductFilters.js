import StyleInput from "../../../components/Button/Input";
import StyleSelect from "../../../components/Button/AutoComplete";
import StyleDatePicker from "../../../components/Button/DatePicker";
import tabletrans from "../../../translate/tables";
import { useState } from "react";

function ProductFilters(props) {
  const lang = props.lang;
  const catList = props.catList;
  const handleFilterChange = (property, value) => {
    const newValue = value ? (value._id ? value._id : value) : "";
    props.setFilters((prevState) => ({
      ...prevState,
      [property]: newValue,
    }));
    // Update URL here
    props.updateUrlWithFilters({
      ...props.currentFilters,
      [property]: newValue,
    });
  };

  const createConditionalAction = (property, minLength) => {
    let typingTimeout;
    return (e) => {
      clearTimeout(typingTimeout);
      typingTimeout = setTimeout(() => {
        if (e.length > minLength || e.length === 0) {
          handleFilterChange(property, e);
        }
      }, 3000); // 3 seconds delay
    };
  };

  return (
    <div className="user-filter">
      <div className="serach-input">
        <StyleInput
          title={tabletrans.productTitle[lang.lang]}
          direction={props.lang.dir}
          action={createConditionalAction("title", 3)}
        />
        <StyleSelect
          title={"موجودی"}
          direction={props.lang.dir}
          label="title"
          options={[
            { title: "موجود", value: "1" },
            { title: "ناموجود", value: "2" },
          ]}
          action={(e) => handleFilterChange("exist", e ? e.value : "")}
        />
        <StyleSelect
          title={"دسته بندی"}
          direction={props.lang.dir}
          label="title"
          options={props.catList}
          action={(e) => handleFilterChange("catid", e ? e.catCode : "")}
        />
      </div>
    </div>
  );
}
export default ProductFilters;
