import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Calendar from '../components/Calendar';

storiesOf('Calendar', module)
  .add('Calendar (basic)', () => {
    return <Calendar />;
  });
