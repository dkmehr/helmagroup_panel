import { normalPriceCount, normalPriceRound } from "../../env";
import ProductSingle from "./ProductSingle";
import env from "../../env";
import PostReq from "../../utils/PostReq";
import tabletrans from "../../translate/tables";
function ProductListTable(props) {
  const { token, user, setCart, lang } = props;
  const products = props.products;
  const AddProduct = async (data) => {
    const result = await PostReq({
      method: "Post",
      url: "/panel/faktor/update-cart",
      body: {
        userId: user
          ? user.Code
            ? user.Code
            : user._id
          : token && token.userId,
        date: Date.now,
        cartItem: {
          id: data._id,
          sku: data.sku,
          title: data.title,
          count: "1",
          price: data && data.price,
        },
        payValue: props.payValue,
      },
    });
    if (result && result.quickCart) setTimeout(() => setCart(result), 200);
  };

  return (
    <section className="product-sec" style={{ backgroundColor: "transparent" }}>
      <div
        className="product-table-sec display-on height-on"
        style={{ margin: "0px", backgroundColor: "white" }}
      >
        <table>
          <thead>
            <tr>
              <th data-cell="ردیف">
                <p>ردیف</p>
              </th>
              <th>
                <p>{tabletrans.productName["persian"]}</p>
              </th>
              <th>
                <p>{tabletrans.brand["persian"]}</p>
              </th>
              <th>
                <p>{tabletrans.model["persian"]}</p>
              </th>
              <th>
                <p>{tabletrans.color["persian"]}</p>
              </th>
              <th>
                <p>{tabletrans.km["persian"]}</p>
              </th>
              <th>
                <p>{tabletrans.gear["persian"]}</p>
              </th>
              <th>
                <p>{tabletrans.bodyColor["persian"]}</p>
              </th>
              <th>
                <p>{tabletrans.enterDate["persian"]}</p>
              </th>
              <th>
                <p>{tabletrans.ensurence["persian"]}</p>
              </th>
              <th>
                <p>{tabletrans.branch["persian"]}</p>
              </th>

              <th>
                <p>70%</p>
              </th>
              <th>
                <p>{tabletrans.price["persian"]}</p>
              </th>

              <th>
                <p>عملیات</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((item, i) => (
                <tr key={i}>
                  <td data-cell="ردیف">
                    <p>{i + 1}</p>
                  </td>
                  <td data-cell="شرح کالا">
                    <div className="product-title">
                      {/* <img
                        src={
                          item.imageUrl
                            ? env.siteApiUrl + item.imageUrl
                            : "/img/business/oil1.png"
                        }
                        alt="product"
                      /> */}
                      <div className="product-name">
                        <p className="name">{item.title}</p>
                        {/* <p className="email" style={{ color: "gray" }}>
                          {item.sku}
                        </p> */}
                      </div>
                    </div>
                  </td>

                  <td>
                    <p>{item.brand}</p>
                  </td>

                  <td>
                    <p>{item.model}</p>
                  </td>
                  <td>
                    <p>{item.filters && item.filters.color}</p>
                  </td>
                  <td>
                    <p>{item.km}</p>
                  </td>
                  <td>
                    <p>{item.filters && item.filters.gear}</p>
                  </td>
                  <td>
                    <p>{item.filters && item.filters.body}</p>
                  </td>
                  <td>
                    <p>{item.enterDate}</p>
                  </td>
                  <td>
                    <p>{item.bimeDate}</p>
                  </td>
                  <td>
                    <p>{item.filters && item.filters.branch}</p>
                  </td>

                  <td data-cell="مبلغ کل">
                    <p>
                      {normalPriceCount(
                        Math.ceil(Number(item.price ? item.price : 0) * 0.7)
                      )}
                    </p>
                  </td>
                  <td data-cell="مبلغ کل">
                    <p>{normalPriceCount(item.price)}</p>
                  </td>
                  <td>
                    <div className="more-btn" style={{ gap: 0 }}>
                      <button
                        onClick={() => AddProduct(item)}
                        style={{ fontSize: "1.1rem", fontWeight: "700" }}
                      >
                        +
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
export default ProductListTable;
