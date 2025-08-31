import { useEffect, useState } from "react";
import tabletrans from "../../translate/tables";
import ProductTableRow from "./ProductTableRow";

function ProductTable(props) {
  const productList = props.product;
  const lang = props.lang;
  const [detail, showDetail] = useState(-1);
  const selectItems = props.selectItems;
  const setSelectItems = props.setSelectItems;
  useEffect(() => {
    setSelectItems(
      new Array(productList && productList.filter.length).fill(false)
    );
  }, [productList]);
  const updateAll = (e) => {
    e.target.checked
      ? setSelectItems(
          productList && productList.filter.map((item) => item.sku)
        )
      : setSelectItems(
          new Array(productList && productList.filter.length).fill(false)
        );
  };
  return (
    <table>
      <thead>
        <tr>
          <th style={{ width: "30px" }}>
            <p>ردیف</p>
          </th>
          <th className="checkBoxStyle">
            <input
              type="checkbox"
              name=""
              id=""
              onChange={(e) => updateAll(e)}
            />
          </th>
          <th>
            <p>{tabletrans.productName[lang]}</p>
            <i></i>
          </th>
          <th>
            <p>{tabletrans.price[lang]}</p>
            <i></i>
          </th>
          <th>
            <p>{tabletrans.category[lang]}</p>
            <i></i>
          </th>
          <th>
            <p>{tabletrans.countanbar[lang]}</p>
            <i></i>
          </th>

          <th></th>
        </tr>
      </thead>
      <tbody>
        {productList && productList.filter
          ? productList.filter.map((product, i) => (
              <ProductTableRow
                detail={detail}
                showDetail={showDetail}
                token={props.token}
                product={product}
                index={i}
                key={i}
                lang={lang}
                stockId={props.store}
                setSelectItems={setSelectItems}
                selectItems={selectItems}
              />
            ))
          : ""}
      </tbody>
    </table>
  );
}
export default ProductTable;
