import React, { useState } from "react";
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

function CustomLabel({ x, y, stroke, value }) {
  return (
    <text
      x={x}
      y={y}
      dy={-4}
      fill={`#fff`}
      fontSize={10}
      offset="5"
      textAnchor="middle"
    >
      {value}
    </text>
  );
}
export default function BarGraph({ data, xKey, barKey, fill, classname }) {
  return (
    <>
      <ResponsiveContainer
        width="100%"
        className={`${styles.resContainer} ${classname}`}
      >
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <YAxis />
          <Tooltip />
          <Bar
            barSize={150}
            dataKey={barKey}
            fill={fill}
            label={{ position: "top" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
