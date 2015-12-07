import React from "react";
import DateUtil from "../utils/dateutil.js";

export default ({action, date, id}) =>
<span className="time-display" id={id} onClick={action}>
	{DateUtil.format(date)}
</span>;
