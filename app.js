const https = require('https')
const fs = require('fs')

// Recibir datos por línea de comando
//const [, , archivo, extension, tipoDivisa, cantidadPesos] = process.argv
const [, , nombreArchivo, tipoDivisa, cantidadPesos] = process.argv
const pesos = Number(cantidadPesos)

// Concatenar nombre de archivo y extensión
//const nombreArchivo = (archivo, ext) => `${archivo}.${ext}`

// Consultar API
const obtenerDatos = () => {
  const URL_BASE = 'https://mindicador.cl/api'
  return new Promise((resolve, reject) => {
    https.get(URL_BASE, (res) => {
      res
        .on('data', (data) => {
          const dataObtenida = JSON.parse(data)
          resolve(dataObtenida)
        })
        .on('error', (err) => {
          reject(err.message)
        })
    })
  })
}

// Transformar divisa
const calcularDivisa = (dataObtenida) => {
  return new Promise((resolve, reject) => {
    if (!Object.keys(dataObtenida).includes(tipoDivisa)) {
      reject(new Error('Divisa no encontrada'))
    }

    // Monto en CLP / Tasa de cambio = Monto en en otra moneda.
    const valorConversion = pesos / dataObtenida[tipoDivisa].valor
    resolve(valorConversion)
  })
}

// Crear cotización
const crearCotizacion = (totalConversion) => {
  fs.writeFile(
    //`${nombreArchivo(archivo, extension)}`,
    `${nombreArchivo}`,
    `A la fecha: ${Date()} \n` +
      `Fue realizada cotización con los siguientes datos: \n` +
      `Cantidad de pesos a convertir: $${pesos.toLocaleString('ES-cl')} pesos \n` +
      `Convertido a '${tipoDivisa}' da un total de: ${totalConversion.toFixed(2)}`,
    'utf8',
    () => {
      //console.log(`Archivo ${nombreArchivo(archivo, extension)} creado con éxito`)
      console.log(`Archivo ${nombreArchivo} creado con éxito`)
    }
  )
}

const crearRespaldoHistorico = () => {
  fs.writeFile(``)
}

// LEER ARCHIVO
const leerArchivo = () => {
  return new Promise((resolv, reject) => {
    fs.readFile(nombreArchivo, 'utf8', (err, data) => {
      if (err) {
        reject('Error al leer archivo')
      }
      resolv(data)
    })
  })
}

const main = async () => {
  try {
    const dataObtenida = await obtenerDatos()
    const totalConversion = await calcularDivisa(dataObtenida)
    crearCotizacion(totalConversion)
    const respuesta = await leerArchivo()
    console.log(respuesta)
  } catch (error) {
    console.log(error.message)
  }
}

main()
