import React, { useState, useEffect } from "react";

function FetchNutritionData() {
	const [data, setData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					"https://api.edamam.com/api/food-database/v2/parser?app_id=034c27c3&app_key=0eafc098f21d5d33867a74f807e74732"
				);
				if (!response.ok) {
					throw new Error("Response not OK");
				}
				const data = await response.json();
				setData(data);
			} catch (error) {
				console.error("We got error during upload the datas!", error);
			}
		};
		fetchData();
	});
}

export default FetchNutritionData;
