import React, { useState } from "react";
import Status from "../Components/Status";
import { normalPriceCount, rxFindCount } from "../../env";
import { serviceKind } from "../../translate/status";
import ErrorAction from "../../components/Modal/ErrorAction";
import PostReq from "../../utils/PostReq";
function ServiceTableRow(props) {
  const [DeleteShow, setDeleteShow] = useState(false);
  const activeAcc = props.index === props.detail;
  const service = props.service;
  var serviceName = "";
  try {
    serviceName = serviceKind.find((item) => item.english === service.category)[
      props.lang
    ];
  } catch {}
  const removeService = async () => {
    const result = await PostReq({
      method: "post",
      url: "/panel/product/remove-service",
      body: { serviceId: service._id },
    });
    window.location.reload();
  };
  return (
    <React.Fragment>
      <tr className={activeAcc ? "activeAccordion" : "accordion"}>
        <td>
          <p
            style={{ fontSize: "1.2rem", fontWeight: "800" }}
            className="name"
            onClick={() =>
              (window.location.href = "/services/detail/" + service._id)
            }
          >
            {service.title}
          </p>
        </td>
        <td>{service.hesabfa}</td>
        <td>{normalPriceCount(service.price)}</td>
        {/* <td>
          <Status
            status={service.status}
            class={"order-status"}
            lang={props.lang}
          />
        </td> */}
        <td>
          <div className="more-btn">
            <i
              className="tableIcon fas fa-edit"
              onClick={() =>
                (window.location.href = "/services/detail/" + service._id)
              }
            ></i>
            <i
              class="fa fa-trash"
              aria-hidden="true"
              style={{ color: "red" }}
              onClick={() => setDeleteShow(true)}
            ></i>
          </div>
        </td>
      </tr>
      {DeleteShow && (
        <ErrorAction
          title="حذف خدمات"
          color="darkslateblue"
          text="خمات انتخابی حذف می شود.آیا مطمئن هستید؟"
          close={() => setDeleteShow(false)}
          buttonText="حذف"
          action={(e) => removeService(e)}
        />
      )}
    </React.Fragment>
  );
}
export default ServiceTableRow;
