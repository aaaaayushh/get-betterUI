import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
  ResponsiveContainer,
  Cell,
} from "recharts";
import styles from "./ScatterGraph.module.css";

function CustomTooltip({ payload }) {
  console.log(payload);
  if (payload[0]) {
    return (
      <div className="custom-tooltip text-dark fw-bold bg-white">
        {payload[0].payload.Country}
        <br />
        Suicide Rate(per 100,000 individuals):
        {Math.floor(payload[0].payload["Suicide Rate"])}
        <br />
        Depressive Disorder Rate(per 100,000 individuals):
        {Math.floor(payload[0].payload["Depressive Disorder rates"])}
      </div>
    );
  }
  return <></>;
}

export default function ScatterGraph({ xKey, yKey, data, classname }) {
  console.log(data);
  const colors = ["#f00", "#0f0", "#00f", "#ff0", "#f0f", "#0ff"];
  return (
    <ResponsiveContainer
      width="100%"
      className={`${styles.resContainer} ${classname}`}
    >
      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid />
        <XAxis type="number" dataKey={xKey} name={xKey} />
        <YAxis type="number" dataKey={yKey} name={yKey} />
        <Tooltip content={<CustomTooltip />} />
        <Scatter data={data}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  );
}
