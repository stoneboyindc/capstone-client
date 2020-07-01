import React, { Component } from 'react';
import WorkoutsContext from '../../WorkoutsContext';
import * as firebase from 'firebase';
import User from '../User/User';
import './LandingPage.css';

// firebase config setup then initialize for oAuth
const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
  authDomain: `${process.env.REACT_APP_AUTH_DOMAIN}`,
  databaseURL: `${process.env.REACT_APP_DATABASE_URL}`,
  projectId: `${process.env.REACT_APP_PROJECT_ID}`,
  storageBucket: "",
  messagingSenderId: `${process.env.REACT_APP_MESSAGEINGSENDER_ID}`,
  appId: `${process.env.REACT_APP_APP_ID}`
}
firebase.initializeApp(firebaseConfig)


class LandingPage extends Component {
	static contextType = WorkoutsContext;

  render() {
		let fadeBack = this.context.showMenu ? 'landing-page-container fade-back': 'landing-page-container';

  	return (
			<div>
				<div className={fadeBack}>
					<div className='steps'>
						<div className='work-it-out-body'>
							<p>Keep track of your workouts.</p>
								<nav id="main">
									<User firebase={firebase} />
								</nav>
						</div>

						<div className='step-zero'>
							<h2>What is Work it Out?</h2>
							<p>Work it out allows you to create, view in calendar,
							and ultimately keep track of your daily workouts.</p>
						</div>

						<div className='step-one'>
							<h2>Getting started is easy.</h2>
							<div className='step-one-body'>
								<h3>Step One</h3>
								<p>Click Sign in above to sign in via your Google Account.</p>
							</div>

						</div>

						<div className='step-two'>

							<div className='step-two-body'>
								<h3>Step Two</h3>
								<p>Click add workout on the side menu to display the calendar. Select a date by clicking a date slot. Add your workout.</p>
							</div>
						</div>

						<div className='step-three'>
							<div className='step-three-body'>
								<h3>Step Three</h3>
								<p>Click view workout on the side menu to display the calendar. Select a date. View your workout!</p>
							</div>

						</div>
					</div>
				</div>
			</div>
  	)
	}
}

export default LandingPage;