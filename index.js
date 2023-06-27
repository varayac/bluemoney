const child_process = require('child_process')
const [, , nombreArchivo, extensionArchivo, divisa, cantidad] = process.argv
const nombreArchivoExtension = (archivo, extension) => `${archivo}.${extension}`

function ejecutar(archivo, nombreArchivo, divisa, cantidad) {
  return new Promise((resolve) => {
    child_process.exec(
      `node ${archivo} ${nombreArchivo} ${divisa} ${cantidad}`,
      (err, result) => {
        if (err) {
          console.log('Error en Child: ', err.message)
        }
        resolve(result)
        console.log('resultado :>> ', result)
      }
    )
  })
}

;(async () => {
  await ejecutar(
    'app.js',
    nombreArchivoExtension(nombreArchivo, extensionArchivo),
    divisa,
    cantidad
  )
})()
