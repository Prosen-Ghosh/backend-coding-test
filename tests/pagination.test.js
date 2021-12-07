"use strict";

const assert = require("assert");
const getPagination = require("../libs/getPagination");

describe("Pagination lib tests", () => {
  it("should return default limit and offset", (done) => {
    assert.deepEqual(getPagination(), [10, 0]);
    done();
  });

  it("should return second page", (done) => {
    assert.deepEqual(getPagination(2), [10, 10]);
    done();
  });
});
