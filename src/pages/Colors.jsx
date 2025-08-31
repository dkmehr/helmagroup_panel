import Paging from "../modules/Components/Paging";
import errortrans from "../translate/error";
import { useEffect } from "react";
import { useState } from "react";
import env from "../env";
import tabletrans from "../translate/tables";
import {
  getFiltersFromUrl,
  updateUrlWithFilters,
  defaultFilterValues,
  handleFilterChange,
} from "../utils/filterUtils"; // Import the utility functions
import ColorTable from "../modules/ColorsComponents/ColorTable";
import PostReq from "../utils/PostReq";
import "../modules/ColorsComponents/Colors.css";
function Colors(props) {
  const direction = props.lang ? props.lang.dir : errortrans.defaultDir;
  const lang = props.lang ? props.lang.lang : errortrans.defaultLang;
  const [content, setContent] = useState("");
  const [filters, setFilters] = useState("");
  const [loading, setLoading] = useState(0);

  useEffect(() => {
    setLoading(1);
    ColorsList();
  }, [filters]);
  const ColorsList = async () => {
    const result = await PostReq({
      method: "Post",
      url: "/panel/product/list-color",
      body: {
        offset: filters.offset || "0",
        pageSize: filters.pageSize || "10",
      },
    });
    setTimeout(() => setLoading(0), 1000);
    setContent(result);
  };

  return (
    <div className="user colors" style={{ direction: direction }}>
      <div className="od-header">
        <div className="od-header-info">
          <div className="od-header-name">
            <p>{tabletrans.colors[lang]}</p>
          </div>
        </div>
        <div className="od-header-btn">
          <div
            className="edit-btn add-btn"
            onClick={() => (window.location.href = "/colors/detail/new")}
          >
            <i className="fa-solid fa-plus"></i>
            <p>{tabletrans.addNew[lang]}</p>
          </div>
        </div>
      </div>
      <div className="list-container">
        {/* <BrandFilters lang={props.lang} setFilters={setFilters}
          options={content.brand} filters={filters}/> */}
        <div className="user-list">
          {loading ? (
            env.loader
          ) : (
            <ColorTable setLoading={setLoading} brand={content} lang={lang} />
          )}
        </div>
        <Paging
          content={content}
          setFilters={setFilters}
          filters={filters}
          lang={props.lang}
          updateUrlWithFilters={updateUrlWithFilters} // Pass the function as a prop
        />
      </div>
    </div>
  );
}
export default Colors;
