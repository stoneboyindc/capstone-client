import React, { Component } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import * as dates from '../../utils/dates';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css'
import WorkoutsContext from "../../WorkoutsContext";


moment.locale("en");
const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'black',
    },
  })
const localizer = momentLocalizer(moment);

// React big calendar npm package integration
class ReactCalendar extends Component {
  static contextType = WorkoutsContext;

  state = {
    view: ["month"],
    date: new Date(),
    width: 500,
    height: 500,
  }

  handleSelect = rawDate => {
    let selectedDate = rawDate.toISOString()
    this.context.updateDate(selectedDate)
  }


  render() {

    return (
      <div className='calendar-container' >
        <Calendar
          events={this.context.events}
          views = {['month']}
          view={this.state.view}
          height={this.state.height}
          step={60}
          date={this.state.date}
          onNavigate={date => this.setState({ date })}
          selectable
          eventPropGetter={event => ({className: 'title-' + event.title.toLowerCase()})}
          onSelectSlot={(rawDate) => this.handleSelect(rawDate.end)}
          showMultiDayTimes
          max={dates.add(dates.endOf(new Date(2015, 17, 1), 'day'), -1, 'hours')}
          defaultDate={new Date()}
          components={{
            timeSlotWrapper: ColoredDateCellWrapper,
          }}
          localizer={localizer}
        />
      </div>
    )
  }
}

export default ReactCalendar;