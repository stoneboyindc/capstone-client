import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import PageNav from '../components/PageNav/PageNav';
import LandingPage from '../components/LandingPage/LandingPage';
import AddWorkouts from '../components/AddWorkouts/AddWorkouts';
import ViewWorkouts from '../components/ViewWorkouts/ViewWorkouts';
import WorkoutsContext from '../WorkoutsContext';
import defaultUserImage from '../assets/tomatoes-default-user-image.png';
import config from '../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons'
import './App.css'

class App extends Component {
static contextType = WorkoutsContext;

constructor(props) {
  super(props);
    this.state = {
      workouts: [],
      selectedDate: '',
      events: [],
      workoutId: 0,
      userId: 0,
      workoutBodyIdRef: 0,
      showMenu: false,
      user: null,
      activeRoom: null
    }
}

// DELETE - update workout Id's then fetch on callback to send updated Ids to backend to initiate delete request
updateWorkoutIds = (workoutId, workoutBodyIdRef) => {
  this.setState({
    workoutId : workoutId,
    workoutBodyIdRef: workoutBodyIdRef
  }, () => {
    fetch(`${config.API_ENDPOINT}/viewworkouts/${this.state.workoutId}/${this.state.workoutBodyIdRef}/${this.state.userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`,
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if(!res.ok) {
        throw new Error('Oops, something went wrong with deleting your workout. Please try again.')
      }
    })
    .then(() => {
      this.deleteWorkout(this.state.workoutId)
      this.deleteEvent(this.state.workoutBodyIdRef)
    })
    .catch(err => alert(err))
  })
}

updateUserId = userId => {
  this.setState({
    userId
  })
}

updateShowMenu = () => {
  this.setState({
    showMenu: !this.state.showMenu
  })
}

updateDate = (selectedDate, nullDate) => {
  selectedDate ? this.setState({selectedDate}) : this.setState({selectedDate: nullDate});
}

// update workouts if user exists, else empty workouts array
updateWorkouts = (workout, empty) => {
  if(this.state.user.displayName) {
    this.setState({
      workouts: workout
    })
  } else if (!this.state.user.displayName) {
      this.setState({
        workouts: empty
      })
    }
}

//update events if user exists, else empty events array
updateEvents = (event, empty) => {
  if(this.state.user.displayName) {
    this.setState({
      events: event
    })
  } else if(!this.state.user.displayName) {
      this.setState({
        events: empty
      })
    }
}

// add event node (workout body part) if one does not already exist in event array with same date and title
addEvent = addEvents => {
  let eventDate = addEvents.start;
  let eventTitle = addEvents.title;
  let filteredDate = this.state.events.filter(event => event.start === eventDate);
  let findTitle = filteredDate.find(event => event.title === eventTitle);

  if (!findTitle) {
    this.setState ({
      events: [...this.state.events, addEvents]
    })
  }
}

addWorkout = workout => {
  this.setState({
    workouts: [...this.state.workouts, workout]
  })
}

deleteWorkout = workoutId => {
  let newWorkouts = this.state.workouts.filter(workout => workout.exercises.workoutId !== workoutId);
  this.setState({
    workouts: newWorkouts
  })
}

// delete event node(workout body part) if workouts array has < 1 entry
deleteEvent = workoutBodyIdRef => {
  let filteredWorkouts = this.state.workouts.filter(workout => workout.exercises.workoutBodyIdRef === workoutBodyIdRef);
  if(filteredWorkouts.length < 1) {
    let newEvents = this.state.events.filter(event => event.id !== workoutBodyIdRef)
    this.setState({
      events: newEvents
    })
  }
}

updateUser = user => {
  this.setState({
    user
  })
}

updateRoom = room => {
  this.setState({
    activeRoom: room
  })
}

  render() {
    const dumbBell = <FontAwesomeIcon icon={faDumbbell} style={{color: 'green'}} size='lg'/>
    const contextValue = {
      workouts: this.state.workouts,
      selectedDate: this.state.selectedDate,
      events: this.state.events,
      workoutId: this.state.workoutId,
      userId: this.state.userId,
      workoutBodyIdRef: this.state.workoutBodyIdRef,
      showMenu: this.state.showMenu,
      user: this.state.user,
      activeRoom: this.state.activeRoom,
      deleteWorkout: this.deleteWorkout,
      deleteEvent: this.deleteEvent,
      updateShowMenu: this.updateShowMenu,
      updateUserId: this.updateUserId,
      updateDate: this.updateDate,
      updateWorkoutIds: this.updateWorkoutIds,
      updateWorkouts: this.updateWorkouts,
      updateEvents: this.updateEvents,
      updateUser: this.updateUser,
      updateRoom: this.updateRoom,
      addWorkout: this.addWorkout,
      addEvent: this.addEvent
    }

    return (
      <main className='app'>
        <WorkoutsContext.Provider value={contextValue}>
          <div className='work-it-out-heading-container'>
            <h2 className='work-it-out-heading'>
              {dumbBell}
              <Link className='logo' to='/'>WORK IT OUT</Link>
            </h2>
          </div>

          <div className='username-container'>
            <div id="avatar">
              <img src={this.state.user ? this.state.user.photoURL : defaultUserImage} alt="user" />
            </div>
            <div id="user-display-name">{this.state.user ? this.state.user.displayName.split(' ')[0] : ''}
            </div>
          </div>

          <PageNav />

          <Route exact path='/' component={LandingPage}/>
            <Route exact path='/addworkouts' component={AddWorkouts} />
            <Route exact path='/addworkouts/:userName' component={AddWorkouts} />
            <Route exact path='/viewworkouts' component={ViewWorkouts} />
            <Route exact path='/viewworkouts/:userName/' component={ViewWorkouts} />
        </WorkoutsContext.Provider>
      </main>
    )
  }
}

export default App;
