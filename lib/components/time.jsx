import React from "react";
import DateUtil from "../utils/dateutil.js";

export default ({id, date}) =>
<span className="time-display" id={id}>
	{DateUtil.format(date)}
</span>;
