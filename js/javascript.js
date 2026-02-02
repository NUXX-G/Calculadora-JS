// Variables globales
let numeroActual = '0';
let numeroAnterior = null;
let operadorActivo = null;
let resultadoMostrado = false;

/**
 * @brief Deshabilita el botn del punto decimal en la calculadora.
 *
 * Cambia el estado del botón para evitar que el usuario introduzca múltiples puntos decimales en un mismo número. 
 * Además, actualiza su clase CSS para reflejar visualmente que está deshabilitado.
 *
 */
function deshabilitarPunto() 
{
    const botonPunto = document.getElementById('btnPunto');
    botonPunto.disabled = true;
}

/**
 * @brief Habilita nuevamente el botón del punto decimal en la calculadora.
 *
 * Esta función restaura la capacidad de usar el punto decimal, normalmente después de haber introducido una operación o un número válido.
 * Además, actualiza su clase CSS para reflejar visualmente que está activo.
 *
 */
function habilitarPunto() 
{
    const botonPunto = document.getElementById('btnPunto');
    botonPunto.disabled = false;
}

/**
 * @brief Actualiza el contenido mostrado en la pantalla de la calculadora.
 *
 * Esta función se encarga de mostrar en la pantalla el número con el que se opera, aplicando controles para evitar desbordamientos visuales o resultados demasiado largos.
 *
 * - Si el número supera los 12 caracteres o no es finito, se redondea a 12 dígitos.
 * - Si el resultado redondeado es un número entero, elimina la parte decimal.
 * - Si tiene decimales, elimina ceros innecesarios al final.
 * - Si el número es corto y válido, se muestra tal cual.
 *
 */
function actualizarPantalla() 
{
    const pantalla = document.querySelector('#pantalla p');
    let valorMostrar = numeroActual;
    
    // Si el número es muy largo o no es finito
    if (valorMostrar.length > 12 || !isFinite(parseFloat(valorMostrar))) 
    {
        if (valorMostrar !== 'Error') 
        {
            let num = parseFloat(valorMostrar);
            if (isFinite(num)) 
            {
                // Redondear a 12 dígitos significativos
                valorMostrar = num.toPrecision(12);
                // Convertir a número y luego a string para eliminar notación científica si es posible
                num = parseFloat(valorMostrar);
                valorMostrar = num.toString();
                
                // Si aún es muy largo, truncar
                if (valorMostrar.length > 12) 
                {
                    valorMostrar = valorMostrar.substring(0, 12);
                }
            }
        }
    }
    
    // Eliminar ceros innecesarios al final de decimales
    if (valorMostrar.includes('.') && valorMostrar !== 'Error') 
    {
        valorMostrar = valorMostrar.replace(/\.?0+$/, '');
    }
    
    pantalla.textContent = valorMostrar;
}

/**
 * @brief Muestra un número en la pantalla gestionando correctamente la entrada.
 *
 * Esta función controla la lógica al introducir un dígito en la calculadora:
 *
 * - Si previamente se ha mostrado un resultado de una operación, se inicia una nueva entrada reemplazando el valor actual por el número pulsado.
 * - Si el valor actual es 0, se sustituye por el nuevo número pulsado para evitar acumulación de ceros a la izquierda.
 * - En cualquier otro caso permite formar números de varias cifras.
 *
 * @param {string} numero - El dígito que el usuario ha pulsado (0–9).
 *
 */
function mostrarNumeroPantalla(numero) 
{
    // Si se mostro un resultado, empezar numero nuevo
    if (resultadoMostrado) 
    {
        numeroActual = numero;
        resultadoMostrado = false;
        pantallaColorNormal();
        habilitarPunto();
    } 
    // Si el numero actual es 0, reemplazarlo
    else if (numeroActual === '0') 
    {
        numeroActual = numero;
    } 
    // Si no hemos llegado al limite de 12 caracteres
    else if (numeroActual.length < 12)
    {
        numeroActual += numero;
    }
    
    actualizarPantalla();
}

/**
 * @brief Agrega un punto decimal a la pantalla de la calculadora.
 *
 * Comprueba si ya se ha mostrado un resultado o si el número actual no contiene un punto.
 * Si corresponde, agrega un punto y actualiza la pantalla.
 * Deshabilita el botón de punto para evitar múltiples decimales.
 */
function mostrarPuntoPantalla() 
{
    // Si se mostro un resultado, empezar con 0.
    if (resultadoMostrado) 
    {
        numeroActual = '0.';
        resultadoMostrado = false;
        pantallaColorNormal();
    } 
    // Si no hay punto ya, agregarlo
    else if (!numeroActual.includes('.'))
    {
        numeroActual += '.';
    }
    
    deshabilitarPunto();
    actualizarPantalla();
}

/**
 * @brief Gestiona de forma correcta la operación matemática que hemos seleccionado (suma, resta, multiplicación, división).
 * 
 * Esta función gestiona la operación matemática seleccionada asegurando que:
 *
 * - Se guarda la operación matemática seleccionada para luego aplicarla.
 * - Se guarda el número que había escrito en la pantalla.
 * - Se resetea la pantalla volviendo a poner el número a 0.
 *
 */
function manejarOperador(operador) 
{
    // Si ya habia un operador activo, calcular primero
    if (operadorActivo !== null && !resultadoMostrado) 
    {
        calcularOperacion();
    }
    
    // Guardar el numero actual y el operador
    numeroAnterior = parseFloat(numeroActual);
    operadorActivo = operador;
    resultadoMostrado = true;
    habilitarPunto();
}

/**
 * @brief Realiza la operación matemática indicada por el operador almacenado.
 *
 * Esta función toma los valores de los números seleccionados por el usuario, aplica el operador seleccionado y muestra el resultado en pantalla.
 * Gestiona también el caso especial de división entre cero, mostrando "Error".
 *
 */
function calcularOperacion() 
{
    if (operadorActivo === null || numeroAnterior === null) 
    {
        return;
    }
    
    const num1 = numeroAnterior;
    const num2 = parseFloat(numeroActual);
    let resultado;
    
    switch (operadorActivo) 
    {
        case '+':
            resultado = num1 + num2;
            break;
        case '-':
            resultado = num1 - num2;
            break;
        case 'x':
            resultado = num1 * num2;
            break;
        case '/':
            if (num2 === 0) 
            {
                numeroActual = 'Error';
                const pantalla = document.getElementById('pantalla');
                pantalla.className = 'pantalla pantalla-error';
                resultadoMostrado = true;
                operadorActivo = null;
                numeroAnterior = null;
                actualizarPantalla();
                return;
            }
            resultado = num1 / num2;
            break;
    }
    
    numeroActual = resultado.toString();
    aplicarColorResultado(operadorActivo);
    resultadoMostrado = true;
    numeroAnterior = null;
    operadorActivo = null;
    actualizarPantalla();
}

/**
 * @brief Restaura el color por defecto de la pantalla de la calculadora.
 *
 * Establece la clase CSS correspondiente al estado visual normal de la pantalla.
 *
 */
function pantallaColorNormal() 
{
    const pantalla = document.getElementById('pantalla');
    pantalla.className = 'pantalla pantalla-normal';
}

/**
 * @brief Borra el número introducido actualmente en la pantalla.
 *
 * Restablece la entrada actual a 0.
 *
 */
function borrarEntrada() 
{
    numeroActual = '0';
    resultadoMostrado = false;
    habilitarPunto();
    pantallaColorNormal();
    actualizarPantalla();
}

/**
 * @brief Restablece completamente la calculadora a su estado inicial.
 *
 * Reinicia todos los valores almacenados, incluidos el número actual, el número anterior, el operador activo y el indicador de resultado mostrado.
 * También actualiza la pantalla, restaura el color normal y habilita el punto decimal.
 *
 */
function borrarTodo() 
{
    numeroActual = '0';
    numeroAnterior = null;
    operadorActivo = null;
    resultadoMostrado = false;
    habilitarPunto();
    pantallaColorNormal();
    actualizarPantalla();
}

/**
 * @brief Elimina el último carácter del número mostrado en pantalla.
 *
 * Gestiona el borrado dígito a dígito. Si se había mostrado un resultado previo reinicia la pantalla a 0. Si se elimina un punto decimal, vuelve a habilitarse que se pueda seleccionar.
 * Cuando solo queda un carácter, la pantalla vuelve a mostrar 0.
 *
 */
function retroceder() 
{
    // Si se mostro un resultado, resetear a 0
    if (resultadoMostrado) 
    {
        numeroActual = '0';
        resultadoMostrado = false;
        pantallaColorNormal();
        habilitarPunto();
    } 
    // Si hay mas de un caracter, eliminar el ultimo
    else if (numeroActual.length > 1) 
    {
        // Si el ultimo caracter es un punto, habilitar el boton de punto
        if (numeroActual[numeroActual.length - 1] === '.')
        {
            habilitarPunto();
        }
        numeroActual = numeroActual.slice(0, -1);
    } 
    // Si solo queda un caracter, poner 0
    else 
    {
        numeroActual = '0';
        habilitarPunto();
    }
    
    actualizarPantalla();
}

/**
 * @brief Realiza operaciones inmediatas sobre el número mostrado.
 *
 * Soporta las siguientes operaciones:
 * - Inverso (1/x)
 * - Cuadrado (x²)
 * - Raíz cuadrada (√x)
 *
 * Gestiona errores como división entre cero o raíz cuadrada de un número negativo, mostrando "Error" en pantalla y cambiando el color de la misma.
 *
 * @param {string} operacion - La operación a realizar: 'inverso', 'cuadrado' o 'raiz'.
 *
 */
function operacionInmediata(operacion)
{
    const num = parseFloat(numeroActual);
    let resultado;
    
    switch (operacion) 
    {
        case 'inverso':
            if (num === 0) 
            {
                numeroActual = 'Error';
                const pantalla = document.getElementById('pantalla');
                pantalla.className = 'pantalla pantalla-error';
                resultadoMostrado = true;
                actualizarPantalla();
                return;
            }
            resultado = 1 / num;
            break;
            
        case 'cuadrado':
            resultado = num * num;
            break;
            
        case 'raiz':
            if (num < 0) 
            {
                numeroActual = 'Error';
                const pantalla = document.getElementById('pantalla');
                pantalla.className = 'pantalla pantalla-error';
                resultadoMostrado = true;
                actualizarPantalla();
                return;
            }
            resultado = Math.sqrt(num);
            break;
    }
    
    numeroActual = resultado.toString();
    aplicarColorResultado(operacion);
    resultadoMostrado = true;
    actualizarPantalla();
}

/**
 * @brief Aplica un color específico a la pantalla según la operación realizada.
 *
 * Cambia la clase CSS de la pantalla para reflejar visualmente el tipo de operación que se acaba de ejecutar, tanto para operaciones binarias (+, -, ×, /) como operaciones inmediatas (inverso, cuadrado, raíz).
 *
 * @param {string} operador - Operación realizada: '+', '-', '×', '/', 'inverso', 'cuadrado', 'raiz'.
 *
 */
function aplicarColorResultado(operador) 
{
    const pantalla = document.getElementById('pantalla');
    
    switch (operador) 
    {
        case '+':
            pantalla.className = 'pantalla pantalla-suma';
            break;
        case '-':
            pantalla.className = 'pantalla pantalla-resta';
            break;
        case 'x':
            pantalla.className = 'pantalla pantalla-multiplicacion';
            break;
        case '/':
            pantalla.className = 'pantalla pantalla-division';
            break;
        case 'inverso':
            pantalla.className = 'pantalla pantalla-inverso';
            break;
        case 'cuadrado':
            pantalla.className = 'pantalla pantalla-cuadrado';
            break;
        case 'raiz':
            pantalla.className = 'pantalla pantalla-raiz';
            break;
    }
}



/**
 * Event listener que detecta las teclas presionadas.
 * 
 * Teclas soportadas:
 * - 0-9: Números
 * - .: Punto decimal
 * - +: Suma
 * - -: Resta
 * - * o x: Multiplicación
 * - /: División
 * - Enter o =: Calcular resultado
 * - Backspace: Retroceso
 * - c: Borrar todo
 * - i: Inverso
 * - s: Cuadrado
 * - r: Raíz cuadrada
 */
document.addEventListener('keydown', function(event) 
{
    const tecla = event.key.toLowerCase();
    
    // Numeros del 0 al 9
    if (tecla >= '0' && tecla <= '9') 
    {
        mostrarNumeroPantalla(tecla);
    }
    // Punto decimal
    else if (tecla === '.') 
    {
        const botonPunto = document.getElementById('btnPunto');
        if (!botonPunto.disabled) {
            mostrarPuntoPantalla();
        }
    }
    // Operadores
    else if (tecla === '+') 
    {
        manejarOperador('+');
    }
    else if (tecla === '-') 
    {
        manejarOperador('-');
    }
    else if (tecla === '*' || tecla === 'x') 
    {
        manejarOperador('x');
    }
    else if (tecla === '/') 
    {
        event.preventDefault(); // Evitar busqueda rapida en navegadores
        manejarOperador('/');
    }
    // Igual
    else if (tecla === 'enter' || tecla === '=') 
    {
        calcularOperacion();
    }
    // Retroceso
    else if (tecla === 'backspace') 
    {
        retroceder();
    }
    // Borrar todo
    else if (tecla === 'c') 
    {
        borrarTodo();
    }
    // Operaciones inmediatas
    else if (tecla === 'i') 
    {
        operacionInmediata('inverso');
    }
    else if (tecla === 's') 
    {
        operacionInmediata('cuadrado');
    }
    else if (tecla === 'r') 
    {
        operacionInmediata('raiz');
    }
});