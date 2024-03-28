import React, { useState, useEffect } from "react";

function MainContainer() {
	const [food, setFood] = useState([]);
	const [foodInput, setFoodInput] = useState("");

	const addFood = async () => {
		try {
			const response = await fetch(`https://api.api-ninjas.com/v1/nutrition?query=${foodInput}`, {
				headers: {
					"X-Api-Key": "mlvXoPbZRa8k/+ScMmOVRg==PUD4iZkUyiLlux6I",
					"Content-type": "application/json",
				},
			});
			if (!response.ok) {
				throw new Error("Network is not working!");
			}
			const data = await response.json();
			console.log(data);
			setFood([...food, data]);
			setFoodInput("");
		} catch (error) {
			console.error("Error searching the food:", error);
		}
	};
	function handleFoodInputChange(e) {
		setFoodInput(e.target.value);
	}
	function currentDate() {
		const d = new Date();
		const year = d.getFullYear();
		const months = { month: "long" };
		const month = d.toLocaleDateString("en-gb", months);
		const day = String(d.getDate()).padStart(2, 0);
		const fullDate = `${day}  ${month} ${year}`;
		return fullDate;
	}

	return (
		<div className='main'>
			<div className='main-window'>
				<div className='main-grid-container'>
					<div className='main-grid-items item1'>
						<span>Add the food:</span>
						<input type='text' className='input-food' value={foodInput} onChange={handleFoodInputChange} />
						<button className='add-food-btn' onClick={addFood}>
							+
						</button>
						<ul className='food-container'>
							{food.map((food, index) => (
								<li key={index}>- {food.name}</li>
							))}
						</ul>
					</div>
					<div className='main-grid-items item2'>Total Calories</div>
					<div className='main-grid-items item3'>
						Today Calories <span className='current-calories-day'>{currentDate()}</span>
					</div>
					<div className='main-grid-items item4'>Measurements</div>
					<div className='main-grid-items item5'>Favorites Meal</div>
					<div className='main-grid-items item6'>Burned Calories</div>
					<div className='main-grid-items item7'>
						Weekdays
						<div className='days'>
							<p className='day'>Mon</p>
							<p className='day'>Tue</p>
							<p className='day'>Wedy</p>
							<p className='day'>Thu</p>
							<p className='day'>Fri</p>
							<p className='day'>Sat</p>
							<p className='day'>Sun</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MainContainer;
