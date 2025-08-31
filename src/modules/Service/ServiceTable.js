import { useState } from "react";
import tabletrans from "../../translate/tables";
import ServiceTableRow from "./ServiceTableRow";

function ServiceTable(props) {
  const service = props.service;
  const lang = props.lang;
  const [detail, showDetail] = useState(-1);
  return (
    <table>
      <thead>
        <tr>
          <th>
            <p>{tabletrans.title[lang]}</p>
          </th>
          <th style={{ textAlign: "center" }}>
            <p>{tabletrans.hesabfa[lang]}</p>
          </th>
          <th>
            <p>{tabletrans.price[lang]}</p>
          </th>

          {/* <th>
            <p>{tabletrans.status[lang]}</p>
          </th> */}
          <th>
            <p>عملیات</p>
          </th>
        </tr>
      </thead>
      <tbody>
        {service && service.filter
          ? service.filter.map((service, i) => (
              <ServiceTableRow
                detail={detail}
                showDetail={showDetail}
                service={service}
                index={i}
                key={i}
                lang={lang}
              />
            ))
          : ""}
      </tbody>
    </table>
  );
}
export default ServiceTable;
