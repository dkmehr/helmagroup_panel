import StyleInput from "../../components/Button/Input";
import tabletrans from "../../translate/tables";
import StyleSelect from "../../components/Button/AutoComplete";

function DUserFilters(props) {
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

  return (
    <div className="user-filter d-filter">
      <div className="serach-input">
        <StyleInput
          title={tabletrans.customer[props.lang.lang]}
          direction={props.lang.dir}
          action={(e) => handleFilterChange("customer", e)}
        />
        <StyleSelect
          title={"دسته بندی"}
          class="filterComponent"
          direction={props.lang.dir}
          label="title"
          options={props.CategoryList}
          action={(e) => handleFilterChange("category", e._id)}
        />
        {/* <StyleInput
          title={tabletrans.discount[props.lang.lang]}
          direction={props.lang.dir}
          action={(e) => handleFilterChange("discount", e)}

        /> */}
        {/* <i className="tableIcon fas fa-ellipsis-v"></i> */}
      </div>
    </div>
  );
}
export default DUserFilters;
