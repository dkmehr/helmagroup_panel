import StyleSelect from "../../../components/Button/AutoComplete";
import StyleInput from "../../../components/Button/Input";
import { parseDesc } from "../../../env";
import tabletrans from "../../../translate/tables";

function ProductSKU(props) {
  const content = props.content;
  const def = content ? content.filter : "";
  const brand = content && content.brandList;
  const category = content && content.categoryList;
  const filterList = content && content.filterList;

  return (
    <div className="pd-row">
      <div className="row-title">
        <h4>{tabletrans.propertie[props.lang]}</h4>
        <p>{tabletrans.attributes[props.lang]}</p>
      </div>
      <div className="row-box">
        <div className="probs-wrapper">
          <div className="input-wrapper">
            {/*<StyleInput title={tabletrans.productCode[props.lang]} direction={props.direction}
                 class={"formInput"} defaultValue={def?def.productCode:''} 
                 action={(e)=>props.setProductChange(prevState => ({
                    ...prevState,
                    productCode:e
                  }))}/>*/}
            <StyleInput
              title={tabletrans.productSku[props.lang]}
              direction={props.direction}
              class={"formInput"}
              defaultValue={def ? def.sku : ""}
              action={(e) =>
                props.setProductChange((prevState) => ({
                  ...prevState,
                  sku: e,
                }))
              }
            />
            {/*<StyleInput title={tabletrans.quantity[props.lang]} direction={props.direction}
                 class={"formInput"} defaultValue={content?content.quantity:''} 
                 action={(e)=>props.setProductChange(prevState => ({
                    ...prevState,
                    quantity:e
                  }))}/>*/}
            <StyleSelect
              title="محصول اصلی"
              direction={props.direction}
              class={"formInput halfWidth"}
              defaultValue={
                def && def.isMaster
                  ? { title: "بلی", value: 1 }
                  : { title: "خیر", value: 0 }
              }
              options={[
                { title: "بلی", value: 1 },
                { title: "خیر", value: 0 },
              ]}
              label={"title"}
              action={(e) =>
                props.setProductChange((prevState) => ({
                  ...prevState,
                  isMaster: e ? e.value : 0,
                }))
              }
            />
            <StyleSelect
              title={tabletrans.category[props.lang]}
              direction={props.direction}
              class={"formInput halfWidth"}
              defaultValue={def ? def.categories : []}
              options={category ? category : []}
              label="title"
              multiSelect={true}
              action={(e) =>
                props.setProductChange((prevState) => ({
                  ...prevState,
                  categories: e,
                }))
              }
            />
            {filterList &&
              filterList.map((filter, i) => (
                <StyleSelect
                  title={filter.title}
                  direction={"rtl"}
                  class={"formInput halfWidth"}
                  key={i}
                  defaultValue={
                    def && def.filters ? def.filters[filter.enTitle] : ""
                  }
                  options={filter ? filter.optionsP : []}
                  label="title"
                  action={(e) =>
                    props.setFilters((data) => ({
                      ...data,
                      [filter.enTitle]: e,
                    }))
                  }
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductSKU;
