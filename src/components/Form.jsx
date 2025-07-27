export default function Form({ input, setInput, currencies }) {
  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSwitch = () => {
    setInput({
      ...input,
      fromCurrency: input.toCurrency,
      toCurrency: input.fromCurrency,
    });
  };

  return (
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
      <div className="switch">
        <button id="switchCurrencies" onClick={handleSwitch} type="button" />
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
  );
}
