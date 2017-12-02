import React from 'react';
import DropdownList from 'react-widgets/lib/DropdownList';
import 'react-widgets/dist/css/react-widgets.css';


export default ({ input, data, label }) => (
  <div>
    <label>{label}</label>
    <DropdownList
      {...input}
      onBlur={() => input.onBlur()}
      data={data}
    />
  </div>
);
