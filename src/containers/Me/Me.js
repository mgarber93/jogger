import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Helmet } from 'react-helmet';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import Navbar from '../../components/Navbar/Navbar';
import './Me.css';
import { toggleEditing, stopEditing, changeDisplayOrder, removeJog, updateJog } from '../../redux/modules/app';
import displaySort from '../../utils/sorters.js';
import average from '../../utils/average.js';
import TableRowForm from '../../components/TableRowForm/TableRowForm';

@connect(({ auth, app }) => (
  {
    user: auth.user,
    displayOrder: app.displayOrder
  }
), {
  toggleEditing,
  stopEditing,
  changeDisplayOrder,
  removeJog,
  updateJog
})
export default class Me extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from: null,
      to: null,
    };
    this.filter = this.filter.bind(this);
    this.fromOnChange = this.handleChange.bind(this, 'from');
    this.toOnChange = this.handleChange.bind(this, 'to');
  }
  filter({ date }) {
    const d = new Date(date);
    const f = new Date(this.state.from);
    const t = new Date(this.state.to);
    if (this.state.from && d < f) {
      return false;
    }
    if (this.state.to && d > t) {
      return false;
    }
    return true;
  }
  handleChange(calendar, date) {
    this.setState(state => {
      state[calendar] = date;
      return state;
    });
  }
  render() {
    const { toggleEditing, user, displayOrder, changeDisplayOrder, removeJog, updateJog } = this.props;
    const { aveTime, totDistance, aveSpeed } = user ? average(user.jogs.filter(this.filter)) : {};
    return (
      <div className="Me">
        <Navbar />
        <div className="container">
          {user ?
            <div className="table-responsive">
              <Helmet title={user.username} />
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <h2 style={{ float: 'center', margin: 'auto' }}> {user.username.toUpperCase()}'S JOGS </h2>
              </div>

              <hr />

              <div className="well well-sm" style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ align: 'left' }}>
                  <label>
                  FROM
                  </label>
                  <DateTimePicker
                    onChange={this.fromOnChange}
                    format="DD MMM YYYY"
                    value={!this.state.from ? null : new Date(this.state.from)}
                  />
                </div>
                <div style={{ align: 'right' }}>
                  <label>
                  TO
                  </label>
                  <DateTimePicker
                    onChange={this.toOnChange}
                    format="DD MMM YYYY"
                    value={!this.state.to ? null : new Date(this.state.to)}
                  />
                </div>
              </div>

              <hr />
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th
                      className="distanceCol"
                      onClick={() => changeDisplayOrder('distance')}
                    >distance</th>
                    <th
                      className="timeCol"
                      onClick={() => changeDisplayOrder('time')}
                    >time</th>
                    <th
                      className="speedCol"
                      onClick={() => changeDisplayOrder('speed')}
                    >speed</th>
                    <th
                      className="dateCol"
                      onClick={() => changeDisplayOrder('date')}
                    >date</th>
                    <th />
                  </tr>
                </thead>

                <tbody>
                  {user.jogs.filter(this.filter).sort(displaySort(displayOrder)).map((jog, i) => (
                    <TableRowForm
                      key={jog._id || i}
                      jog={jog}
                      handleRemove={() => removeJog(jog)}
                      handleEdit={() => toggleEditing(jog)}
                      submit={updateJog}
                    />))}

                  <tr>
                    <td className="distanceCol">Total: {totDistance.toPrecision(4)} km</td>
                    <td className="timeCol">Ave: {aveTime.toPrecision(4)} s</td>
                    <td className="speedCol">Ave: {aveSpeed.toPrecision(4)} km/s</td>
                    <td className="dateCol"> - </td>
                    <td className="buttonCol" />
                  </tr>
                </tbody>
              </table>
            </div>
            :
            <div>
              <Redirect to="/login" />
              <p>Log in to view and edit your jogs</p>
            </div>
          }
        </div>
      </div>
    );
  }
}
