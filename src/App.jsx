function App() {
  function convert(from, to, amount) {
    fetch(`https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`)
      .then((res) => res.json())
      .then((data) => {
        const convertedAmount = (amount * data.rates[to]).toFixed(2);
        alert(`${amount} ${from} = ${convertedAmount} ${to}`);
      });
  }
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
                  type="text"
                  name="amount"
                  id="amount"
                  className="form form-input"
                />
                <select
                  className="form form-select"
                  name="currencies"
                  id="currencies"
                ></select>
              </div>
              <div className="form-control">
                <input
                  type="text"
                  name="convertedAmount"
                  id="convertedAmount"
                  className="form form-input"
                />
                <select
                  className="form form-select"
                  name="convertedCurrencies"
                  id="convertedCurrencies"
                ></select>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
