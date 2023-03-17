import React, { useEffect, useState } from "react";
import ReactEcharts from "echarts-for-react";
import * as echarts from "echarts";
import { WineDataInterface } from "../../Configs/ChartServices";

interface Props {
  xAxisKey: keyof WineDataInterface;
  yAxisKey: keyof WineDataInterface;
  WineData: WineDataInterface[];
  chartType: "scatter" | "bar";
}

const Charts = ({ xAxisKey, yAxisKey, WineData, chartType }: Props) => {
  const [chartOptions, setChartOptions] = useState({});
  useEffect(() => {
    let Data:[number,number][]= []
    if (chartType === "bar") {
      // Below Code will convert the array of objects into Key value Pairs
      // Where Key is the Comman id or value of Alcohol and value is an a array of values 
      let BarData: {[key: string]: Array<any>} = {}
      WineData.forEach(item =>{
        const keyName : string = item[xAxisKey]
        if(Object.keys(BarData)?.includes(String(keyName)))
        {
          BarData[keyName].push(item[yAxisKey])
        }
        else {
          BarData[keyName] = [item[yAxisKey]]
        }
      });

      // sampleOutPut Can Be {
      // 1 : [10,20,30,40,50,60]
      // 2 : [10,20,30,40,50,60]
      // }
      //and after We Render the average of values
      Object.keys(BarData)?.forEach(items => {
        Data.push([Number(items) , BarData[items]?.reduce((item1, item2)=> item1+item2 , 0)/BarData[items]?.length])
      })
    }
    else {
      Data = WineData?.map((itemsData: WineDataInterface) => {
        return [itemsData[xAxisKey], itemsData[yAxisKey]];
      })
    }
    setChartOptions({
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      xAxis: {
        type: "category",
        name: xAxisKey,
        nameLocation: "middle", // set the location of the x-axis label to middle
        nameGap: 25,
        nameTextStyle: {
          fontSize: 14,
          fontWeight: "bold",
        },
      },
      yAxis: {
        type: "value",
        name: yAxisKey,
        nameLocation: "middle", // set the location of the x-axis label to middle
        nameGap: 20,
        nameTextStyle: {
          fontSize: 14,
          fontWeight: "bold",
        },
      },
      series: [
        {
          data: Data,
          type: chartType,
        },
      ],
    });
  }, [WineData, chartType, xAxisKey, yAxisKey]);

  return (
    <div className="chartContainer">
      <ReactEcharts option={chartOptions} echarts={echarts} className="chart" />
    </div>
  );
};

export default Charts;
