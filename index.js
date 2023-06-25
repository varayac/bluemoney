// const { spawn } = require('child_process')

// const child = spawn('pwd')

// child.stdout
//   .on('data', (d) => {
//     console.log('child stdout: ', d.toString())
//   })
//   .on('message', (men) => {
//     console.log('algo:', men)
//   })

// child.on('exit', (code, signal) => {
//   console.log('child process exited with ' + `code ${code} and signal ${signal}`)
// })

const child_process = require('child_process');
const [, , nombreArchivo, extensionArchivo, divisa, cantidad] = process.argv
const nombreArchivoExtension = (archivo, extension) => `${archivo}.${extension}`


function ejecutar(archivo, nombreArchivo, divisa, cantidad) {
    return new Promise((resolve) => {
        child_process.exec(`node ${archivo} ${nombreArchivo} ${divisa} ${cantidad}`, (err, result) => {
            resolve(result);
            console.log('resultado :>> ', result);
        })  });
}

    ; (async () => {
        await ejecutar('app.js', nombreArchivoExtension(nombreArchivo, extensionArchivo), divisa, cantidad);
    })();