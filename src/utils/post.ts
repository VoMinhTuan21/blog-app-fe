export function generatePostPath(title: string, id: string) {
	return (
		title
			.toLowerCase()
			.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
			.replace(/\s/g, "-") +
		"_" +
		id
	);
}
