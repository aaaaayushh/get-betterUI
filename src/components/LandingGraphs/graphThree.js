import React from "react";
import AOS from "aos";
import { data } from "../../data/graph3";
import "aos/dist/aos.css";
import ScatterGraph from "../ScatterGraph/ScatterGraph";

export default function GraphThree() {
  return (
    <div className="col-12" data-aos="zoom-in">
      <h4>Prevalence of depression by age(%), World - 2019</h4>
      <ScatterGraph
        data={data}
        xKey="Depressive Disorder rates"
        yKey="Suicide Rate"
      />
    </div>
  );
}
