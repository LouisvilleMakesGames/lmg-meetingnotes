export default {
	format: (date) => {
		var formatted = "Invalid Date";
		if(date !== undefined){
			formatted = String.prototype.concat(date.getFullYear(), "-", (date.getMonth() + 1), "-", date.getDate(), " ", date.getHours(), ":", date.getMinutes());
		}
		return formatted;
	}
};
