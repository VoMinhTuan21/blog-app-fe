export const convertBase64ToBlob = (data: string) => {
	// Detect the image format from the base64 data
	const formatMatch = data.match(/^data:image\/(\w+);base64,/);
	const format = formatMatch ? formatMatch[1] : "unknown";

	// Convert the base64 data to a Blob with the correct MIME type
	const byteCharacters = atob(data.split(",")[1]);
	const byteArrays = [];
	for (let i = 0; i < byteCharacters.length; i++) {
		byteArrays.push(byteCharacters.charCodeAt(i));
	}
	const blob = new Blob([new Uint8Array(byteArrays)], { type: `image/${format}` });

	return {
		blob,
		format,
	};
};
