function ConvertHandler() {

	const unitMap = {
        gal: "L",
        L: "gal",
        lbs: "kg",
        kg: "lbs",
        mi: "km",
        km: "mi"
    };

	const unitNames = {
        gal: "gallons",
        L: "liters",
        lbs: "pounds",
        kg: "kilograms",
        mi: "miles",
        km: "kilometers"
    };

	this.getNum = function (input) {
		let result = 1;

		let foundUnit = this.getUnit(input);

		if(foundUnit){
			if(input.trim() === foundUnit){
				return result;
			}

			const num = input.replace(foundUnit, "").trim();

			if(num) {
				try {
					result = eval(num);
				} catch {
					result = "invalid unit";
				}
			}
		} else {
			result = "invalid unit";
		}

		return result;
	};

	this.getUnit = function (input) {
		let result;

		result = Object.keys(unitMap).find(unit => input.includes(unit));

		return result ? result.trim() : "invalid unit";
	};

	this.getReturnUnit = function (initUnit) {
		return unitMap[initUnit] || "invalid unit";
	};

	this.spellOutUnit = function (unit) {
		return unitNames[unit] || "invalid unit";
	};

	this.convert = function (initNum, initUnit) {
		const galToL = 3.78541;
		const lbsToKg = 0.453592;
		const miToKm = 1.60934;
		const convertMap = {
			gal: galToL,
			L: 1.0/galToL,
			lbs: lbsToKg,
			kg: 1.0/lbsToKg,
			mi: miToKm,
			km: 1/miToKm
		}

		return convertMap[initUnit] ? initNum * convertMap[initUnit] : "invalid unit";
	};

	this.getString = function (initNum, initUnit, returnNum, returnUnit) {
		const spelledInitUnit = this.spellOutUnit(initUnit);
		const spelledReturnUnit = this.spellOutUnit(returnUnit);

		if (spelledInitUnit === "invalid unit" || spelledReturnUnit === "invalid unit") {
			return "invalid unit";
		}

		return `${initNum} ${spelledInitUnit} converts to ${returnNum} ${spelledReturnUnit}`;
	};

}

module.exports = ConvertHandler;
