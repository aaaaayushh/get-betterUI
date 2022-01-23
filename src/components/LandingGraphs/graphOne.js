import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { data } from "../../data/graph1";
import AOS from "aos";
import "aos/dist/aos.css";
import BarGraph from "../BarGraph/index.jsx";

export default function GraphOne() {
  const [year, setYear] = useState("2017");
  const [isOpen, setIsOpen] = useState(false);
  const [barData, setBarData] = useState([]);
  useEffect(() => {
    AOS.init({ duration: 3000 });
  }, []);
  useEffect(() => {
    var idx = data.findIndex((obj) => obj.Year === year);
    console.log(idx);
    console.log(data[idx].data);
    setBarData(data[idx].data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year]);
  return (
    <div className="col-12" data-aos="zoom-in">
      <h4>
        Share of world population suffering from mental health disorders(%) -
        {year}
      </h4>
      <Dropdown
        className="mb-3 text-end"
        isOpen={isOpen}
        toggle={() => setIsOpen(!isOpen)}
      >
        <DropdownToggle caret>Select Year:</DropdownToggle>
        <DropdownMenu>
          {data.map((item) => (
            <DropdownItem onClick={() => setYear(item.Year)}>
              {item.Year}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
      <BarGraph
        yLabel="% of world population"
        xKey="name"
        yKey="value"
        data={barData}
        fill="#8884d8"
        classname="bg-light rounded"
      />
    </div>
  );
}
