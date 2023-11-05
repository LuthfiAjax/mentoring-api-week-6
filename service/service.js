const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const fileName = "appointment.json";

class AppointmentService {
  addAppointment(name, date) {
    const data = this.readFileToJSON();
    data.push({
      id: uuidv4(),
      name: name,
      date: date,
    });
    this.writeDataToFile(data);
  }

  addAppointmentBulk(appointments) {
    const data = this.readFileToJSON();
    appointments.forEach((appointment) => {
      data.push({
        id: uuidv4(),
        name: appointment.name,
        date: appointment.date,
      });
    });
    this.writeDataToFile(data);
  }

  getAppointments() {
    return this.readFileToJSON();
  }

  getAppointmentById(id) {
    const data = this.readFileToJSON();
    return data.find((appointment) => appointment.id === id);
  }

  updateAppointment(id, name, date) {
    const data = this.readFileToJSON();
    const appointmentIndex = data.findIndex((appointment) => appointment.id === id);
    if (appointmentIndex !== -1) {
      data[appointmentIndex] = {
        id: id,
        name: name,
        date: date,
      };
      this.writeDataToFile(data);
      return data[appointmentIndex];
    }
    return null;
  }

  deleteAppointmentById(id) {
    const data = this.readFileToJSON();
    const filteredData = data.filter((appointment) => appointment.id !== id);
    if (filteredData.length < data.length) {
      this.writeDataToFile(filteredData);
      return true;
    }
    return false;
  }

  readFileToJSON() {
    let appointments = fs.readFileSync(fileName);
    if (appointments.byteLength === 0) {
      appointments = "[]";
    }
    return JSON.parse(appointments);
  }

  writeDataToFile(data) {
    fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
  }
}

module.exports = AppointmentService;
