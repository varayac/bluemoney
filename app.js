const https = require('https')
const fs = require('fs')

// Recibir por línea de comando
const [, , nombreArchivo, extensionArchivo, divisa, cantidad] = process.argv
// Concatenar nombre de archivo y extensión
const nombreArchivoExtension = (archivo, extension) => `${archivo}.${extension}`

// Consultar API
const obtenerDatos = (divisa, cantidad) => {
  const URL_BASE = 'https://mindicador.cl/api'
  return new Promise((resolve, reject) => {
    https.get(URL_BASE, (res) => {
      res
        .on('data', (data) => {
          const newData = JSON.parse(data)
          resolve({ newData, divisa, cantidad })
        })
        .on('error', (err) => {
          reject(err.message)
        })
    })
  })
}

// Transformar divisa
const calcularDivisa = (newData, divisa, cantidad) => {
  return new Promise((resolve, reject) => {
    if (!Object.keys(newData).includes(divisa)) {
      reject(new Error('Divisa no encontrada'))
    }

    const valor = cantidad / newData[divisa].valor
    resolve(valor)

    //  let valor = 0
    //  if (divisa == 'dolar') {
    //    valor = cantidad / newData[divisa].valor
    //  }

    //  console.log(valor)
  })
}

// Crear cotización
const crearCotizacion = (archivo, ext, divisa, cantidad, valor) => {
  fs.writeFile(
    `${nombreArchivoExtension(archivo, ext)}`,
    `A la fecha: ${Date()} \n` +
      `Fue realizada cotización con los siguientes datos: \n` +
      `Cantidad de pesos a convertir: $${cantidad} pesos \n` +
      `Convertido a '${divisa}' da un total de: ${valor.toFixed(2)}`,
    'utf8',
    () => {
      console.log(`Archivo ${nombreArchivoExtension(archivo, ext)} creado con éxito`)
    }
  )
}

const main = async () => {
  try {
    const { newData } = await obtenerDatos()
    const valor = await calcularDivisa(newData, divisa, cantidad)
    crearCotizacion(nombreArchivo, extensionArchivo, divisa, cantidad, valor)
    //  crearCotizacion = (archivo, ext, divisa, cantidad, valor)
  } catch (error) {
    console.log(error.message)
  }
}

main()
