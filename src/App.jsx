import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

function App() {
  const defaultInput = {
    amount: 1,
    fromCurrency: "EUR",
    toCurrency: "USD",
    convertedAmount: "",
  };

  const [input, setInput] = useState(defaultInput);
  const [currencies, setCurrencies] = useState();
  const [weekData, setWeekData] = useState({
    data: "",
    categories: "",
  });

  useEffect(() => {
    fetch(`https://api.frankfurter.dev/v1/currencies`)
      .then((res) => res.json())
      .then((data) => setCurrencies(data));

    const lastWeekDate = new Date(
      new Date().getTime() - 7 * 24 * 60 * 60 * 1000
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

  useEffect(() => {
    if (input.fromCurrency && input.toCurrency && input.amount) {
      fetch(
        `https://api.frankfurter.dev/v1/latest?amount=${input.amount}&from=${input.fromCurrency}&to=${input.toCurrency}`
      )
        .then((res) => res.json())
        .then((data) => {
          setInput((prev) => ({
            ...prev,
            convertedAmount: data.rates[input.toCurrency],
          }));
        });
    }
  }, [input.amount, input.fromCurrency, input.toCurrency]);

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const options = {
    chart: {
      id: "basic-bar",
      background: "#000000",
      foreColor: "#ffffffff",
      animations: {
        enabled: true,
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },
    grid: {
      show: true,
      borderColor: "#ffffff",
      strokeDashArray: 5,
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
        colors: undefined,
        opacity: 0.5,
      },
      column: {
        colors: ["#234556"],
        opacity: 0.5,
      },
      padding: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
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
        fontSize: "12px",
        fontFamily: "Helvetica, Arial, sans-serif",
        fontWeight: "bold",
        colors: ["#003d00"],
      },
      background: {
        enabled: true,
        foreColor: "#ffffff",
        padding: 5,
        borderRadius: 5,
        borderWidth: 0,
        borderColor: "#fff",
        opacity: 1,
        dropShadow: {
          enabled: true,
          top: 1,
          left: 1,
          blur: 1,
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
      type: "datetime",
      categories: weekData.categories,
    },
  };

  return (
    <div className="container">
      <div className="card-wrapper">
        <div className="card">
          <div className="card-header">
            <h1 className="card-title">CURRENCY BOOLVERTER</h1>
          </div>
          <div className="card-body">
            <h5 className="card-subtitle">
              {input.amount} {input.fromCurrency} è uguale a
            </h5>
            <h2 className="card-subtitle">
              {input.convertedAmount} {input.toCurrency}
            </h2>
            <form>
              <div className="form-control">
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="amount"
                  id="amount"
                  className="form form-input"
                  value={input.amount}
                />
                <select
                  onChange={handleInputChange}
                  className="form form-select"
                  name="fromCurrency"
                  id="currencies"
                  value={input.fromCurrency}
                >
                  {currencies &&
                    Object.entries(currencies)
                      .filter(([key, value]) => key !== input.toCurrency)
                      .map(([key, value]) => (
                        <option key={key} value={key}>
                          {value}
                        </option>
                      ))}
                </select>
              </div>
              <div className="form-control">
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="convertedAmount"
                  id="convertedAmount"
                  className="form form-input"
                  value={input.convertedAmount}
                />
                <select
                  onChange={handleInputChange}
                  className="form form-select"
                  name="toCurrency"
                  id="convertedCurrencies"
                  value={input.toCurrency}
                >
                  {currencies &&
                    Object.entries(currencies)
                      .filter(([key, value]) => key !== input.fromCurrency)
                      .map(([key, value]) => (
                        <option key={key} value={key}>
                          {value}
                        </option>
                      ))}
                </select>
              </div>
            </form>
            <div className="chart">
              <Chart options={options} series={options.series} type="area" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
