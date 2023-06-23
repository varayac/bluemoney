const https = require('https')
const fs = require('fs')
// Recibir por la línea de comando
const [, , nombreArchivo, extensionArchivo, divisa, cantidad] = process.argv

// Concatenar nombre de archivo y extencion
const nombreArchivoExtension = (archivo, extension) => `${archivo}.${extension}`
// console.log(nombreArchivoExtension(nombreArchivo, extensionArchivo))

// Consultar API
const obtenerDatos = (divisa, cantidad) => {
  const URL_BASE = 'https://mindicador.cl/api'

  //   const valores = await https.get(URL_BASE, (res) => {
  https.get(URL_BASE, (res) => {
    res
      .on('data', (data) => {
        const newData = JSON.parse(data)

        if (!Object.keys(newData).includes(divisa)) {
          throw new Error('Divisa no encontrada')
        }
        const valor = cantidad / newData[`${divisa}`].valor
        //   return valor

        // Crea archivo
        fs.writeFile(
          nombreArchivoExtension(nombreArchivo, extensionArchivo),
          'A la fecha:' +
            Date() +
            '\n' +
            'Fue realizada cotización con los siguientes datos:' +
            '\n' +
            'Cantidad de pesos a convertir: ' +
            cantidad +
            '\n' +
            'Convertido a ' +
            divisa +
            'da un total de: ' +
            valor +
            '\n',
          'utf8',
          () => {
            console.log('Archivo creado con éxito')
          }
        )
        // lee archivo y muestra por consolsa
      })
      .on('error', (err) => {
        console.log(err.message)
      })
  })

  //   console.log(valores)
  //   return valores
}

console.log(obtenerDatos(divisa, cantidad))

// obtenerDatos(divisa, cantidad)
// .then((err, res) => {
//   if (err) {
//     console.log(err.message)
//   }
//   console.log(res)
// })

// const main = async () => {
//   const result = await obtenerDatos(divisa, cantidad)
//   console.log(result)
//   return result
// }

// main()
// console.log(obtenerDatos(divisa, cantidad))

// console.log(nombreArchivo)
// console.log(extensionArchivo)
// console.log(divisa)
// console.log(cantidad)
