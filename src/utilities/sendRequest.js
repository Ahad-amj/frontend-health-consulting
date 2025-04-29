export default async function sendRequest(url, method = 'GET') {

	const options = { method };

	try {
		const res = await fetch(`http://localhost:8000${url}`, options);
		if (res.ok) return res.json();
	} catch (err) {
		console.log(err, "error in send-request");
		return err;
	}
}