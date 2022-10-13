const { Schema, model } = require("mongoose");

const usuarioSchema = new Schema({
	name: {
		type: String,
		required: [true, "El nombre es obligatorio"],
	},
	correo: {
		type: String,
		required: [true, "El correo es obligatorio"],
		unique: true,
	},
	password: {
		type: String,
		required: [true, "El password es obligatorio"],
	},
	img: {
		type: String,
	},
	rol: {
		type: String,
		required: true,
		enum: ["ADMIN_ROLE", "USER_ROLE", "VENTAS_ROL"],
	},
	estado: {
		type: Boolean,
		default: true,
	},
	google: {
		type: Boolean,
		default: false,
	},
});

//Podemos llamar metodos propios de mongoose y sobreescrbirlos
//Se necesita una funcion normal porque la de flecha saca el this del scope de la funcion
//Metodo para retornar el usuario sin mostrar la password en el objeto
usuarioSchema.methods.toJSON = function () {
	//Metodo para remover propiedades al momento de mostrar
	const { __v, password, _id, ...usuario } = this.toObject();
	//cambiando nombre de la propiedad de mongo
	usuario.uid = _id;
	return usuario;
};

//De esta manera se exporta el esquema para que
//se llame usuarios la tabla
module.exports = model("Usuarios", usuarioSchema);
