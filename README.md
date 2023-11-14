# Websocket

## Contenido

1. [Instalacion](#instalacion)
2. [Comandos](#comandos)  
    - [Dependencias](#instalar-dependencias)  
    - [Servidor](#servidor)  
    - [Token de acceso](#generar-token-de-acceso)
3. [Configuracion](#configuracion-de-acceso)
    - [Acceso](#acceso)
    - [Conexion](#conexion)
4. [Eventos](#eventos)
    - [Eventos predeterminados](#eventos-predeterminados)
5. [Comunicacion](#comunicacion)
    - [Envio de datos](#envio-de-datos)
***

## Instalacion

### Clonar Repositorio

- Via SSH   

```sh
git clone git@gitlab.com:dbaraltg/ws-server-helga.git
```  

- Via HTTPS  

```sh
git clone https://gitlab.com/dbaraltg/ws-server-helga.git
```
***
## Servidor

### Instalar dependencias

```sh
npm i
```  

### Iniciar servidor local

```sh
npm start
```  

### Generar token de acceso

```sh
npm run key [identificador]
```

- Ejemplo  

> npm run key app1
***
## Configuracion

### Acceso

- El identificador de aplicacion que se proporcione al generar un [token de acceso](#generar-token-de-acceso) debe estar registrado en  

    - app/ConnectionHelper.js: 7  

    ```javascript
    const AllowedClients = [
      "app1"
    ];
    ```

    - Ejemplo

    > npm run key tu_token  

    ```javascript
    const AllowedClients = [
      "app1",
      "tu_token"
    ];
    ```

### Conexion

- Una ves se inicie el [servidor](#servidor), se podra conectar a traves de  
> ws://[host]?token=[token]

- Ejemplo  
> ws://localhost:6001?token=tu_token_de_acceso

#### Notas  

- El identificador de acceso se usa para retornar datos hacia los usuarios conectados con este mismo identificador
- Para mantener la conexion activa, el servidor cuenta con el [evento](#eventos) ping, el cual no recibe datos y envia el mismo hacia el cliente
***

## Eventos

Cada evento recibe 2 parametros
- Client  
Conexion activa en el servidor de la que se reciben los eventos  

- Data  
Datos enviados a traves de la conexion

### Eventos predeterminados

- message  
Este evento recibe y envia datos hacia todos los clientes conectados con mismo [identificador de aplicacion](#acceso)  
```json
{
  "event": "message",
  "data": {}
}
```

- ping  
Este evento no recibe datos y se envia a si mismo al cliente que lo emitio  
```json
{
  "event": "ping",
  "data": null
}
```
***

## Comunicacion

### Envio de datos:

Para enviar datos primero se debe establecer la [conexion](#conexion) al servidor.  
Los datos enviados deben ser de tipo *string* en formato json  
- Se debe tener en cuenta la siguiente estructura para el correcto envio de datos:  
```
"{'event': '[evento a ejecutar]','data': {} }"
```
- Ejemplos  
> "{'event': 'ping','data': null }"  
> "{'event': 'message','data': {'id':1, 'text': 'example'} }"  

#### Notas
- En caso de usar nuevos [eventos](#eventos), estos deben ser registrados en
    - app/EventHandler.js: 5

    ```javascript
    const EventRouter = {
      ping: EmitTo,
      message: Emit,
    }
    ```

    - Ejemplo

    ```javascript
    const EventRouter = {
      ping: EmitTo,
      message: Emit,
      eventoNuevo: funcionNueva,
    }

    function funcionNueva(client, data){
      //Logica de tu funcion
    }
    ```
- Las funciones de evento deben recibir solo 2 parametros. [Evento](#eventos)  