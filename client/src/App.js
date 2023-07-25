import React, { useState, useEffect } from 'react';


function App() {

	const [stockData, setStockData] = useState({});

	const [form, setForm] = useState({
		stockSymbol: "",
		date: ""
	});
	const handleInput = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value })
	};

	useEffect(() => {

	}, [])

	 const fetchStockData = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch('http://localhost:5000/api/fetchStockData', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(form),
			});
			 if (!response.ok) {
				throw new Error('Error fetching stock data');
			} 
			const data = await response.json();
			setStockData(data);
		} catch (error) {
			console.error('Error:', error.message);
			setStockData({});
		}
	}; 

	



	return (
		<div>
			<h1>Hello world </h1>
			 <form onSubmit={fetchStockData} style={{ textAlign: "center", margin: "8px 0" }}>
				<h1>Hello world</h1>
				<label>
					<h3>Stock Symbol:</h3>
				</label>
				<input style={{
					width: "20%",
					padding: "12px 20px",
					margin: "8px 0",
					border: "1px solid"
				}}
					type="text"
					name="stockSymbol"
					value={form.stockSymbol}
					onChange={handleInput}
				/>


				<label>
					<h3>Date:</h3>
				</label>
				<input style={{
					width: "20%",
					padding: "12px 20px",
					margin: "8px 0",
					border: "1px solid"
				}}
					type="date"
					name="date"
					value={form.date}
					onChange={handleInput}
				/><br />

				<button type="submit" style={{
					width: "10%",
					padding: "12px 20px",
					margin: "8px 0",
					border: "1px solid"
				}}>Submit</button>
			</form>

			<div style={{ textAlign: "center", margin: "8px 0" }}>
				<h3><p>Open: {stockData.open}</p></h3>
				<h3><p>High: {stockData.high}</p></h3>
				<h3><p>Low: {stockData.low}</p></h3>
				<h3><p>Close: {stockData.close}</p></h3>
				<h3><p>Volume: {stockData.volume}</p></h3>
			</div> 
		</div>

	);
}

export default App;