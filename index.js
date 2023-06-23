const https = require('https')
const fs = require('fs')
const { rejects } = require('assert')
const { resolve } = require('path')
// Recibir por la línea de comando
const [, , nombreArchivo, extensionArchivo, divisa, cantidad] = process.argv

// Concatenar nombre de archivo y extencion
const nombreArchivoExtension = (archivo, extension) => `${archivo}.${extension}`
// console.log(nombreArchivoExtension(nombreArchivo, extensionArchivo))

// Consultar API
const obtenerDatos = (divisa, cantidad) => {
  const URL_BASE = 'https://mindicador.cl/api'
  // retorna una promesa
  return new Promise((resolve, reject) => {
    https.get(URL_BASE, (res) => {
      // usar end() en casos de mucha data
      res
        .on('data', (data) => {
          const newData = JSON.parse(data)

          if (!Object.keys(newData).includes(divisa)) {
            reject(new Error('Divisa no encontrada'))
          }
          const valor = cantidad / newData[`${divisa}`].valor
          resolve(valor)

          // Crea archivo --> Se debe colocar en otra funcion
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
        })
        .on('error', (err) => {
          console.log(err.message)
        })
    })
  })

  //   console.log(valores)
  //   return valores
}

console.log(obtenerDatos(divisa, cantidad))

// llamar a write file aqui

const main = async () => {
  try {
    const result = await obtenerDatos(divisa, cantidad)
    console.log(result)
  } catch (error) {
    console.log(error.message)
  }
}

main()
