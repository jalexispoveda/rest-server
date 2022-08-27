const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_CON, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("BD online");
  } catch (error) {
    throw new Error("Error en la BD", error);
  }
};

module.exports = {
  dbConnection,
};
