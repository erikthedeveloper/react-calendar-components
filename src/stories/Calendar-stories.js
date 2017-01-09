import React, { PropTypes } from 'react';
import { storiesOf } from '@kadira/storybook';
import { StoryState } from '../components/State';
import Calendar from '../components/Calendar/Calendar';
import { selectDate } from '../components/Calendar/selectDate';
import { indicators } from '../components/Calendar/indicators';
import { selectRange } from '../components/Calendar/selectRange';
import { compose } from '../utils/utils';
import {
  monthState,
  selectDateState,
  selectRangeState,
  eventsState,
} from './story-state';
import Day from '../components/Day/Day';
import {isSameDay} from '../utils/date-utils';

const SelectDateCalendar = selectDate(Calendar);
const DayIndicatorsCalendar = indicators(Calendar);
const SelectRangeCalendar = selectRange(Calendar);

storiesOf('Calendar', module)

  .add('Calendar (basic)', () => (
    <StoryState stateProps={[monthState]}>
      {(stateProps) => <Calendar {...stateProps} />}
    </StoryState>
  ))

  .add('Select Date', () => (
    <StoryState stateProps={[monthState, selectDateState]}>
      {(stateProps) => <SelectDateCalendar {...stateProps} />}
    </StoryState>
  ))

  .add('Day Indicators', () => (
    <StoryState stateProps={[monthState, eventsState]}>
      {(stateProps) => <DayIndicatorsCalendar {...stateProps} />}
    </StoryState>
  ))

  .add('Select Range', () => (
    <StoryState stateProps={[monthState, selectRangeState]}>
      {(stateProps) => <SelectRangeCalendar {...stateProps} />}
    </StoryState>
  ))

  .add('Select Date + Day Indicators', () => {
    const CalendarComponent = compose([
      selectDate,
      indicators,
    ])(Calendar);

    return (
      <StoryState stateProps={[monthState, selectDateState, eventsState]}>
        {(stateProps) => <CalendarComponent {...stateProps} />}
      </StoryState>
    );
  })

  .add('Select Range + Day Indicators', () => {
    const CalendarComponent = compose([
      indicators,
      selectRange,
    ])(Calendar);

    return (
      <StoryState stateProps={[monthState, eventsState, selectRangeState]}>
        {(stateProps) => <CalendarComponent {...stateProps} /> }
      </StoryState>
    );
  })

  .add('Disable Weekends (inline example)', () => {
    const isWeekend = (date) => [0, 6].includes(date.getDay());
    /**
     * HoC with argument(s) to enhance Day
     * @param {function(Date): bool} shouldDisable
     */
    const disableDay = (shouldDisable) => (Day) => (props) => (
      <Day
        {...props}
        disabled={props.disabled || shouldDisable(props.date)}
      />
    );
    /** HoC to enhance Calendar. Enhances its own DayComponent as needed */
    const disableWeekends = (Calendar) => (props) => (
      <Calendar
        {...props}
        DayComponent={disableDay(isWeekend)(props.DayComponent)}
      />
    );

    const CalendarComponent = compose([
      indicators,
      selectRange,
      disableWeekends,
    ])(Calendar);

    return (
      <StoryState stateProps={[monthState, eventsState, selectRangeState]}>
        {(stateProps) => <CalendarComponent {...stateProps} /> }
      </StoryState>
    );
  })

  .add('Select Multiple Days (intermediate example)', () => {
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
      /**
       * @param {Date[]} dates
       * @param {Date} date
       * @return bool
       */
      const containsDate = (dates, date) =>
        dates.some((d) => isSameDay(date, d));

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

    // State to plug into story
    const selectMultipleState = {
      initialState: {selectedDates: []},
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
