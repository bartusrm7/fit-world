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
	const initialProteinsValue = 120;
	const initialCarbsValue = 250;
	const initialFatsValue = 50;
	const percentCaloriesConsumed = Math.round((caloriesConsumed / caloriesNeeded) * 100);
	function updateMacroNutrients(proteinsAmount, carbsAmount, fatsAmount) {
		const { proteins, carbs, fats } = macroNutrientsMax;

		const proteinsPercente = (proteinsAmount / proteins) * 100;
		const carbsPercente = (carbsAmount / carbs) * 100;
		const fatsPercente = (fatsAmount / fats) * 100;

		setBasicMacroAmount(prevState => ({
			...prevState,
			proteins: prevState.proteins + proteinsAmount,
			carbs: prevState.carbs + carbsAmount,
			fats: prevState.fats + fatsAmount,
		}));

		setMacroNutrientsMax(prevState => ({
			...prevState,
			proteins: Math.round(prevState.proteins + proteinsPercente),
			carbs: Math.round(prevState.carbs + carbsPercente),
			fats: Math.round(prevState.fats + fatsPercente),
		}));
	}
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
			const proteinsAmount = data[0].protein_g;
			const carbsAmount = data[0].carbohydrates_total_g;
			const fatsAmount = data[0].fat_total_g;

			setFood([...food, data[0]]);
			setFoodInput("");
			updateMacroNutrients(proteinsAmount, carbsAmount, fatsAmount);
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

		const proteinsToRemove = removedFood.protein_g;
		const carbsToRemove = removedFood.carbohydrates_total_g;
		const fatsToRemove = removedFood.fat_total_g;

		setBasicMacroAmount(prevState => ({
			proteins: prevState.proteins - proteinsToRemove,
			carbs: prevState.carbs - carbsToRemove,
			fats: prevState.fats - fatsToRemove,
		}));
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
									Proteins: <span>{initialProteinsValue}</span>
								</p>
								<p>
									Carbohydrates:<span>{initialCarbsValue}</span>
								</p>
								<p>
									Fats: <span>{initialFatsValue}</span>
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
											style={{ width: `${basicMacroAmount.proteins}%` }}></span>
									</p>
									Proteins
								</div>
								<div>
									<p className='progress-macronutrients'>
										<span
											className='carbs-component food-component'
											style={{ width: `${basicMacroAmount.carbs}%` }}></span>
									</p>
									Carbohydrates
								</div>
								<div>
									<p className='progress-macronutrients'>
										<span
											className='fats-component food-component'
											style={{ width: `${basicMacroAmount.fats}%` }}></span>
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
						<div className='burned-calories-container'>
							<ul>{/* <li></li> */}</ul>
							<button className='burned-calories-btn'>Add activity</button>
						</div>
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
