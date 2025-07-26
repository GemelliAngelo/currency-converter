import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

export default function Graph({ input }) {
  const [weekData, setWeekData] = useState({
    data: "",
    categories: "",
  });

  useEffect(() => {
    const lastWeekDate = new Date(
      new Date().getTime() - 30 * 24 * 60 * 60 * 1000
    )
      .toISOString()
      .slice(0, 10);

    fetch(
      `https://api.frankfurter.dev/v1/${lastWeekDate}..?amount=${input.amount}&from=${input.fromCurrency}&to=${input.toCurrency}`
    )
      .then((res) => res.json())
      .then((data) => {
        const categories = Object.entries(data.rates)
          .map((arr) => arr[0])
          .map((date) => date);

        const datas = Object.entries(data.rates).map(
          (arr) => Object.values(arr[1])[0]
        );

        setWeekData({
          ...weekData,
          categories,
          data: datas,
        });
      });
  }, [input.fromCurrency, input.toCurrency]);

  const options = {
    title: {
      text: "Last 30 days Rates",
      align: "left",
    },
    chart: {
      id: "basic-bar",
      background: "#000000",
      foreColor: "#ffffffff",
      dropShadow: {
        enabled: true,
        color: "#000000ff",
        top: 20,
        left: 20,
        blur: 10,
        opacity: 0.5,
      },
    },
    grid: {
      show: true,
      borderColor: "#000000",
      strokeDashArray: 1,
      position: "back",
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
      row: {
        colors: ["#000000"],
        opacity: 1,
      },
      column: {
        colors: ["#000000"],
        opacity: 1,
      },
      padding: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
      },
    },
    fill: {
      colors: ["#ff0000ff"],
      opacity: 1,
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "vertical",
        shadeIntensity: 0.5,
        gradientToColors: ["#5900ffff"],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: undefined,
      textAnchor: "middle",
      distributed: false,
      offsetX: 0,
      offsetY: 0,
      style: {
        fontSize: "10px",
        fontFamily: "Helvetica, Arial, sans-serif",
        fontWeight: "bold",
        colors: ["#444444"],
      },
      background: {
        enabled: true,
        foreColor: "#ffffffff",
        padding: 5,
        borderRadius: 5,
        borderWidth: 0,
        borderColor: undefined,
        opacity: 1,
        dropShadow: {
          enabled: true,
          top: 1,
          left: 1,
          blur: 5,
          color: "#000000",
          opacity: 1,
        },
      },
    },
    series: [
      {
        name: "convertion",
        data: weekData.data,
      },
    ],
    xaxis: {
      title: {
        text: "Days",
      },
      type: "datetime",
      categories: weekData.categories,
    },
    yaxis: {
      title: {
        text: "Rates",
      },
    },
  };

  return (
    <div className="chart">
      <Chart options={options} series={options.series} type="area" />
    </div>
  );
}
