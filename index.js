const child_process = require('child_process');
const [, , nombreArchivo, extensionArchivo, divisa, cantidad] = process.argv;

// Concatenar nombre de archivo y extensión
const nombreArchivoExtension = (archivo, extension) => `${archivo}.${extension}`;

const ejecutar = (archivo, nombreArchivo, divisa, cantidad) => {
	return new Promise((resolve, reject) => {
		child_process.exec(
			`node ${archivo} ${nombreArchivo} ${divisa} ${cantidad}`,
			(err, result) => {
				if (err) {
					reject('Error en Child: ', err.message);
				}
				resolve(result);
			}
		);
	});
};

(async () => {
	await ejecutar(
		'app.js',
		nombreArchivoExtension(nombreArchivo, extensionArchivo),
		divisa,
		cantidad
	);
})();
