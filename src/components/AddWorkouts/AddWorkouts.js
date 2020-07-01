import React, { Component } from 'react';
import './AddWorkouts.css';
import ReactCalendar from '../Calendar/Calendar';
import WorkoutsContext from '../../WorkoutsContext';
import config from '../../config';


const { API_ENDPOINT } = config;

class AddWorkouts extends Component {
  static contextType = WorkoutsContext;

  constructor() {
    super();
    this.state = {
      bodypart: '',
      exercise: '',
      sets: '',
      reps: '',
      weight: ''
    }
  }

  bodyPartChanged(bodypart) {
    this.setState({
      bodypart
    })
  }

  exerciseChanged(exercise) {
    this.setState({
      exercise
    })
  }

  setsChanged(sets) {
    this.setState({
      sets
    })
  }

  repsChanged(reps) {
    this.setState({
      reps
    })
  }

  weightChanged(weight) {
    this.setState({
      weight
    })
  }

  datePosted(date) {
    this.setState({
      date
    })
  }

  postedStatus(posted)  {
    this.setState({
      posted
    })
  }

  // update workouts and event node (workout body part) after post success
  handlePostedWorkoutEvent = postedWorkoutEvent => {
    this.context.addWorkout(postedWorkoutEvent[0])
    this.context.addEvent(postedWorkoutEvent[1])
  }

  // POST - pull workout data from form input, post to server, update posted workout and event node (see above), update user ID
  handleSubmit = e => {
    e.preventDefault()

    const { bodypart, exercise, sets, reps, weight } = this.state;
    let workout = {
      body_part: bodypart.toUpperCase(),
      exercise: exercise,
      sets: sets,
      reps: reps,
      weight: weight,
      date: this.context.selectedDate,
      user_full_name: this.context.user.displayName
    }

  fetch(`${API_ENDPOINT}/addworkouts/`, {
    method: 'POST',
    body: JSON.stringify(workout),
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`
    }
  })
    .then(res => {
      if (!res.ok) {
        throw new Error('Oops, something went wrong with adding your workout. Please try again.')
      }
      return res.json()
    })
    .then(post => {
      let workout = post[0]
      let postedWorkout = {
        userId: workout.user_full_name_id,
        id: workout.body_id,
        title: workout.body_part,
        start: workout.date,
        end: workout.date,
        exercises: {
          exercise: workout.exercise,
          sets: workout.sets,
          reps: workout.reps,
          weight: workout.weight,
          workoutId: workout.workoutId,
          workoutBodyIdRef: workout.body_id_reference
        }
      }

      let postedEvent = {
          id: workout.body_id,
          title: workout.body_part,
          start: workout.date,
          end: workout.date
      }

      let postedWorkoutEvent = [postedWorkout, postedEvent]
      return postedWorkoutEvent
    })
    .then(postedWorkoutEvent => {
      this.handlePostedWorkoutEvent(postedWorkoutEvent)
      this.context.updateUserId(postedWorkoutEvent[0].userId)
    })
    .catch(err => alert(err))
  }


  render() {
    let fade = (this.context.selectedDate && this.context.user) ? 'addworkout-form fade': 'addworkout-form';
    let form;
    let deleteButton;
    let nullDate = '';

    if (this.context.selectedDate && this.context.user) {
      deleteButton =
      <button onClick={()=> this.context.updateDate(nullDate)} className='exit-workout-display' type='button'>X</button>

      form =
      <form onSubmit={e => {this.handleSubmit(e); this.context.updateDate(nullDate)}}>
      <label htmlFor='body part'>Body Part</label>
      <input
        type='text'
        name='bodypart'
        id='bodypart'
        placeholder='Chest...'
        value={this.state.bodyPart}
        onChange={e => this.bodyPartChanged(e.target.value)}
        />
      <label htmlFor='exercise'>Exercise</label>
      <input
        type='text'
        name='exercise'
        id='exercise'
        placeholder='Bench Press...'
        value={this.state.exercise}
        onChange={e => this.exerciseChanged(e.target.value)}
        />
      <label htmlFor='sets'>Sets</label>
      <input
        type='number'
        name='sets'
        id='sets'
        placeholder='3...'
        value={this.state.sets}
        onChange={e => this.setsChanged(e.target.value)}
        />
      <label htmlFor='reps'>Reps</label>
      <input
        type='number'
        name='reps'
        id='reps'
        placeholder='8...'
        value={this.state.reps}
        onChange={e => this.repsChanged(e.target.value)}
        />
      <label htmlFor='reps'>Weight</label>
      <input
        type='number'
        name='weight'
        id='weight'
        placeholder='135...'
        value={this.state.weight}
        onChange={e => this.weightChanged(e.target.value)}
        />
        <input type ='submit'/>
    </form>
    }

  	return (
			<div>
				<ReactCalendar />
        <form className={fade}>
          {deleteButton}
          {form}
        </form>
			</div>
  	)
	}
}

export default AddWorkouts;