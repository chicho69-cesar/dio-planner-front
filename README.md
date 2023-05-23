<p align="center">
  <img src="https://d33wubrfki0l68.cloudfront.net/554c3b0e09cf167f0281fda839a5433f2040b349/ecfc9/img/header_logo.svg"
  width="200" alt="Nest Logo" />
</p>

# Dio Planner

Aplicación móvil para la organización de eventos, fiestas, etc. La aplicacion esta desarrollada utilizando React Native, con Expo y el framework de componentes llamado Native Base.

## Como clonar el proyecto

Lo primero que se debe hacer es clonar el proyecto utilizando Git:

```bash
git clone https://github.com/chicho69-cesar/dio-planner.git
```

Despues instalamos las dependencias del proyecto, utilizando yarn de preferencia:

```bash
yarn
```

Despues debemos de tener las siguientes variables de entorno en el archivo `.env`:

```js
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
EXPO_CLIENT_ID=
IOS_CLIENT_ID=
ANDROID_CLIENT_ID=
WEB_CLIENT_ID=
CLIENT_ID=
```

Donde `AWS_ACCESS_KEY_ID` y `AWS_SECRET_ACCESS_KEY` consisten a un Bucket de AWS S3 para la cargar de imagenes en la nube. `EXPO_CLIENT_ID`, `IOS_CLIENT_ID`, `ANDROID_CLIENT_ID` y `WEB_CLIENT_ID` corresponden a un proyecto de Google Cloud con servicios de autenticacion habilitadas. Por ultimo `CLIENT_ID` es el id de una aplicacion de Facebook developers para la autenticacion con Facebook.

Para finalizar, solamente se inicia el proyecto y se prueba la aplicacion, teniendo en cuenta que debe de estar funcionando o corriendo el Back-End echo con `Go`, el cual se puede encontrar en el repositorio <https://github.com/chicho69-cesar/dio-planner-back>, si el servidor esta funcionando incializamos la app con:

```bash
yarn start
```
