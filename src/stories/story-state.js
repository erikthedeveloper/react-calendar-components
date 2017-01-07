import React from 'react';

export const now = new Date();

export const dummyEvents = [-2, 3, 7, 15, 20, 40].map((addDays) => ({
  date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + addDays),
}));

export const monthState = {
  initialState: {currentMonth: new Date()},
  stateSetters: (setState) => ({
    setCurrentMonth: (currentMonth) => setState({currentMonth}),
  }),
};

export const selectDateState = {
  initialState: {
    selectedDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3),
  },
  stateSetters: (setState) => ({
    selectDate: (selectedDate) => setState({selectedDate}),
  }),
};

export const eventsState = {
  initialState: {events: dummyEvents},
  stateSetters: () => ({}),
};
