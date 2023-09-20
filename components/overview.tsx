"use client";

import React, { useEffect, useState } from "react";
import { ApexOptions } from "apexcharts";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
const DynamicReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface GraphDataProps {
  month: string;
  totalOrder: number;
  totalSubscription: number;
}

interface OverviewProps {
  data: GraphDataProps[];
}

export const Overview: React.FC<OverviewProps> = ({ data }) => {
  const { theme, systemTheme } = useTheme();
  const [windowWidth, setWindowWidth] = useState(640);
  const [fontSize, setFontSize] = useState("12px");
  const [reverse, setReverse] = useState(false);

  const series = [
    {
      name: "Commandes",
      data: data.map((item) => item.totalOrder),
    },
    {
      name: "Abonnements",
      data: data.map((item) => item.totalSubscription),
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  useEffect(() => {
    if (windowWidth < 640) {
      setFontSize("10px");
      setReverse(true);
    } else if (windowWidth < 1024) {
      setFontSize("14px");
      setReverse(false);
    } else {
      setFontSize("16px");
      setReverse(false);
    }
  }, [windowWidth]);

  const options: ApexOptions = {
    chart: {
      type: "bar",
      height: "auto",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: reverse ? 2 : 4,
        horizontal: reverse,
        borderRadiusApplication: "end",
        columnWidth: reverse ? "50%" : "90%",
        dataLabels: {
          position: reverse ? "top" : "center",
          orientation: reverse ? "horizontal" : "vertical",
        },
      },
    },
    xaxis: {
      categories: data.map((item) => item.month),

      labels: {
        offsetY: reverse ? -10 : 0,
        offsetX: reverse ? -5 : 0,
        rotate: reverse ? -45 : 0,
        rotateAlways: reverse,
        formatter: reverse
          ? (value: string) => `${value} €`
          : (value: string) => `${value}`,
        style: {
          colors: "#888888",
          fontSize: fontSize,
        },
      },
      axisBorder: {
        offsetY: reverse ? 40 : 0,
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        formatter: reverse
          ? (value: number) => `${value}`
          : (value: number) => `${value} €`,
        style: {
          colors: "#888888",
          fontSize: fontSize,
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    fill: {
      colors: ["#3498db", "#2ecc71"],
    },
    grid: {
      show: false,
    },
    tooltip: {
      y: {
        formatter: function (value) {
          return `${value} €`;
        },
        title: {
          formatter: function () {
            return "";
          },
        },
      },
      shared: true,
      intersect: false,
      followCursor: true,
      marker: {
        show: true,
      },
      theme: theme === "system" ? systemTheme : theme,
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      fontSize: fontSize,
      offsetX: reverse ? 0 : 40,
      onItemClick: {
        toggleDataSeries: true,
      },
      markers: {
        width: 12,
        height: 12,
        strokeWidth: 0,
        strokeColor: "#000",
        radius: 12,
      },
      labels: {
        colors: "#888888",
      },
    },
  };

  return (
    <div>
      {" "}
      <DynamicReactApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
        padding={{ bottom: 40 }}
      />{" "}
    </div>
  );
};
