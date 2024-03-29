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
			console.log(data[0]);
			setFood([...food, data[0]]);
			setFoodInput("");
		} catch (error) {
			console.error("Error searching the food:", error);
		}
	};
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
								<li key={index}>- {food.name}</li>
							))}
						</ul>
					</div>
					<div className='main-grid-items item2'>
						<span className='label-of-main-window-parts'>Total Calories</span>
						<div>
							<p>
								<span className='total-calories-per-day'>2500</span>kcal
							</p>
						</div>
					</div>
					<div className='main-grid-items item3'>
						<div className='label-and-date-container-item3'>
							<span className='label-of-main-window-parts'>Today Calories</span>
							<span className='current-calories-day'>{currentDate()}</span>
						</div>
						<div className='circle-calories-container'>
							<div className='outer'>
								<div className='inner'></div>
							</div>
						</div>
						<div className='macronutrients-container'>
							<p>
								P
								<input type='checkbox' />
							</p>
							<p>
								C<input type='checkbox' />
							</p>
							<p>
								F<input type='checkbox' />
							</p>
						</div>
					</div>
					<div className='main-grid-items item4'>
						<span className='label-of-main-window-parts'>Measurements</span>
					</div>
					<div className='main-grid-items item5'>
						<span className='label-of-main-window-parts'>Favorites Meal</span>
					</div>
					<div className='main-grid-items item6'>
						<span className='label-of-main-window-parts'>Burned Calories</span>
					</div>
					<div className='main-grid-items item7'>
						<span className='label-of-main-window-parts'>Weekdays</span>
						<div className='days'>
							<p className='day'>
								{" "}
								<span className='progress-day'>
									<input type='checkbox' />
								</span>
								Mon
							</p>
							<p className='day'>
								{" "}
								<span className='progress-day'>
									<input type='checkbox' />
								</span>
								Tue
							</p>
							<p className='day'>
								{" "}
								<span className='progress-day'>
									<input type='checkbox' />
								</span>
								Wed
							</p>
							<p className='day'>
								{" "}
								<span className='progress-day'>
									<input type='checkbox' />
								</span>
								Thu
							</p>
							<p className='day'>
								{" "}
								<span className='progress-day'>
									<input type='checkbox' />
								</span>
								Fri
							</p>
							<p className='day'>
								{" "}
								<span className='progress-day'>
									<input type='checkbox' />
								</span>
								Sat
							</p>
							<p className='day'>
								{" "}
								<span className='progress-day'>
									<input type='checkbox' />
								</span>
								Sun
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MainContainer;
