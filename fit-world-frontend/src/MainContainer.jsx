import React, { useState, useEffect } from "react";

function MainContainer() {
	const [food, setFood] = useState([]);
	const [foodInput, setFoodInput] = useState("");
	const [caloriesConsumed, setCaloriesConsumed] = useState(0);
	const [caloriesNeeded, setCaloriesNeeded] = useState(2000);

	const percentCaloriesConsumed = Math.round((caloriesConsumed / caloriesNeeded) * 100);
	function calculateProgress() {
		return (caloriesConsumed / caloriesNeeded) * 100;
	}
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
			console.log(data[0]);
			setFood([...food, data[0]]);
			setFoodInput("");
			setCaloriesConsumed(caloriesConsumed + data[0].calories);
		} catch (error) {
			console.error("Error searching the food:", error);
		}
	};
	const createRemoveFoodBtn = () => {
		return <button className='remove-food-btn'>Remove</button>;
	};
	function removeFood() {}
	function useEnterKey(e) {
		if (e.key === "Enter") {
			addFood();
		}
	}
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
						<span className='label-of-main-window-parts'>Add the food:</span>
						<input
							type='text'
							className='input-food'
							value={foodInput}
							onChange={handleFoodInputChange}
							onKeyDown={useEnterKey}
						/>
						<button className='add-food-btn' onClick={addFood}>
							+
						</button>
						<ul className='food-container'>
							{food.map((food, index) => (
								<li key={index}>
									- {food.name} {createRemoveFoodBtn()}
								</li>
							))}
						</ul>
					</div>
					<div className='main-grid-items item2'>
						<span className='label-of-main-window-parts'>Total Calories</span>
						<div>
							<p>
								<span className='total-calories-per-day'>2000</span>kcal
							</p>
						</div>
					</div>
					<div className='main-grid-items item3'>
						<div className='label-and-date-container-item3'>
							<span className='label-of-main-window-parts'>Today Calories</span>
							<span className='current-calories-day'>{currentDate()}</span>
						</div>
						<div className='container-of-third-place'>
							<div className='macronutrients-container'>
								<div>
									<p className='progress-macronutrients proteins'></p>Proteins
								</div>
								<div>
									<p className='progress-macronutrients carbs'></p>Carbohydrates
								</div>
								<div>
									<p className='progress-macronutrients fats'></p>Fats
								</div>
							</div>
							<div className='progress-calories-container'>
								<div className='outer'>
									<div className='inner' style={{ height: `${calculateProgress()}%` }}></div>
								</div>
								<div className='calories-consumed'>{Math.round(caloriesConsumed)}kcal</div>
								<div className='percent-consumed'>{percentCaloriesConsumed}%</div>
							</div>
						</div>
					</div>
					<div className='main-grid-items item4'>
						<span className='label-of-main-window-parts'>Burned Calories</span>
					</div>
					<div className='main-grid-items item5'>
						<span className='label-of-main-window-parts'>Favorites Meal</span>
					</div>
					<div className='main-grid-items item6'>
						<span className='label-of-main-window-parts'>Measurements</span>
					</div>
					<div className='main-grid-items item7'>
						<span className='label-of-main-window-parts'>Weekdays</span>
						<div className='days'>
							<div className='day'>
								<p className='progress-day-of-calories'></p>
								Mon
							</div>
							<div className='day'>
								<p className='progress-day-of-calories'></p>
								Tue
							</div>
							<div className='day'>
								<p className='progress-day-of-calories'></p>
								Wed
							</div>
							<div className='day'>
								<p className='progress-day-of-calories'></p>
								Thu
							</div>
							<div className='day'>
								<p className='progress-day-of-calories'></p>
								Fri
							</div>
							<div className='day'>
								<p className='progress-day-of-calories'></p>
								Sat
							</div>
							<div className='day'>
								<p className='progress-day-of-calories'></p>
								Sun
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MainContainer;
