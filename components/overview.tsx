"use client";

import React from "react";
import type { ApexOptions } from "apexcharts";
import { useTheme } from "next-themes";
import ReactApexChart from "react-apexcharts";
import { isWindowSmallerThan } from "@/lib/utils";

interface GraphDataProps {
  month: string;
  totalOrder: number;
  totalSubscription: number;
}

interface OverviewProps {
  data: GraphDataProps[];
}

const Overview: React.FC<OverviewProps> = ({ data }) => {
  const { theme, systemTheme } = useTheme();
  const [graphState, setGraphState] = React.useState({
    fontSize: "12px",
    reverse: false,
    reduceMonth: false,
  });

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

  React.useEffect(() => {
    const checkMobile = () => {
      if (isWindowSmallerThan(640)) {
        setGraphState({
          fontSize: "12px",
          reverse: true,
          reduceMonth: false,
        });
        return;
      }
      if (isWindowSmallerThan(1150)) {
        setGraphState({
          fontSize: "14px",
          reverse: false,
          reduceMonth: true,
        });
        return;
      }
      setGraphState({
        fontSize: "16px",
        reverse: false,
        reduceMonth: false,
      });
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
        borderRadius: graphState.reverse ? 2 : 4,
        horizontal: graphState.reverse,
        borderRadiusApplication: "end",
        columnWidth: graphState.reverse ? "50%" : "90%",
        dataLabels: {
          position: graphState.reverse ? "top" : "center",
          orientation: graphState.reverse ? "horizontal" : "vertical",
        },
      },
    },
    xaxis: {
      categories: graphState.reduceMonth
        ? data.map((item, index) => (index % 2 === 0 ? item.month : ""))
        : data.map((item) => item.month),
      labels: {
        offsetY: graphState.reverse ? -10 : 0,
        offsetX: graphState.reverse ? -5 : 0,
        rotate: graphState.reverse ? -45 : 0,
        rotateAlways: graphState.reverse,
        formatter: graphState.reverse ? (value: string) => `${value} €` : (value: string) => `${value}`,
        style: {
          colors: "#888888",
          fontSize: graphState.fontSize,
        },
      },
      axisBorder: {
        offsetY: graphState.reverse ? 40 : 0,
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        formatter: graphState.reverse
          ? (value: number) => `${value}`
          : (value: number) => (Number.isInteger(value) ? `${value} €` : `${value.toFixed(2)} €`),
        style: {
          colors: "#888888",
          fontSize: graphState.fontSize,
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
        formatter: (value) => `${value} €`,
        title: {
          formatter: () => "",
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
      fontSize: graphState.fontSize,
      offsetX: graphState.reverse ? 0 : 40,
      onItemClick: {
        toggleDataSeries: true,
      },
      markers: {
        // width: 12,
        // height: 12,
        strokeWidth: 0,
        // radius: 12,
      },
      labels: {
        colors: "#888888",
      },
    },
  };

  return (
    <div>
      <span className="sr-only w-0">Graphique</span>
      <ReactApexChart options={options} series={series} type="bar" height={350} padding={{ bottom: 40 }} />
    </div>
  );
};

export default Overview;
