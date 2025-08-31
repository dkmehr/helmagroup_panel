import StyleInput from "../../../components/Button/Input";
import StyleSelect from "../../../components/Button/AutoComplete";
import StyleDatePicker from "../../../components/Button/DatePicker";
import tabletrans from "../../../translate/tables";
import { useState } from "react";

function OrderFilters(props) {
  const category = props.filters && props.filters.category;

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

  // Define the conditional action
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
          title={tabletrans.orderNumber[props.lang.lang]}
          direction={props.lang.dir}
          action={createConditionalAction("orderNo", 3)} // Remove the parentheses here
        />

        {/* <StyleInput
          title={tabletrans.mobileOrName[props.lang.lang]}
          direction={props.lang.dir}
          action={(e) => handleFilterChange("customer", e)}
        /> */}
        <StyleSelect
          title={tabletrans.status[props.lang.lang]}
          direction={props.lang.dir}
          options={props.StatusList}
          label="title"
          action={(e) => handleFilterChange("status", e ? e.enTitle : "")}
        />

        <StyleDatePicker
          title={tabletrans.selectDate[props.lang.lang]}
          class="filterComponent"
          direction={props.lang.dir}
          local={props.lang.dir === "ltr" ? "en" : "fa"}
          action={(e) =>
            props.setFilters((prevState) => ({
              ...prevState,
              date: e,
            }))
          }
        />
      </div>
    </div>
  );
}
export default OrderFilters;
