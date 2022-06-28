# Prueba técnica

Para su realización he separado el back del front en proyectos distintos, aunque bajo un mismo repositorio de código. 

- chuck-back: Apis. Utilizando ruby 3.0.0 y Rails 7.0.3
- chuck-front: Frontal web. Sin framework, usando bootstrap 5 como librería.

Para ejecutar la aplicación encontraremos, en el raiz, un fichero docker-compose. Al lanzar `docker-compose up` levantará 2 contenedores:
- Back para acceso a los apis. Instala las dependencias y arranca el proceso.
- Servidor nginx con la build del front.

Tras ello podremos navegar hacia `0.0.0.0` para encontrar la aplicación. Alternativamente, podremos acceder a través de `chuck-facts.local` si lo añadimos a nuestro fichero de hosts.



## Sobre el back

He intentado adaptar una arquitectura hexagonal a la codificación en ruby. Como sabéis, no había tocado nada de este lenguaje hasta esta prueba técnica, así que he tenido que bucear mucho en internet para conseguir lo que quería.

He dividido la aplicación en dos módulos, `categories` y `facts`. 
- En el primero se trata el caso de uso de recuperar las diferentes categorías por las que se puede realizar una búsqueda.
- En el segundo tenemos los casos de uso derivados de las búsquedas en sí.

En `chuck-back/app/controllers` encontraréis un directorio por cada módulo. También encontraréis un directorio por módulo en `chuck-back/app/services`, además de un `shared` donde hay código compartido. 
Cada módulo dentro de `services` sigue la misma estructura de directorios: 
- `application`: Aquí encontraremos los casos de uso. Cada uno en un subdirectorio distinto.
- `domain`: Modelos de dominio, excepciones.
- `infrastructure`