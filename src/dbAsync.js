
module.exports = (db) => {
	const all = async (sql, params) => {
		return new Promise((resolve, reject) => {
			db.all(sql, params, function (err, result) {
				if (err) reject({ error_code: 'SERVER_ERROR', message: 'Unknown error' });
				resolve(result);
			});
		});
	};
	const run = (sql, params) => {
		return new Promise((resolve, reject) => {
			db.run(sql, params, function (err) {
				if (err) reject({ error_code: 'SERVER_ERROR', message: 'Unknown error' });
				resolve(this.lastID);
			});
		});
	};
	return { all, run };
};