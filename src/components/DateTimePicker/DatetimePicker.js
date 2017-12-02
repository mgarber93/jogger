import React from 'react';
import moment from 'moment';
import 'react-widgets/dist/css/react-widgets.css';
import momentLocaliser from 'react-widgets-moment';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';


moment.locale('en');
momentLocaliser(moment);

export default ({ input: { onChange, value }, showTime }) => (
  <DateTimePicker
    onChange={onChange}
    format="DD MMM YYYY"
    time={showTime}
    value={!value ? null : new Date(value)}
  />
);
