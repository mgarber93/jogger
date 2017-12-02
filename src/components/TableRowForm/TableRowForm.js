import React, { Component } from 'react';
import { connect } from 'react-redux';
import { stopEditing, updateJog as save } from '../../redux/modules/app';
import './TableRowForm.css';


@connect(
  ({ app }) => ({ editing: app.editing }),
  { stopEditing, save }
)
export default class TableRowForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props.jog };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit() {
    this.props.submit(this.state);
  }

  render() {
    const { jog, handleRemove, handleEdit, editing } = this.props;

    if (editing[jog._id]) {
      return (
        <tr key={jog._id}>
          <td className="distanceCol">
            <input
              type="text"
              name="distance"
              value={this.state.distance}
              onChange={this.handleChange}
              style={{ maxWidth: '70px' }}
            />
            <select name="distanceFormat" value={this.state.distanceFormat} onChange={this.handleChange} >
              <option value="mi">mi</option>
              <option value="km">km</option>
            </select>
          </td>
          <td className="timeCol">
            <input
              type="text"
              name="time"
              value={this.state.time}
              onChange={this.handleChange}
              style={{ maxWidth: '70px' }}
            />
            <select name="timeFormat" value={this.state.timeFormat} onChange={this.handleChange} >
              <option value="min">min</option>
              <option value="s">s</option>
            </select>
          </td>
          <td className="speedCol">
            {`${Math.round(jog.distance * 1000 / jog.time) / 1000} ${jog.distanceFormat}/${jog.timeFormat}`}
          </td>
          <td className="dateCol">{new Date(jog.date).toDateString()}</td>
          <td className="buttonCol">
            <button className="btn btn-default" onClick={handleEdit}>
              <i className="fa fa-ban" /> Cancel
            </button>
            <button className="btn btn-success" onClick={this.handleSubmit}>
              <i className="fa fa-cloud" /> Save
            </button>
          </td>
        </tr>
      );
    }

    return (
      <tr key={jog._id}>
        <td className="distanceCol">{`${jog.distance} ${jog.distanceFormat}`}</td>
        <td className="timeCol">{`${jog.time} ${jog.timeFormat}`}</td>
        <td className="speedCol">
          {`${Math.round(jog.distance * 1000 / jog.time) / 1000} ${jog.distanceFormat}/${jog.timeFormat}`}
        </td>
        <td className="dateCol">{new Date(jog.date).toDateString()}</td>
        <td className="buttonCol">
          <button className="btn btn-primary" onClick={handleEdit}>
            <i className="fa fa-pencil" /> Edit
          </button>
          <button className="btn btn-danger" onClick={handleRemove}>
            <i className="fa fa-trash" /> Remove
          </button>
        </td>
      </tr>
    );
  }
}

