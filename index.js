const express = require("express");
const uuid = require("uuid");
const app = express();
const port = 3000;

const AppointmentService = require("./service/service"); // Sesuaikan dengan path yang benar

app.use(express.json());

const appointmentService = new AppointmentService();

// Create a new appointment
app.post("/appointments", (req, res) => {
  const { name, date } = req.body;
  appointmentService.addAppointment(name, date);
  res.status(201).json({ message: "Appointment created successfully" });
});

app.post("/bulk-appointments", (req, res) => {
  const { appointments } = req.body;
  appointmentService.addAppointmentBulk(appointments);
  res.status(201).json({ message: "Bulk appointments created successfully" });
});

// Get all appointments
app.get("/appointments", (req, res) => {
  const appointments = appointmentService.getAppointments();
  res.json(appointments);
});

// Get appointment by ID
app.get("/appointments/:id", (req, res) => {
  const { id } = req.params;
  const appointment = appointmentService.getAppointmentById(id);
  if (!appointment) {
    return res.status(404).json({ message: "Appointment not found" });
  }
  res.json(appointment);
});

// Update appointment by ID
app.put("/appointments/:id", (req, res) => {
  const { id } = req.params;
  const { name, date } = req.body;
  const updatedAppointment = appointmentService.updateAppointment(id, name, date);
  if (!updatedAppointment) {
    return res.status(404).json({ message: "Appointment not found" });
  }
  res.json(updatedAppointment);
});

// Delete appointment by ID
app.delete("/appointments/:id", (req, res) => {
  const { id } = req.params;
  const success = appointmentService.deleteAppointmentById(id);
  if (!success) {
    return res.status(404).json({ message: "Appointment not found" });
  }
  res.status(204).end();
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
