import React, { Component } from 'react';
import './ViewWorkouts.css';
import ReactCalendar from '../Calendar/Calendar';
import WorkoutsContext from '../../WorkoutsContext';


class ViewWorkouts extends Component {
	static contextType = WorkoutsContext;

	// on click delete, update workoutId and workoutBodyIdRef
	handleDelete = (workoutId, workoutBodyIdRef) => {
		console.log(workoutId, workoutBodyIdRef, 'workout ids')
		this.context.updateWorkoutIds(workoutId, workoutBodyIdRef)
	}

	render() {
	let workoutData = this.context.workouts;
	let fade = (this.context.selectedDate && this.context.user && workoutData.filter(workout => workout.start.includes(this.context.selectedDate)).length > 0) ? 'workouts-container fade': 'workouts-container';
	let nullDate = '';
	let selectedWorkouts;
	let deleteButton;


	if (this.context.selectedDate && this.context.user) {
		let filteredWorkouts =
			workoutData.filter(workout => workout.start.includes(this.context.selectedDate))

		selectedWorkouts =
		filteredWorkouts.map(workout =>
			<div className='workouts'>
				<div className='workout-title'>{workout.title.toUpperCase()}</div>
				<div>{workout.exercises.exercise}</div>
				<div>Sets: {workout.exercises.sets}</div>
				<div>Reps: {workout.exercises.reps}</div>
				<div>Weight: {workout.exercises.weight}</div>
				<button className='delete-button' onClick={() =>
					this.handleDelete(workout.exercises.workoutId, workout.exercises.workoutBodyIdRef)} type='button'>DELETE
				</button>
			</div>
		)

		deleteButton = selectedWorkouts.length ? <button onClick={()=> this.context.updateDate(nullDate)} className='exit-workout-display' type='button'>X</button> : '';
	}


		return (
			<div>
				<ReactCalendar />
				<div className={fade}>
					{deleteButton}
					{selectedWorkouts}
				</div>
			</div>
		)
	}
}

export default ViewWorkouts;