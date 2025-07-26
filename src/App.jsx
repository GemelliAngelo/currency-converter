import { useEffect, useState } from "react";
import Graph from "./components/Graph";

function App() {
  const defaultInput = {
    amount: 1,
    fromCurrency: "EUR",
    toCurrency: "USD",
    convertedAmount: "",
  };

  const [input, setInput] = useState(defaultInput);
  const [currencies, setCurrencies] = useState();

  useEffect(() => {
    fetch(`https://api.frankfurter.dev/v1/currencies`)
      .then((res) => res.json())
      .then((data) => setCurrencies(data));

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
            <Graph input={input} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
