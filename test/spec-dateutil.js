import { expect } from "chai";
import DateUtil from "../lib/utils/dateutil.js";

describe("Date Util", () => {
	it("should format date in YYYY-MM-DD HH:MM format", () => {
		var date = new Date(2015, 11, 6, 15, 23, 33, 1);
		var formatted = DateUtil.format(date);
		expect(formatted).to.equal("2015-12-6 15:23");
	});
});
