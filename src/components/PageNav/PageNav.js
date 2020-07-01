import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import WorkoutsContext from '../../WorkoutsContext';
import './PageNav.css';


class PageNav extends Component {
	static contextType = WorkoutsContext;

	render() {
		let menu;
		let slideIn = this.context.showMenu ? 'hamburger-options-container slide-in' : 'hamburger-options-container';
		let viewWorkouts = this.context.user ?
			<Link className='link' to={`/viewworkouts/${this.context.user.displayName}`}><button type='button'>VIEW WORKOUT</button></Link> :
			<Link className='link' to={`/viewworkouts/`}><button type='button'>VIEW WORKOUT</button></Link>
		let addWorkouts = this.context.user ?
			<Link className='link' to={`/addworkouts/${this.context.user.displayName}`}><button type='button'>ADD WORKOUT</button></Link> :
			<Link className='link' to={`/addworkouts/`}><button type='button'>ADD WORKOUT</button></Link>
		console.log(addWorkouts, 'add workouts')

		if(this.context.showMenu) {
			menu =
				<div className={slideIn}>
					<Link className='link' to={'/'}>
						<button type="button">LOGO</button>
					</Link>
					{viewWorkouts}
					{addWorkouts}
				</div>
		} else if(!this.context.showMenu) {
			menu =
				<div className={slideIn}>
					<Link className='link' to={'/'}>
						<button type="button">LOGO</button>
					</Link>
					{viewWorkouts}
					{addWorkouts}
				</div>
		}

		return (
			<div className='hamburger-all-container'>
				<div onClick={() => this.context.updateShowMenu()} className='hamburger'>
					<div></div>
					<div></div>
					<div></div>
				</div>

				{menu}
			</div>
		)
	}
}

export default PageNav;