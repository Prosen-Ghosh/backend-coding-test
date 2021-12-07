const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":memory:");
const buildSchemas = require("../src/schemas");
const assert = require("assert");

describe("async db test", () => {
  const dbAsync = require("../src/dbAsync");
  const asyncDB = dbAsync(db);

  before((done) => {
    db.serialize((err) => {
      if (err) {
        return done(err);
      }

      buildSchemas(db);

      done();
    });
  });

  it("should throw server error", async () => {
    try {
      await asyncDB.all("SELECT *, wrong_column_name FROM Rides");
    } catch (error) {
      assert.deepEqual(error, {
        error_code: "SERVER_ERROR",
        message: "Unknown error",
      });
    }
  });

  it("should return all data", async () => {
    const rows = await asyncDB.all("SELECT * FROM Rides");
    assert.equal(rows.length, 0);
  });

  it("should inset data", async () => {
    const rows = await asyncDB.run(
      `
        INSERT INTO Rides (startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
      [
        52,
        50,
        80,
        80,
        `MR R`,
        `MR D`,
        "BMW",
      ]
    );
    assert.equal(rows, 1);
  });

  it("db run should throw server error", async () => {
    try {
      await asyncDB.run("INSERT 1");
    } catch (error) {
      assert.deepEqual(error, {
        error_code: "SERVER_ERROR",
        message: "Unknown error",
      });
    }
  });
});
