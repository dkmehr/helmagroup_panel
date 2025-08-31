import React, { useState } from "react";
import ColorsTableRow from "./ColorsTableRow";
import tabletrans from "../../translate/tables";
const ColorTable = (props) => {
  const brand = props.brand;
  const lang = props.lang;

  return (
    <table>
      <thead>
        <tr>
          <th className="checkBoxStyle">
            <input type="checkbox" name="" id="" />
          </th>
          <th style={{textAlign:"center"}}>
            <p>{tabletrans.colorcode[lang]}</p>
            <i></i>
          </th>
          <th style={{width:"70%"}}>
            <p>{tabletrans.colorname[lang]}</p>
            <i></i>
          </th>
          {/* <th>
            <p>{tabletrans.status[lang]}</p>
            <i></i>
          </th> */}
          <th>
            <p>{tabletrans.action[lang]}</p>
            <i></i>
          </th>
        </tr>
      </thead>
      <tbody>
        {brand && brand.filter
          ? brand.filter.map((brand, i) => (
              <ColorsTableRow
                setLoading={props.setLoading}
                brand={brand}
                index={i}
                key={i}
                lang={lang}
              />
            ))
          : ""}
      </tbody>
    </table>
  );
};

export default ColorTable;
