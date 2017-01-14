import React, { PropTypes } from 'react';
import { storiesOf } from '@kadira/storybook';
import { StoryState } from '../components/State';
import { monthState } from './story-state';
import { flowRight as compose } from 'lodash';
import { isSameDay } from '../utils/date-utils';
import Calendar from '../components/Calendar/Calendar';
import Day from '../components/Day/Day';

/**
 * Intentionally inline/expose the innards of these examples
 * to see the flow of things all together...
 */
storiesOf('Inline Examples', module)

  .add('Disable Weekends (simple)', () => {
    /**
     * HoC with argument(s) to enhance Day
     * @param {function(Date): bool} shouldDisable
     */
    const disableDay = (shouldDisable) => (Day) => (props) => (
      <Day
        {...props}
        // Account for "already disabled"
        disabled={props.disabled || shouldDisable(props.date)}
      />
    );

    // Feed disableDay a shouldDisable(Date): bool function
    const disableForWeekends = disableDay(
      (date) => [0, 6].includes(date.getDay())
    );

    // Enhance our Day component
    const DayComponent = disableForWeekends(Day);

    return (
      <StoryState stateProps={[monthState]}>
        {(stateProps) => (
          <Calendar
            {...stateProps}
            DayComponent={DayComponent}
          />
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
    const containsDate = (dates, date) =>
      dates.some((d) => isSameDay(date, d));

    /**
     * HoC to enhance Day
     */
    function selectMultipleDay(Component) {
      const SelectMultipleDay = (props) => (
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
          this.toggleDate = this.toggleDate.bind(this);

          this.DayComponent = compose([
            (Component) => (props) => (
              <Component
                {...props}
                handleClickDate={this.toggleDate}
                selected={containsDate(this.props.selectedDates, props.date)}
              />
            ),
            selectMultipleDay,
          ])(this.props.DayComponent);
        }

        toggleDate(date) {
          const {selectedDates} = this.props;

          const newSelectedDates = containsDate(selectedDates, date)
            ? selectedDates.filter((d) => !isSameDay(d, date))
            : [...selectedDates, date];

          this.props.setSelectedDates(newSelectedDates);
        }

        render() {
          return <Component {...this.props} DayComponent={this.DayComponent} />;
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
        selectedDates: [-3, 2, 7, 15]
          .map((addDays) => new Date(now.getFullYear(), now.getMonth(), now.getDate() + addDays))
      },
      stateSetters: (setState) => ({
        setSelectedDates: (selectedDates) => setState({selectedDates}),
      }),
    };

    // Enhanced Calendar
    const CalendarComponent = selectMultiple(Calendar);

    return (
      <StoryState stateProps={[monthState, selectMultipleState]}>
        {(stateProps) => <CalendarComponent {...stateProps} />}
      </StoryState>
    )

  });
