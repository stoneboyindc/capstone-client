import React from 'react';

const WorkoutsContext = React.createContext({
    workouts: [],
    selectedDate: '',
    events: [],
    workoutId: 0,
    userId: 0,
    workoutBodyIdRef: 0,
    showMenu: false,
    user: null,
    activeRoom: null,
    updateWorkouts: () => {},
    updateShowMenu: () => {},
    updateDate: () => {},
    updateWorkoutIds: () => {},
    updateWorkoutId: () => {},
    updateUserId: () => {},
    updateWorkoutBodyIdRef: () => {},
    deleteWorkout: () => {},
    deleteEvent: () => {},
    addWorkout: () => {},
    addEvent: () => {},
    updateEvents: () => {},
    updateRoom: () => {},
    updateUser: () => {}
})

export default WorkoutsContext;