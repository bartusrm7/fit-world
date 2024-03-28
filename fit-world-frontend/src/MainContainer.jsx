import React, { useState, useEffect } from "react";

function MainContainer() {
	return (
		<div className='main'>
			<div className='main-window'>
				<div className='main-grid-container'>
					<div className='main-grid-items item1'>
						<span>Add the food:</span>
						<input type='text' className='input-food' />
						<button className="add-food-btn">+</button>
					</div>
					<div className='main-grid-items item2'>Total Calories</div>
					<div className='main-grid-items item3'>Today Calories <span className="current-calories-day"></span></div>
					<div className='main-grid-items item4'>Weight</div>
					<div className='main-grid-items item5'>Favorites Meal</div>
					<div className='main-grid-items item6'>Burned Calories</div>
					<div className='main-grid-items item7'>Weekdays</div>
				</div>
			</div>
		</div>
	);
}

export default MainContainer;
