import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import DUserTable from "../modules/Users/DUserTable";
import DTable from "../modules/Discount/DTable";
import Paging from "../modules/Components/Paging";
import errortrans from "../translate/error";
import env from "../env";
import tabletrans from "../translate/tables";
import DUserFilters from "../modules/Users/DUserFilters";
import { TextField } from "@material-ui/core";
import StyleInput from "../components/Button/Input";
import StyleSelect from "../components/Button/AutoComplete";
import PostReq from "../utils/PostReq";
const cookies = new Cookies();

function Discount(props) {
  const direction = props.lang ? props.lang.dir : errortrans.defaultDir;
  const lang = props.lang ? props.lang.lang : errortrans.defaultLang;
  const [content, setContent] = useState("");
  const [Dtable, setDtable] = useState(0);
  const [AddDiscount, setAddDiscount] = useState({ active: false });
  const [RxStock, setRxstock] = useState(0);
  const [offerStock, setOfferStock] = useState("");
  const [filters, setFilters] = useState(getFiltersFromUrl());
  const [loading, setLoading] = useState(0);
  const [SaveD, setSaveD] = useState(0);
  const [Brand, setBrand] = useState("");
  const [Material, setMaterial] = useState("");
  const [DiscountPer, setDiscountPer] = useState("");
  const [OfferId, setOfferId] = useState("");
  const [update, setUpdate] = useState(0);
  const [offerParams, setOfferParams] = useState("");
  const [OffType, setOffType] = useState("");
  const [OffNum, setOffNum] = useState("");
  const [OptionBrand, setOptionBrand] = useState("");
  // ....................
  const [Category, setCategory] = useState({});
  const [CategoryList, setCategoryList] = useState();

  //console.log(Dtable)
  const token = cookies.get(env.cookieName);
  useEffect(() => {
    FetchCat();
  }, []);
  const FetchCat = async () => {
    const result = await PostReq({
      method: "Post",
      url: "/panel/product/list-category",
      body: {},
    });
    setCategoryList(result.filter);
  };
  const setOffer = async () => {
    const result = await PostReq({
      method: "Post",
      url: "/panel/user/update-discount",
      body: {
        userId: AddDiscount._id,
        username: AddDiscount.username,
        ...Category,
        discount: DiscountPer,
      },
    });
    setTimeout(() => setSaveD(SaveD + 1), 200);
  };

  useEffect(() => {
    setLoading(1);
    const body = {
      // offset:filters.offset?filters.offset:"0",
      offset: filters.offset || "0",

      // pageSize:filters.pageSize?filters.pageSize:"10",
      pageSize: filters.pageSize || "10",

      customer: filters.customer,
      orderNo: filters.orderNo,
      status: filters.status,
      profile: filters.profile,
      brand: filters.brand,
      dateFrom: filters.date && filters.date.dateFrom,
      dateTo: filters.date && filters.date.dateTo,
      access: filters.access,
      category: filters.category,
    };
    const postOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token && token.token,
        userId: token && token.userId,
      },
      body: JSON.stringify(body),
    };
    console.log(postOptions);
    fetch(env.siteApi + "/panel/user/list-customers", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          setLoading(0);
          setContent("");
          setTimeout(() => setContent(result), 200);
        },
        (error) => {
          setLoading(0);
          console.log(error);
        }
      );
  }, [filters]);

  useEffect(() => {
    setOfferStock("");
    const postOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token && token.token,
        userId: token && token.userId,
      },
      body: JSON.stringify({ userId: Dtable }),
    };
    fetch(env.siteApi + "/panel/user/list-discount", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          setTimeout(() => setOfferStock(result.data), 200);
        },
        (error) => {
          setLoading(0);
          console.log(error);
        }
      );
  }, [Dtable, RxStock, SaveD]);
  // useEffect(() => {
  //   if (!filters.discount || filters.discount.length < 2) return;
  //   setOfferStock("");
  //   const postOptions = {
  //     method: "post",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "x-access-token": token && token.token,
  //       userId: token && token.userId,
  //     },
  //     body: JSON.stringify({ type: filters.type, value: filters.discount }),
  //   };
  //   fetch(
  //     env.siteApi +
  //       (RxStock ? "/panel/user/offerFind" : "/panel/user/offerRXFind"),
  //     postOptions
  //   )
  //     .then((res) => res.json())
  //     .then(
  //       (result) => {
  //         setTimeout(() => setContent(result), 200);
  //       },
  //       (error) => {
  //         setLoading(0);
  //         console.log(error);
  //       }
  //     );
  // }, [filters]);
  // Function to get filters from URL
  function getFiltersFromUrl() {
    const searchParams = new URLSearchParams(window.location.search);
    const filters = {};
    for (const [key, value] of searchParams.entries()) {
      filters[key] = value;
    }
    return filters;
  }

  function updateUrlWithFilters(newFilters) {
    const searchParams = new URLSearchParams(window.location.search);
    for (const key in newFilters) {
      if (newFilters[key]) {
        searchParams.set(key, newFilters[key]);
      } else {
        searchParams.delete(key); // Remove the parameter if the value is falsy
      }
    }
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.replaceState({}, "", newUrl);
  }

  // Function to handle filter changes
  function handleFilterChange(newFilters) {
    setFilters(newFilters);
    updateUrlWithFilters(newFilters);
  }

  const removeOffer = (OfferId) => {
    const postOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token && token.token,
        userId: token && token.userId,
      },
      body: JSON.stringify({ id: OfferId }),
    };
    console.log(postOptions);
    fetch(env.siteApi + "/panel/user/delete-discount", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          setTimeout(() => setSaveD(SaveD + 1), 200);
        },
        (error) => {
          setLoading(0);
          console.log(error);
        }
      );
  };
  console.log(AddDiscount);
  console.log(Category);
  return (
    <div className="user discount-page" style={{ direction: direction }}>
      {AddDiscount.active ? (
        <div className="add-discount">
          <p
            className="close-discount-btn"
            onClick={() => {
              setAddDiscount(0);
            }}
          >
            &#10006;
          </p>
          <StyleSelect
            title={tabletrans.brand[lang]}
            class="filterComponent"
            direction={direction}
            action={(e) => {
              setCategory({ category: e._id, categoryName: e.title });
            }}
            options={CategoryList}
            label="title"
          />

          <StyleInput
            title={tabletrans.discount[lang]}
            direction={direction}
            action={(e) => {
              setDiscountPer(e);
            }}
          />

          <input
            className="add-discount-btn"
            type="button"
            value=" اعمال تخفیف"
            onClick={() => setOffer()}
          />
        </div>
      ) : (
        <></>
      )}

      <div className="od-header">
        <div className="od-header-info">
          <div className="od-header-name">
            <p>{tabletrans.discounts[lang]}</p>
          </div>
        </div>
        <div class="search-wrapper">
          <DUserFilters
            lang={props.lang}
            setFilters={handleFilterChange}
            // setFilters={setFilters}
            options={content.access}
            profiles={content.profilesList}
            currentFilters={filters}
            updateUrlWithFilters={updateUrlWithFilters}
            CategoryList={CategoryList} // Pass the function as a prop
          />
        </div>
      </div>
      <div class="d-container">
        <div className="list-container discount-user-list">
          <div className="user-list">
            <DUserTable
              userList={content}
              lang={props.lang}
              setSelectedUser={() => {}}
              discountUser={setDtable}
              addDiscount={setAddDiscount}
            />
          </div>
          <Paging
            content={content}
            setFilters={setFilters}
            filters={filters}
            lang={props.lang}
            updateUrlWithFilters={updateUrlWithFilters} // Pass the function as a prop
          />
        </div>
        <div className="list-container discount-list">
          {offerStock ? (
            <div className="user-list">
              <DTable
                lang={props.lang}
                offerStock={offerStock}
                setSelectedUser={() => {}}
                type={RxStock}
                offerid={removeOffer}
              />
            </div>
          ) : (
            <>{env.loader}</>
          )}
          <Paging
            content={content}
            setFilters={setFilters}
            filters={filters}
            lang={props.lang}
            updateUrlWithFilters={updateUrlWithFilters} // Pass the function as a prop
          />
        </div>
      </div>
    </div>
  );
}
export default Discount;
