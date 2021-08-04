const mongoose = require("mongoose");
const User = require("../models/User.model");
const db = require("../db");

const userSeed = [
  {
    email: "test@test.com",
    firstName: "Paco",
    lastName: "Gonzalez",
    password: "123456",
  },
];

mongoose
  .connect(db.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("Introduciendo datos de clientes desde el seed");

    const allClients = await User.find();

    if (allClients.length) {
      await User.collection.drop();
      console.log("Se ha eliminado la colección correctamente");
    }
  })
  .then(async () => {
    await User.insertMany(userSeed);
    console.log("Agregados clientes correctamente");
  })
  .catch((error) => {
    console.log("Error al ejecutar el seed --> ", error);
  })
  .finally(() => {
    mongoose.disconnect();
  });
