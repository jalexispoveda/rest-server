const { Schema, model } = require("mongoose");

const RolSchema = new Schema({
	rol: {
		type: String,
		required: [true, "El rol es obligatorio"],
	},
});

//De esta manera se exporta el esquema para que
//se llame usuarios la tabla
module.exports = model("Roles", RolSchema);
