'use strict';

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const getPagination = require('../libs/getPagination');
const rideValidation = require('./rideValidation');
const dbAsync = require('./dbAsync');
const logger = require('../libs/logger');
const jsonParser = bodyParser.json();

module.exports = (db) => {
	const asyncDB = dbAsync(db);
	app.get('/health', (req, res) => res.send('Healthy'));

	app.post('/rides', jsonParser, async (req, res) => {
		try {
			const values = rideValidation(req.body);
			const lastID = await asyncDB.run(
				'INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)',
				values
			);
			logger.info('lastID', lastID);
			const rows = await asyncDB.all('SELECT * FROM Rides WHERE rideID = ?', [
				lastID,
			]);
			res.send(rows);
		} catch (err) {
			res.send(err);
		}
	});

	app.get('/rides', async (req, res) => {
		try {
			let SQL = 'SELECT * FROM Rides';
			let params = [];
			if (req.query && req.query.page) {
				const page = Number(req.query.page);
				const limit = req.query.limit ? Number(req.query.limit) : 10;

				if (page) {
					SQL = 'SELECT * FROM Rides LIMIT ? OFFSET ?';
					params = getPagination(page, limit);
				}
			}

			const rows = await asyncDB.all(SQL, params);
			if (rows.length === 0) {
				return res.send({
					error_code: 'RIDES_NOT_FOUND_ERROR',
					message: 'Could not find any rides',
				});
			}

			res.send(rows);
		}catch(err){
			res.send(err);
		}
	});

	app.get('/rides/:id', async (req, res) => {
		try {
			const rows = await asyncDB.all('SELECT * FROM Rides WHERE rideID = ?', [req.params.id]);
			if (rows.length === 0) {
				return res.send({
					error_code: 'RIDES_NOT_FOUND_ERROR',
					message: 'Could not find any rides',
				});
			}
			res.send(rows);
		}catch(err){
			res.send(err);
		}
	});

	return app;
};
