# Prueba técnica

Para su realización he separado el back del front en proyectos distintos, aunque bajo un mismo repositorio de código. 

- chuck-back: Apis. Utilizando ruby 3.0.0 y Rails 7.0.3
- chuck-front: Frontal web. Sin framework, usando bootstrap 5 como librería.

Para ejecutar la aplicación encontraremos, en el raiz, un fichero docker-compose. Al lanzar `docker-compose up` levantará 2 contenedores:
- Back para acceso a los apis. Instala las dependencias y arranca el proceso.
- Servidor nginx con la build del front.

Tras ello podremos navegar hacia `0.0.0.0` para encontrar la aplicación. Alternativamente, podremos acceder a través de `chuck-facts.local` si lo añadimos a nuestro fichero de hosts.

En el directorio screenshots se pueden encontrar las capturas de pantalla de la aplicación en ejecución.


## Sobre el back

He intentado adaptar una arquitectura hexagonal a la codificación en ruby. Como sabéis, no había tocado nada de este lenguaje hasta esta prueba técnica, así que he tenido que bucear mucho en internet para conseguir lo que quería.

He dividido la aplicación en dos módulos, `categories` y `facts`. 
- En el primero se trata el caso de uso de recuperar las diferentes categorías por las que se puede realizar una búsqueda.
- En el segundo tenemos los casos de uso derivados de las búsquedas en sí.

En `chuck-back/app/controllers` encontraréis un directorio por cada módulo. También encontraréis un directorio por módulo en `chuck-back/app/services`, además de un `shared` donde hay código compartido. 
Cada módulo dentro de `services` sigue la misma estructura de directorios: 
- `application`: Aquí encontraremos los casos de uso. Cada uno en un subdirectorio distinto.
- `domain`: Modelos de dominio, excepciones.
- `infrastructure`: Conexiones hacia el exterior: Base de datos, http, envío de correo...

El flujo normal de una llamada a uno de los endpoints sería: 
- El controller recibe la petición e invoca a la clase que resuelve el caso de uso.
- Para construir el caso de uso tenemos un factory que inyectará las dependencias necesarias. De esta manera si queremos, por ejemplo, cambiar la implementación del repositorio de categorias para que tire de bbdd solo debemos hacer que el factory lo instancie y lo inyecte.
- El caso de uso utilizará los elementos que considere necesarios para realizar su labor (repositorio (bbdd, http...), notificador (email, mensajería...)) y devuelve la respuesta al controller.
- Tras cada búsqueda se dispara una notificación asíncrona que recibe el listener encargado de almacenarla en bbdd.

Los endpoints disponibles son:
- '/api//v1/categories' => Listado de categorías
- '/api//v1/facts/random' => Fact aleatorio
- '/api//v1/facts/by_category/:category' => Fact por categoría
- '/api//v1/facts?keyword=' => Buscador de facts por palabras
- '/api//v1/facts/:id/notify' => Enviar una búsqueda al correo

He creado un test de cada tipo a modo de ejemplo: Unitario, infraestructura e integración. Estarían disponibles en:
- `chuck-back/controller/categories`
- `chuck-back/services/categories/application`
- `chuck-back/services/categories/infrastructure`

## Sobre el front

Como decía, únicamente he utilizado vanilla js y bootstrap 5. Sin frameworks adicionales.
En el fichero package.json podemos encontrar las dependencias declaradas así como las tareas npm que se pueden ejecutar.

Toda la aplicación cuelga de app.js. Desde ahí se incluyen y construyen el resto de los componentes que necesita para funcionar.
