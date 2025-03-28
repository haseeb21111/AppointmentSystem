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

  // ڈیٹا لینے کا فنکشن
  const fetchAppointments = () => {
    axios.get('http://localhost:5000/api/appointments')
      .then((res) => setAppointments(res.data))
      .catch((err) => console.error('Error fetching appointments!', err));
  };

  useEffect(() => fetchAppointments(), []);

  // اپ ڈیٹ کے لیے فنکشن
  const handleUpdate = (id) => {
    axios.put(`http://localhost:5000/api/appointments/${id}`, editData)
      .then(() => {
        alert('Appointment updated!');
        setEditingId(null);
        fetchAppointments(); // نئی لسٹ لے کر آئے
      })
      .catch((err) => console.error('Error updating!', err));
  };

  // ایڈٹ موڈ میں جانے کا فنکشن
  const handleEdit = (appointment) => {
    setEditingId(appointment.id);
    setEditData({
      name: appointment.name,
      date: appointment.date.split('T')[0], // تاریخ کو صحیح فارمیٹ میں لے
      time: appointment.time,
      description: appointment.description
    });
  };

  // ان پٹ میں تبدیلی کا فنکشن
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="appointment-list">
      <h2>Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment.id}>
              {editingId === appointment.id ? (
                <div className="edit-form">
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleEditChange}
                  />
                  <input
                    type="date"
                    name="date"
                    value={editData.date}
                    onChange={handleEditChange}
                  />
                  <input
                    type="time"
                    name="time"
                    value={editData.time}
                    onChange={handleEditChange}
                  />
                  <textarea
                    name="description"
                    value={editData.description}
                    onChange={handleEditChange}
                  />
                  <button onClick={() => handleUpdate(appointment.id)}>
                    Save
                  </button>
                  <button onClick={() => setEditingId(null)}>
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <strong>{appointment.name}</strong> - 
                  <span> {new Date(appointment.date).toLocaleDateString()} </span>
                  <span> {appointment.time} </span>
                  <p>{appointment.description}</p>
                  <button onClick={() => handleEdit(appointment)}>
                    Edit
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AppointmentList;
