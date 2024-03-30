import React, { useState, useEffect } from "react";

function MainContainer() {
	const [food, setFood] = useState([]);
	const [foodInput, setFoodInput] = useState("");
	const [caloriesConsumed, setCaloriesConsumed] = useState(0);
	const [caloriesNeeded, setCaloriesNeeded] = useState(2000);
	const [basicMacroAmount, setBasicMacroAmount] = useState({
		proteins: 0,
		carbs: 0,
		fats: 0,
	});
	const [macroNutrientsMax, setMacroNutrientsMax] = useState({
		proteins: 120,
		carbs: 250,
		fats: 50,
	});

	function updateMarcoNutrients(addedCalories) {
		// const addedProteins =
		// const addedCarbs =
		// const addedFats =
	}

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
			const addedCalories = data[0].calories;

			setFood([...food, data[0]]);
			setFoodInput("");

			setCaloriesConsumed(caloriesConsumed + addedCalories);
		} catch (error) {
			console.error("Error searching the food:", error);
		}
	};
	const createRemoveFoodBtn = index => {
		return (
			<button className='remove-food-btn' onClick={() => removeFood(index)}>
				Remove
			</button>
		);
	};
	function removeFood(index) {
		const removedFood = food[index];
		const updateFoodList = food.filter((_, i) => i !== index);
		setFood(updateFoodList);
		setCaloriesConsumed(caloriesConsumed - removedFood.calories);
	}
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
									- {food.name} {createRemoveFoodBtn(index)}
								</li>
							))}
						</ul>
					</div>
					<div className='main-grid-items item2'>
						<span className='label-of-main-window-parts'>Total Calories</span>
						<div className='total-calories-per-day-container'>
							<div>
								<p>
									Calories: <span>2000</span>
								</p>
								<p>
									Proteins: <span>{macroNutrients.proteins}</span>
								</p>
								<p>
									Carbohydrates:<span>{macroNutrients.carbs}</span>
								</p>
								<p>
									Fats: <span>{macroNutrients.fats}</span>
								</p>
							</div>
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
									<p className='progress-macronutrients'>
										<span
											className='proteins-component food-component'
											style={{ width: `${macroNutrients.proteins}%` }}></span>
									</p>
									Proteins
								</div>
								<div>
									<p className='progress-macronutrients'>
										<span
											className='carbs-component food-component'
											style={{ width: `${macroNutrients.carbs}%` }}></span>
									</p>
									Carbohydrates
								</div>
								<div>
									<p className='progress-macronutrients'>
										<span className='fats-component food-component' style={{ width: `${macroNutrients.fats}%` }}></span>
									</p>
									Fats
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
