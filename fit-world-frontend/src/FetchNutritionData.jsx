const FetchNutritionData = async () => {
	try {
		const response = await fetch(
			`https://api.edamam.com/api/food-database/v2/parser?app_id=034c27c3&app_key=0eafc098f21d5d33867a74f807e74732`
		);
		if (!response.ok) {
			throw new Error("Response not OK");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Wystąpił błąd podczas pobierania danych:", error);
		throw error;
	}
};

export default FetchNutritionData;
