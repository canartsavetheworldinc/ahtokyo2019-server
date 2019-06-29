const ibm_db = require("ibm_db")
const settings = require("./db_settings.js")

const db_str = "DATABASE=" + settings.db_name + ";"
	+ "HOSTNAME=" + settings.db_host + ";"
	+ "UID=" + settings.db_username + ";"
	+ "PWD=" + settings.db_password + ";"
	+ "PORT=" + settings.db_port + ";"
	+ "PROTOCOL=" + "TCPIP" + ";"

module.exports = function(sql) {
	return new Promise((resolve, reject) => {
		ibm_db.open(db_str, (err, connection) => {
			if(err)
				reject(err)
			connection.query(sql, (err, data) => {
				if(err)
					reject(err)
				
				resolve(data)

				connection.close()
			})
		})
	})
}
