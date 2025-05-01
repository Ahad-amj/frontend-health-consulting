export default async function sendRequest(url, method = 'GET', payload) {
	const options = { method };

	if (payload) {
		options.headers = { 'Content-type': 'application/json'}
		options.body = JSON.stringify(payload)
	}
	console.log(options)

	try {
		const res = await fetch(`http://localhost:8000${url}`, options);
		if (res.ok) return res.json();
	} catch (err) {
		console.log(err, "error in send-request");
		return err;
	}
}