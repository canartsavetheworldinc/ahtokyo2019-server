require('dotenv').config()

exports.db_host = 'dashdb-txn-sbox-yp-dal09-04.services.dal.bluemix.net'
exports.db_port = 50000
exports.db_name = process.env.DB_NAME
exports.db_username = process.env.DB_USER
exports.db_password = process.env.DB_PASS
