import { useEffect } from "react";
import { useState } from "react";
import env from "../../../env";
import errortrans from "../../../translate/error";
import tabletrans from "../../../translate/tables";
import ServiceInfo from "./ServiceInfo";
import ServiceFieldList from "./ServiceFieldList";
import PostReq from "../../../utils/PostReq";
function ServiceDetailHolder(props) {
  const url = window.location.pathname.split("/")[3];
  const direction = props.lang ? props.lang.dir : errortrans.defaultDir;
  const lang = props.lang ? props.lang.lang : errortrans.defaultLang;

  const [content, setContent] = useState("");
  const [ServiceLaoder, setServiceLaoder] = useState(1);
  // useEffect(() => {
  //   if (url === "new") return;
  //   var postOptions = {
  //     method: "post",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ serviceId: url }),
  //   };

  //   fetch(env.siteApi + "/panel/product/fetch-service", postOptions)
  //     .then((res) => res.json())
  //     .then(
  //       (result) => {
  //         if (result.error) {
  //           setError({ errorText: result.error, errorColor: "brown" });
  //           setTimeout(
  //             () => setError({ errorText: "", errorColor: "brown" }),
  //             3000
  //           );
  //         } else {
  //           setError({ errorText: "سرویس پیدا شد", errorColor: "green" });
  //           setContent(result.filter);
  //         }
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     );
  // }, []);
  // const saveService = () => {
  //   //if(newCustomer) {
  //   var newPrice = price;
  //   try {
  //     newPrice = JSON.parse(price);
  //   } catch {}

  //   var newPurchase = purchase;
  //   try {
  //     newPurchase = JSON.parse(purchase);
  //   } catch {}
  //   var newFCode = fCode;
  //   try {
  //     newFCode = JSON.parse(fCode);
  //   } catch {}
  //   var postOptions = {
  //     method: "post",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       serviceId: url,
  //       ...serviceChange,
  //       servicePrice: newPrice,
  //       servicePurchase: newPurchase,
  //       factoryCode: newFCode,
  //     }),
  //   };
  //   console.log(postOptions);
  //   fetch(env.siteApi + "/panel/product/editService", postOptions)
  //     .then((res) => res.json())
  //     .then(
  //       (result) => {
  //         if (result.error) {
  //           setError({ errorText: result.error, errorColor: "brown" });
  //           setTimeout(
  //             () => setError({ errorText: "", errorColor: "brown" }),
  //             3000
  //           );
  //         } else {
  //           setError({ errorText: result.success, errorColor: "green" });
  //           setTimeout(() => (window.location.href = "/services"), 2000);
  //         }
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     );
  // };
  const FetchService = async () => {
    if (url == "new") return;
    const result = await PostReq({
      method: "Get",
      url: "/panel/product/fetch-service",
      body: { serviceId: url },
    });
    setContent(result.filter);
  };
  useEffect(() => {
    FetchService();
  }, [ServiceLaoder]);
  return (
    <div className="step-page" style={{ direction: direction }}>
      <div className="container">
        <h4>{tabletrans.service[lang]}</h4>
        {content || url == "new" ? (
          <>
            <ServiceInfo
              direction={direction}
              lang={lang}
              data={content}
              setServiceLaoder={setServiceLaoder}
            />
            <ServiceFieldList
              direction={direction}
              lang={lang}
              serviceId={content._id}
            />
          </>
        ) : (
          <div className="page-loader">{env.loader}</div>
        )}
      </div>
    </div>
  );
}
export default ServiceDetailHolder;
