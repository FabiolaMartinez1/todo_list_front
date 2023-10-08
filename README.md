# Proyecto Primer Parcial de Ingeniería del Software
Este es el repositorio para el proyecto del Primer Parcial de la asignatura de Ingeniería del Software, del estudiante: FAbiola Alejandra Martinez Acarapi. El objetivo de este proyecto es construir una aplicación web o móvil que permita el registro y gestión de tareas.

# Requerimientos del Proyecto
## Funcionalidades Principales
* Creación de Tareas

Los usuarios pueden crear nuevas tareas pendientes.
Cada tarea debe tener una fecha límite y una etiqueta para identificar su tipo (trabajo, casa, personal, etc.).

* Lista de Tareas

La aplicación debe mostrar una lista clara y ordenada de todas las tareas pendientes del usuario.
Debe mostrar la fecha límite, la etiqueta y el estado de la tarea (completada o pendiente).

* Completar Tareas

Los usuarios pueden marcar una tarea como completada y se debe registrar la fecha y hora de la acción.
Opcional: incluir una opción para archivar tareas completadas.

* Seguridad

La aplicación debe tener medidas de seguridad para proteger los datos del usuario.
Debe implementar autenticación con usuario y contraseña.

* Gestión de Etiquetas

Los usuarios pueden crear, modificar y actualizar etiquetas (únicamente una etiqueta).


# Frontend

## Configuración del Proyecto

### Instala todas las dependencias necesarias para el proyecto.

```
npm install
```

### Compilar y recargar en caliente para desarrollo - Desarrollo Local
Compila el proyecto y proporciona un servidor local de desarrollo con recarga en caliente.

```
npm run serve
```

### Compilar y minimizar para producción
(No utilizado todavía)

Prepara el proyecto para la producción.

```
npm run build
```

### Verificación y Corrección de Archivos
(No utilizado todavía)

Revisa y corrige errores y problemas de estilo en tu código.

```
npm run lint
```

### Configuración personalizada
Consulta la [Referencia de Configuración](https://cli.vuejs.org/config/).

## Solución de Problemas

Si te encuentras con un error como "`vue-cli-service` no se reconoce como un comando interno o externo...", asegúrate de tener Vue CLI instalado globalmente en tu sistema. Puedes instalarlo ejecutando:

´´´
npm install -g @vue/cli o npm install
´´´

Después de instalar Vue CLI, intenta ejecutar `npm run serve` nuevamente.

Si el problema persiste, verifica si tienes un archivo llamado `vue.config.js` en el directorio raíz de tu proyecto. Si no lo tienes, créalo y asegúrate de incluir lo siguiente:

```javascript
module.exports = {
  runtimeCompiler: true
}
