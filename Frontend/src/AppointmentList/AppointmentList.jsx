import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AppointmentList.css';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    name: '',
    date: '',
    time: '',
    description: ''
  });

  const fetchAppointments = () => {};

  return (
    <div>
      <h2>Appointments</h2>
      <ul>
        {appointments.length === 0 ? <p>No appointments found.</p> : null}
        {appointments.map((appointment) => (
          <li key={appointment.id}>
            <strong>{appointment.name}</strong> - 
            <span> {new Date(appointment.date).toLocaleDateString()} </span> 
            <span> {appointment.time} </span>
            <p>{appointment.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentList;
