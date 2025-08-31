import React, { useEffect, useState } from "react";
import env from "../../env";
import Cookies from "universal-cookie";
import PostReq from "../../utils/PostReq";
const cookies = new Cookies();

const PrintStore = (props) => {
  const token = cookies.get(env.cookieName);
  const [List, setList] = useState("");
  const url = window.location.pathname.split("/")[2];

  const FetchStore = async () => {
    const result = await PostReq({
      method: "Post",
      url: "/panel/crm/order-integrity",
      body: { status: url },
    });
    setList(result);
  };
  useEffect(() => {
    FetchStore();
  }, []);
  console.log(List);
  return (
    <div className="Print-store">
      <div className="tables-container">
        {List &&
          List.classifyData.map((Category, i) => (
            <>
              <h4 className="category">
                {Category.catName ? Category.catName : "---"}
              </h4>
              {Category.data &&
                Category.data.map((Brand, i) => (
                  <>
                    <h6 className="caption">
                      {Brand.masterName ? Brand.masterName : "_"}
                    </h6>
                    <table className="hesabfaMainTable" key={i}>
                      <tbody>
                        <tr>
                          <th className="x-small-td"></th>
                          <th className="x-small-td">#</th>
                          <th className="meduim-td">کد کالا</th>
                          <th className="small-td">مستر</th>
                          <th className="larg-td">عنوان کالا</th>

                          <th className="count-td">تعداد </th>
                          <th>توضیحات</th>
                        </tr>
                        {Brand.data &&
                          Brand.data.map((Item, i) => (
                            <tr key={i}>
                              <td className="x-small-td"></td>
                              <td className="x-small-td">{i + 1}</td>
                              <td className="meduim-td">{Item.sku}</td>
                              <td className="small-td">
                                {Brand.masterName ? Brand.masterName : "_"}
                              </td>
                              <td className="larg-td">{Item.title}</td>

                              <td className="count-td">{Item.count}</td>
                              <td></td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </>
                ))}
            </>
          ))}
      </div>

      <button className="PrintBtn" onClick={() => window.print()}>
        چاپ
      </button>
    </div>
  );
};

export default PrintStore;
