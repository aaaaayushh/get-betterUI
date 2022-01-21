import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import BarGraph from "../BarGraph/index.jsx";
import { data } from "../../data/graph2";

export default function GraphTwo() {
  useEffect(() => {
    AOS.init({ duration: 3000 });
    console.log(data[0].data);
  }, []);
  return (
    <div className="col-12" data-aos="zoom-in">
      <h4>Prevalence of depression by age(%), World - 2019</h4>
      <BarGraph
        xKey="value"
        yKey="name"
        layout="vertical"
        data={data[0].data}
        fill="#8884d8"
        classname="bg-light rounded"
      />
    </div>
  );
}
