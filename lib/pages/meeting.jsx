import { connect } from "react-redux";
import React from "react";
import Time from "../components/time.jsx";

class Meeting extends React.Component{
	render() {
		return (<form name="new-meeting">
				<h1>LMG Meeting</h1>
				<div>
				<label htmlFor="startTime">Time:</label>
				<Time date={this.props.startTime} id="startTime" />
				<label htmlFor="location">Location:</label>
				<input id="location" type="text" />
				</div>
			</form>);
	}
}

function meetingSelect(state) {

	var currentMeeting = state.currentMeeting;
	if(currentMeeting === undefined){
		currentMeeting = {
			startTime: new Date()
		};
	}
	return currentMeeting;
}

export default connect(meetingSelect)(Meeting);
