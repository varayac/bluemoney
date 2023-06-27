### Integrantes

Francisco Soto

Yoselyn Ximena Montecinos Montecinos

Victor Araya

María Jesús Díaz Salinas

Carolina Elena Salas Jara

Sebastián Alexis Zapata González

Linda Karol Fiedler Ithal

Juvenal Pacheco

Camila Belén Barrientos Sandoval

### Desafío - Cotiza con BlueMoney

Descripción:
La casa de cambios BlueMoney Spa está interesada en ofrecer una plataforma web por lo
que solicitó contratar a un desarrollador para la creación de una aplicación que calcule los
montos de las cotizaciones y registre las consultas en un archivo de texto usando el
siguiente template:
A la fecha: Thu Sep 03 2020 18:41:00 GMT-0400 (GMT-04:00)
Fue realizada cotización con los siguientes datos:
Cantidad de pesos a convertir: 250000 pesos
Convertido a "dólar" da un total de:
$324,06
Deberás construir una aplicación en Node que reciba los datos para la cotización por la línea
de comandos, como argumentos y consulte la API mindicador para los cálculos
correspondientes.

### Requerimientos

1. Recibir por la línea de comando los siguientes argumentos:
a. Nombre del archivo que se creará.
b. Extensión del archivo.
c. Indicador económico que se desea convertir.
d. Cantidad de pesos que se quiere cambiar.
2. Consultar la API con el módulo https y almacenar la respuesta en una variable.
3. Crear un archivo con el módulo fs cuyos datos están formados por los argumentos
recibidos por línea de comando y su contenido basado en el template de la
descripción.
4. Enviar por consola el contenido del archivo luego de que haya sido creado.
5. Ejecutar la aplicación desde un archivo externo con el módulo child_process
enviando los argumentos correspondientes y devolviendo por consola el contenido
del archivo luego de que haya sido creado.

