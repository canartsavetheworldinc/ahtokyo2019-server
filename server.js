const express = require("express")
const app = express()

const db = require("./utils/db")

app.get("/", (req, res) => {
	res.send("Hello. This is Orion API server.")
})

app.get("/survivors", async (req, res) => {
	const responseObj = {
		status: "success"
	}
	const dbData = await db(`SELECT * FROM survivor`).catch(e => {
		responseObj.status = "failed"
		responseObj.error = "Could not access DB."
		res.status(500).send(responseObj)
	})
	res.send(dbData)
})
app.post("/survivors", async (req, res) => {
	const responseObj = {
		status: "success"
	}
	if(!(req instanceof Array)) {
		responseObj.status = "failed"
		responseObj.error = "Request must be an array."
		res.status(400).send(responseObj)
	}
	const dbData = await db(`SELECT * FROM survivor`).catch(e => {
		responseObj.status = "failed"
		responseObj.error = "Could not access DB."
		res.status(500).send(responseObj)
	})
	for(const survivor of req) {
		const same = dbData.filter(v => v.id === survivor.id)
		if(same.length > 0) {
			await db(`INSERT INTO survivor VALUES ('${survivor.id || NULL}', ${survivor.time || "NULL"}, ${survivor.lat || "NULL"}, ${survivor.lon || "NULL"})`).catch(err => {
				// responseObj.status = "failed"
				// responseObj.error = "Failed to insert."
				// res.status(400).send(responseObj)
			})
		} else {
			const newest = same.reduce((p, c) => p.time > c.time ? p : c)
			if(survivor.time < newest.time)
				continue
			await db(`UPDATE survivor SET time = ${survivor.time || "NULL"}, latitude = ${survivor.lat || "NULL"}, longitude = ${survivor.lon || "NULL"} WHERE id = '${survivor.id}'`).catch(err => {
				// responseObj.status = "failed"
				// responseObj.error = "Failed to update."
				// res.status(400).send(responseObj)
			})
		}
	}
	
	res.send(responseObj)
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server is listening on port ${port}.`))
