import { connect } from "react-redux";
import React from "react";
import Time from "../components/time.jsx";

class Meeting extends React.Component{

	startMeeting(){
		console.log("Meeting has begun!");
	}

	saveMeeting(){
		console.log("Meetting Saved!");
	}

	render() {
		return (<form name="new-meeting">
				<h1>LMG Meeting</h1>
				<button onClick={this.startMeeting}>Start Meeting</button>
				<div>
				<label htmlFor="startTime">Time:</label>
				<Time action={this.saveMeeting} date={this.props.startTime} id="startTime"/>
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
