# Estándar de código Cypress:

Un estándar de código es un conjunto de reglas y convenciones que ayudan a mantener un código limpio, legible y de calidad.

Estas reglas pueden abarcar aspectos como la estructura del proyecto, la nomenclatura de variables y funciones, el estilo de escritura del código, la organización de las pruebas, la gestión de aserciones, entre otros.

Al establecer un estándar de código para Cypress, se busca promover la coherencia en el código escrito por diferentes miembros del equipo, facilitar la colaboración y comprensión del código, y mejorar la mantenibilidad y escalabilidad de las pruebas.


## Estructura del proyecto:

Define cómo organizar los archivos y carpetas de tu proyecto de Cypress para facilitar la 
navegación y la localización de las pruebas.

### Archivos del proyecto:

En Cypress se tiene una carpeta main llamada 'cypress', y de esa carpeta descienden 4 mas:

- fixtures: Contiene datos estáticos que pueden ser utilizados para los tests.

- integration: Lugar donde colocaremos los tests.
- plugins: Permiten acceder, modificar o ampliar el comportamiento interno de cypress.
- support: Donde se colocaran comportamientos reutilizables, como comandos personalizados o anulaciones globales, que estarán disponibles para todos los tests.

### Nomenclatura:

Establece convenciones para nombrar archivos, funciones, variables y elementos de prueba de manera consistente y descriptiva.

- En el caso de que el framework soporte varios lenguajes, decidir cual se va a utilizar (en este caso js o ts).

- Todos los archivos deberan nombrarse en minusculas. 

- En el caso de tener varias palabras, la separación será con guion bajo.

- La extensión será de .cy.js o .cy.ts (ejemplo: test_cypress.cy.ts).

### Estilo de escritura del código:

Define reglas para la indentación, el espaciado, la longitud de línea, el uso de comillas, entre otros aspectos, para mantener un estilo de código coherente y legible.

### Gestión de aserciones: 

Define cómo gestionar las aserciones en tus pruebas, como el uso de los métodos should, expect u otros, y cómo estructurar y organizar las aserciones para que sean claras y fáciles de entender.

### Manejo de esperas:

Establece cómo manejar las esperas en tus pruebas, utilizando comandos como cy.wait, cy.should, cy.get(...).should, para asegurarte de que tus pruebas esperen correctamente a que se produzcan ciertos eventos o 
condiciones.


### Comentarios y documentación:

Define pautas sobre cómo agregar comentarios y documentación en tus pruebas para 
explicar la intención, el propósito y el funcionamiento del código.

## Buenas practicas:

### Organizacion de tests, Logging In, Control de estado:

- Anti-Patrón: Compartir objetos de página, utilizar la interfaz de usuario para iniciar sesión y no utilizar atajos.

- Buenas Prácticas: Probar especificaciones de forma aislada, iniciar sesión en tu aplicación de manera programática y tomar el control del estado de tu aplicación.

### Seleccionar elementos:


- Anti-Patrón: Utilizar selectores altamente frágiles que están sujetos a cambios.

- Buenas Prácticas: Utilizar atributos data-* para proporcionar contexto a tus selectores y aislarlos de cambios en CSS o JS.

Como crear un elemento en html:

``` html
<button
  id="main"
  class="btn btn-large"
  name="submission"
  role="button"
  data-test="submit"
>
  Submit
</button> 

```
Como seleccionarlo:

``` javascript

cy.get('[data-test="submit"]').click()


```

### Asignando valores de retorno:


- Anti-Patrón: Intentar asignar el valor de retorno de los comandos con const, let o var.

- Buenas Prácticas: Utilizar alias y closures para acceder y almacenar lo que los comandos te devuelven.

``` javascript

// NO HAGAS, ESTO NO FUNCIONA
const a = cy.get('a')

cy.visit('https://example.cypress.io')

// Falla
a.first().click()

// Hacer esto en vez de lo anterior.
cy.get('a').as('links')
cy.get('@links').first().click()


```

### Tener tests que dependen del estado de tests anteriores

- Anti-Patrón: Acoplar múltiples pruebas entre sí.

- Buenas Prácticas: Las pruebas siempre deben poder ejecutarse de forma independiente entre sí y aún así pasar exitosamente.

### Crear "pequeñas" pruebas con una única aserción

- Anti-Patrón: Actuar como si estuvieras escribiendo pruebas unitarias.

-  Mejores Prácticas: Agregar múltiples aserciones y no preocuparte por ello.

No hagas esto:
``` javascript

describe('my form', () => {
  beforeEach(() => {
    cy.visit('/users/new')
    cy.get('[data-testid="first-name"]').type('johnny')
  })

  it('has validation attr', () => {
    cy.get('[data-testid="first-name"]').should(
      'have.attr',
      'data-validation',
      'required'
    )
  })

  it('has active class', () => {
    cy.get('[data-testid="first-name"]').should('have.class', 'active')
  })

  it('has formatted first name', () => {
    cy.get('[data-testid="first-name"]')
      .should('have.value', 'Johnny')
  })
})

```

Hacerlo asi:

``` javascript

describe('my form', () => {
  beforeEach(() => {
    cy.visit('/users/new')
  })

  it('validates and formats first name', () => {
    cy.get('[data-testid="first-name"]')
      .type('johnny')
      .should('have.attr', 'data-validation', 'required')
      .and('have.class', 'active')
      .and('have.value', 'Johnny')
  })
})

```

### Usar after Or afterEach Hooks:

- Anti-Patrón: Utilizar los ganchos "after" o "afterEach" para limpiar el estado.

- Mejores Prácticas: Limpiar el estado antes de que se ejecuten las pruebas.

### Establecer una baseUrl Global:

- Anti-Patrón: Utilizar cy.visit() sin establecer un baseUrl.

- Mejores Prácticas: Establecer un baseUrl en la configuración de Cypress.