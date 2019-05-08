import PropTypes from 'prop-types';
import React from 'react';
import {storiesOf} from '@storybook/react';
import {StoryState} from '../components/State';
import {monthState, selectDateState} from './story-state';
import {flowRight as compose} from 'lodash';
import {isSameDay} from '../utils/date-utils';
import Calendar from '../components/Calendar/Calendar';
import EnhanceDay from '../components/Calendar/EnhanceDay';
import Day from '../components/Day/Day';
import {selectDate} from '../components/Calendar/selectDate';

/**
 * Intentionally inline/expose the innards of these examples
 * to see the flow of things all together...
 */
storiesOf('Calendar', module)
  .add('Select Date + Disable Weekends (simple)', () => {
    /**
     * HoC with argument(s) to enhance Day
     * @param {function(Date): bool} shouldDisable
     */
    const disableDay = shouldDisable => Day => props => (
      <Day
        {...props}
        // Account for "already disabled"
        disabled={props.disabled || shouldDisable(props.date)}
      />
    );

    // Feed disableDay a shouldDisable(Date): bool function
    const disableForWeekends = disableDay(date =>
      [0, 6].includes(date.getDay())
    );

    // Enhance our Day component
    const DayComponent = disableForWeekends(Day);

    const CalendarComponent = selectDate(Calendar);

    return (
      <StoryState stateProps={[monthState, selectDateState]}>
        {stateProps => (
          <CalendarComponent {...stateProps} DayComponent={DayComponent} />
        )}
      </StoryState>
    );
  })

  .add('Select Multiple Days (intermediate)', () => {
    /**
     * @param {Date[]} dates
     * @param {Date} date
     * @return bool
     */
    const containsDate = (dates, date) => dates.some(d => isSameDay(date, d));

    /**
     * HoC to enhance Day
     */
    function selectMultipleDay(Component) {
      const SelectMultipleDay = props => (
        <Component
          {...props}
          selected={props.selected}
          onClick={() => props.handleClickDate(props.date)}
        />
      );

      SelectMultipleDay.propTypes = {
        selected: PropTypes.bool.isRequired,
        handleClickDate: PropTypes.func.isRequired,
      };

      return SelectMultipleDay;
    }

    /**
     * HoC to enhance Calendar
     */
    function selectMultiple(Component) {
      class SelectMultipleCalendar extends React.Component {
        constructor() {
          super(...arguments);

          this.enhanceDay = compose([
            Component => props => (
              <Component
                {...props}
                handleClickDate={this.toggleDate}
                selected={containsDate(this.props.selectedDates, props.date)}
              />
            ),
            selectMultipleDay,
          ]);
        }

        toggleDate = date => {
          const {selectedDates} = this.props;

          const newSelectedDates = containsDate(selectedDates, date)
            ? selectedDates.filter(d => !isSameDay(d, date))
            : [...selectedDates, date];

          this.props.setSelectedDates(newSelectedDates);
        };

        render() {
          return (
            <EnhanceDay
              DayComponent={this.props.DayComponent}
              enhanceDay={this.enhanceDay}
            >
              {EnhancedDay => (
                <Component {...this.props} DayComponent={EnhancedDay} />
              )}
            </EnhanceDay>
          );
        }
      }

      SelectMultipleCalendar.propTypes = {
        selectedDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
        setSelectedDates: PropTypes.func.isRequired,
      };

      SelectMultipleCalendar.defaultProps = {
        DayComponent: Day,
      };

      return SelectMultipleCalendar;
    }

    const now = new Date();

    // State to plug into story
    const selectMultipleState = {
      initialState: {
        selectedDates: [-3, 2, 7, 15].map(
          addDays =>
            new Date(now.getFullYear(), now.getMonth(), now.getDate() + addDays)
        ),
      },
      stateSetters: setState => ({
        setSelectedDates: selectedDates => setState({selectedDates}),
      }),
    };

    // Enhanced Calendar
    const CalendarComponent = selectMultiple(Calendar);

    return (
      <StoryState stateProps={[monthState, selectMultipleState]}>
        {stateProps => <CalendarComponent {...stateProps} />}
      </StoryState>
    );
  });
