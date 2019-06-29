// survivor data
for(let i = 0; i < 20; i++) {
	const id = ("000000" + Math.floor(Math.random() * 78364164096).toString(36)).slice(-7)
	const time = (Math.floor(Math.random() * 161804157160) + 1400000000000) / 1000 | 0
	const lat = 35.684420 + (Math.random() - 0.5) * 2
	const lon = 139.753046 + (Math.random() - 0.5) * 2
	console.log(`insert into survivor values ('${id}', ${time}, ${lat.toFixed(6)}, ${lon.toFixed(6)});`)
}
