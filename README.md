
# Calculadora

Proyecto de una calculadora web desarrollado como parte de la asignatura **Lenguajes de Marcas y Sistemas de Gestión de la Información**, correspondiente a la **Unidad Didáctica 03**, del ciclo formativo **C.F.G.S. Desarrollo de Aplicaciones Multiplataforma**.

## Descripción del proyecto

La aplicación consiste en una calculadora funcional desarrollada mediante **HTML, CSS y JavaScript**, que reproduce el comportamiento de una calculadora estándar. El proyecto cumple estrictamente con los requisitos funcionales, visuales y estructurales especificados en el enunciado de la práctica.

La calculadora permite realizar operaciones básicas, operaciones inmediatas, gestión de errores y presenta una interfaz visual clara, coherente y adaptada a cada tipo de operación.

---

## Funcionalidades

### Visualización y entrada de datos

* Pantalla de visualización para mostrar números y resultados.
* Longitud máxima de 12 dígitos entre parte entera y decimal.
* Introducción correcta de números decimales, permitiendo un único punto por número.
* Botón de retroceso que elimina los dígitos de forma progresiva.
* Al eliminar todos los caracteres, la pantalla vuelve a mostrar el valor 0.

### Operaciones básicas

* Suma (+)
* Resta (-)
* Multiplicación (×)
* División (/)
* Uso del botón igual (=) para finalizar las operaciones.

### Operaciones inmediatas

* Cálculo del inverso (1/x).
* Cálculo del cuadrado (x²).
* Cálculo de la raíz cuadrada (√x).

### Gestión de errores

La calculadora muestra el mensaje **“Error”** y cambia el color del texto de la pantalla en los siguientes casos:

* División entre cero.
* Cálculo de la raíz cuadrada de un número negativo.
* Cálculo del inverso de cero.

### Cambios visuales según la operación

* El color del número mostrado en la pantalla cambia según la operación realizada.
* Cada operación dispone de un color específico definido mediante estilos CSS.
* Los errores se muestran en color rojo.
* Al introducir un nuevo número tras una operación, la pantalla recupera el color normal.

---

## Uso mediante teclado (opcional)

La calculadora puede utilizarse mediante el teclado del sistema, asignando las siguientes teclas a sus funciones:

| Tecla     | Función                 |
| --------- | ----------------------- |
| 0–9       | Introducción de números |
| .         | Punto decimal           |
| +         | Suma                    |
| -         | Resta                   |
| * o x     | Multiplicación          |
| Enter o = | Igual                   |
| Backspace | Retroceso               |
| c         | Borrar todo             |
| i         | Inverso                 |
| s         | Cuadrado                |
| r         | Raíz cuadrada           |

---

## Diseño y estilos

* Interfaz visual fiel a las especificaciones del enunciado.
* Uso de colores personalizados para cada tipo de operación.
* Fuente **Segment7Standard** para la cabecera y la pantalla de la calculadora.
* Diseño centrado con bordes redondeados, sombras y efectos hover en los botones.
* Botones deshabilitados con opacidad reducida y cursor no permitido.

---

## Estructura del proyecto

```
calculadora/
│── index.html
│── css/
│   └── styles.css
│── js/
│   └── script.js
│── recursos/
│   └── calculator-icon-windows-v1.ico
└── README.md
```

* El archivo JavaScript se importa al final del cuerpo del documento HTML.
* El favicon utilizado corresponde al archivo `calculator-icon-windows-v1.ico`.

---

## Pie de página

El pie de página de la aplicación incluye:

* El texto correspondiente al ejercicio y la asignatura.
* El nombre del autor junto con una declaración explícita de no haber utilizado herramientas de inteligencia artificial, tal como se indica en el enunciado de la práctica.

---

## Autor

Nelson Filipe Fardilha Karlsson
C.F.G.S. Desarrollo de Aplicaciones Multiplataforma
