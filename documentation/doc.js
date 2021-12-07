/**
 * A ride component
 * @typedef {object} Ride
 * @property {number} start_lat.required - Start lat - double
 * @property {number} start_long.required - 30 - double
 * @property {number} end_lat.required - 35 - double
 * @property {number} end_long.required - 0 - double
 * @property {string} rider_name.required - MR. X
 * @property {string} driver_name.required - MR. D
 * @property {string} driver_vehicle.required - BMW
 */

/**
 * GET /health
 * @summary Check Server health
 * @tags Health
 * @return {string} 200 - success response
 * @example response - 200 - success response example
 * Healthy
 */

/**
 * POST /rides
 * @summary Create New Ride
 * @param {Ride} request.body.required - Ride info
 * @return {object} 200 - ride response
 * @tags Ride
 * @example request - example payload
 * {
 *	"start_lat": 50,
 *  	"start_long": 50,
 * 	"end_lat": 80,
 * 	"end_long": 80,
 * 	"rider_name": "MR. X",
 * 	"driver_name": "MR. D",
 * 	"driver_vehicle": "BMW"
 * }
 * @example response - 200 - success response example
 * {
 *  "rideID": 1,
 *  "start_lat": 50,
 *  "start_long": 50,
 *  "end_lat": 80,
 * 	"end_long": 80,
 * 	"rider_name": "MR. X",
 * 	"driver_name": "MR. D",
 * 	"driver_vehicle": "BMW"
 *  "created": "2021-12-07 14:04:39"
 * }
 * @example response - 200 - validation error
 * {
 *	"error_code": "VALIDATION_ERROR",
 *	"message": "Some error message"
 * }
 */

/**
 * GET /rides
 * @summary Find All Rides
 * @tags Ride
 * @return {array<Ride>} 200 - success response
 * @example response - 200 - success response example
 * [
 *   {
 * 	    "rideID": 1,
 *      "start_lat": 50,
 *      "start_long": 50,
 *      "end_lat": 80,
 * 	    "end_long": 80,
 * 	    "rider_name": "MR. X",
 * 	    "driver_name": "MR. D",
 * 	    "driver_vehicle": "BMW"
 *   }
 * ]
 * @example response - 200 - not found
 * {
 *	"error_code": "RIDES_NOT_FOUND_ERROR",
 *	"message": "Could not find any rides"
 * }
 */

/**
 * GET /rides/{id}
 * @summary Get Single Ride by ID
 * @tags Ride
 * @param {integer} id.path.required - Ride id
 * @return {Ride} 200 - Ride response
 * @example response - 200 - success response example
 * {
 *  "rideID": 1,
 *  "start_lat": 50,
 *  "start_long": 50,
 *  "end_lat": 80,
 * 	"end_long": 80,
 * 	"rider_name": "MR. X",
 * 	"driver_name": "MR. D",
 * 	"driver_vehicle": "BMW"
 * }
 * @example response - 200 - not found
 * {
 *	"error_code": "RIDES_NOT_FOUND_ERROR",
 *	"message": "Could not find any rides"
 * }
 */
