import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import styles from "./BarGraph.module.css";

function CustomTooltip({ payload, layout }) {
  if (payload[0]) {
    return (
      <div className="custom-tooltip text-dark fw-bold">
        {layout === "vertical" ? `` : payload[0].payload.name}
      </div>
    );
  }
  return <></>;
}
export default function BarGraph({
  data,
  xLabel,
  yLabel,
  xKey,
  yKey,
  fill,
  classname,
  layout,
}) {
  return (
    <>
      <ResponsiveContainer
        width="100%"
        className={`${styles.resContainer} ${classname}`}
      >
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          layout={layout ? layout : "horizontal"}
          barCategoryGap={1}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey={xKey}
            type={layout === "vertical" ? "number" : "category"}
            label={xLabel}
          />
          <YAxis
            dataKey={yKey}
            width={150}
            type={layout === "vertical" ? "category" : "number"}
            label={{ value: yLabel, angle: -90, position: "center" }}
          />
          <Tooltip content={<CustomTooltip layout={layout} />} />
          <Bar
            barSize={150}
            dataKey={layout === "vertical" ? xKey : yKey}
            fill={fill}
            label={{ position: layout === "vertical" ? "right" : "top" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
