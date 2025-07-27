import { useEffect, useState } from "react";
import Form from "./Form";
import Graph from "./Graph";

export default function Card() {
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

  return (
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
        <Form input={input} setInput={setInput} currencies={currencies} />
        <Graph input={input} />
      </div>
    </div>
  );
}
