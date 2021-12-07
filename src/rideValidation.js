module.exports = (data) => {
	const startLatitude = Number(data.start_lat);
	const startLongitude = Number(data.start_long);
	const endLatitude = Number(data.end_lat);
	const endLongitude = Number(data.end_long);
	const riderName = data.rider_name;
	const driverName = data.driver_name;
	const driverVehicle = data.driver_vehicle;

	if (
		startLatitude < -90 ||
    startLatitude > 90 ||
    startLongitude < -180 ||
    startLongitude > 180
	) {
		throw {
			error_code: 'VALIDATION_ERROR',
			message:
        'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
		};
	}

	if (
		endLatitude < -90 ||
    endLatitude > 90 ||
    endLongitude < -180 ||
    endLongitude > 180
	) {
		throw {
			error_code: 'VALIDATION_ERROR',
			message:
        'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
		};
	}

	if (typeof riderName !== 'string' || riderName.length < 1) {
		throw {
			error_code: 'VALIDATION_ERROR',
			message: 'Rider name must be a non empty string',
		};
	}

	if (typeof driverName !== 'string' || driverName.length < 1) {
		throw {
			error_code: 'VALIDATION_ERROR',
			message: 'Driver name must be a non empty string',
		};
	}

	if (typeof driverVehicle !== 'string' || driverVehicle.length < 1) {
		throw {
			error_code: 'VALIDATION_ERROR',
			message: 'Driver vehicle must be a non empty string',
		};
	}
	return [
		data.start_lat,
		data.start_long,
		data.end_lat,
		data.end_long,
		data.rider_name,
		data.driver_name,
		data.driver_vehicle,
	];
};
