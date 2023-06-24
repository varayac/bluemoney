const https = require('https')
const fs = require('fs')

// Recibir por línea de comando
const [, , archivo, extension, tipoDivisa, cantidadPesos] = process.argv
// Concatenar nombre de archivo y extensión
const nombreArchivo = (archivo, ext) => `${archivo}.${ext}`

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

    const valorConversion = cantidadPesos / dataObtenida[tipoDivisa].valor
    resolve(valorConversion)

    /* let valor = 0
     if (divisa == 'dolar') {
       valor = cantidad / newData[divisa].valor
     }

     console.log(valor) */
  })
}

// Crear cotización
const crearCotizacion = (totalConversion) => {
  fs.writeFile(
    `${nombreArchivo(archivo, extension)}`,
    `A la fecha: ${Date()} \n` +
      `Fue realizada cotización con los siguientes datos: \n` +
      `Cantidad de pesos a convertir: $${cantidadPesos} pesos \n` +
      `Convertido a '${tipoDivisa}' da un total de: ${totalConversion.toFixed(2)}`,
    'utf8',
    () => {
      console.log(`Archivo ${nombreArchivo(archivo, extension)} creado con éxito`)
    }
  )
}

// LEER ARCHIVO

const main = async () => {
  try {
    const dataObtenida = await obtenerDatos()
    const totalConversion = await calcularDivisa(dataObtenida)
    crearCotizacion(totalConversion)
  } catch (error) {
    console.log(error.message)
  }
}

main()
