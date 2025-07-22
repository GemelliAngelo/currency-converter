import { useEffect, useState } from "react";

function App() {
  const defaultInput = {
    amount: "1",
    currencies: "",
    convertedAmount: "",
    convertedCurrencies: "",
  };

  const [input, setInput] = useState(defaultInput);
  const [currencies, setCurrencies] = useState();

  useEffect(() => {
    fetch(`https://api.frankfurter.dev/v1/currencies`)
      .then((res) => res.json())
      .then((data) => setCurrencies(data));
  }, []);

  function convert(from, to, amount) {
    fetch(`https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`)
      .then((res) => res.json())
      .then((data) => {
        const convertedAmount = (amount * data.rates[to]).toFixed(2);
        alert(`${amount} ${from} = ${convertedAmount} ${to}`);
      });
  }

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
            <form>
              <div className="form-control">
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="amount"
                  id="amount"
                  className="form form-input"
                />
                <select
                  onChange={handleInputChange}
                  className="form form-select"
                  name="currencies"
                  id="currencies"
                >
                  {currencies &&
                    Object.entries(currencies).map(([key, value]) => (
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
                />
                <select
                  onChange={handleInputChange}
                  className="form form-select"
                  name="convertedCurrencies"
                  id="convertedCurrencies"
                >
                  {currencies &&
                    Object.entries(currencies)
                      .filter(([key, value]) => value !== input.currencies)
                      .map(([key, value]) => (
                        <option key={key} value={key}>
                          {value}
                        </option>
                      ))}
                </select>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
