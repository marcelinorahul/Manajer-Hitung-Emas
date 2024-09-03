import React, { useState } from 'react';
import './styles.css';

function App() {
  const [formData, setFormData] = useState({
    price_per_gram: '',
    total_gold: '',
    operator_percent: 10,
    member_percent: 10,
    credit_percent: 30,
    profit_percent: 50
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://127.0.0.1:5000/api/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const data = await response.json();
    setResult(data);
  };

  return (
    <div className="App">
      <h1>GoldManagerPro</h1>
      <form onSubmit={handleSubmit}>
        <input type="number" name="price_per_gram" placeholder="Harga Emas per Gram" value={formData.price_per_gram} onChange={handleChange} required />
        <input type="number" name="total_gold" placeholder="Total Emas (gram)" value={formData.total_gold} onChange={handleChange} required />
        <input type="number" name="operator_percent" placeholder="Persentase Operator" value={formData.operator_percent} onChange={handleChange} />
        <input type="number" name="member_percent" placeholder="Persentase Anggota" value={formData.member_percent} onChange={handleChange} />
        <input type="number" name="credit_percent" placeholder="Persentase Kredit" value={formData.credit_percent} onChange={handleChange} />
        <input type="number" name="profit_percent" placeholder="Persentase Keuntungan" value={formData.profit_percent} onChange={handleChange} />
        <button type="submit">Hitung</button>
      </form>
      {result && (
        <div className="result">
          <h2>Hasil Distribusi:</h2>
          <p>Total Pendapatan: Rp {result.total_income.toFixed(2)}</p>
          <p>Pendapatan Operator: Rp {result.operator_share.toFixed(2)}</p>
          <p>Pendapatan Anggota: Rp {result.member_share.toFixed(2)}</p>
          <p>Pendapatan Kredit: Rp {result.credit_share.toFixed(2)}</p>
          <p>Pendapatan Keuntungan: Rp {result.profit_share.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}

export default App;
