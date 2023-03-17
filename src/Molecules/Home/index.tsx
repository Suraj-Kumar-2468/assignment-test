import React from "react";
import Charts from "../../Atoms/Charts";
import { wineMockData } from "../../Configs/Mock";

const Home = () => {
  return (
    <div className="pageContainer">
      <Charts
        xAxisKey="Color intensity"
        chartType="scatter"
        yAxisKey="Hue"
        WineData={wineMockData}
      />
      <Charts
        xAxisKey="Alcohol"
        chartType="bar"
        yAxisKey="Malic Acid"
        WineData={wineMockData}
      />
    </div>
  );
};

export default Home;
