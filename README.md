# Gradient Descent Simulator

## Descripción

**Gradient Descent Simulator** es una aplicación interactiva que simula el algoritmo de **descenso del gradiente** en tiempo real. El algoritmo de descenso del gradiente es una técnica de optimización utilizada en machine learning y problemas de optimización matemática. La aplicación permite ingresar una función matemática, especificar las variables y calcular las actualizaciones de los valores de dichas variables en cada iteración, basadas en el gradiente de la función.

La aplicación permite a los usuarios ver cómo una función se optimiza mediante el descenso del gradiente y es útil para entender cómo este algoritmo trabaja, especialmente en problemas de machine learning y redes neuronales.

## Campos de la Aplicación

1. **Función (Function)**  
   - **Descripción**: Permite ingresar la función matemática que se desea optimizar. La función puede contener variables, operaciones matemáticas como `sin`, `cos`, `sqrt`, entre otras.  
   - **Ejemplo**: `sin((x * y)^(1/2))`.

2. **Puntos Iniciales (Initial Points)**  
   - **Descripción**: Define los puntos iniciales de las variables en el espacio de la función. Se debe ingresar un valor inicial para cada variable utilizada en la función.  
   - **Ejemplo**: Si las variables son `x` y `y`, puedes establecer el valor de `x = -2` y `y = -1`.

3. **Tasa de Aprendizaje (Learning Rate)**  
   - **Descripción**: El parámetro \( \alpha \) (tasa de aprendizaje) determina el tamaño del paso a dar en cada iteración del algoritmo de descenso del gradiente. Valores más pequeños hacen que el proceso sea más lento, pero más preciso, mientras que valores más grandes pueden acelerar el proceso, pero también correr el riesgo de no converger.  
   - **Ejemplo**: `0.1`.

4. **Iteraciones (Iterations)**  
   - **Descripción**: Define cuántas iteraciones se ejecutará el algoritmo de descenso del gradiente. En cada iteración, el valor de cada variable será actualizado basándose en su gradiente.  
   - **Ejemplo**: `10` iteraciones.

5. **Resultado (Result)**  
   - **Descripción**: Después de ejecutar el algoritmo durante las iteraciones especificadas, se mostrarán los valores finales de las variables optimizadas.  
   - **Ejemplo**: Después de 10 iteraciones, los valores de `x` y `y` se actualizarán para acercarse al mínimo de la función.

## Funcionamiento

1. El usuario ingresa una función matemática en el campo de texto.
2. Define los puntos iniciales de las variables que aparecerán en la función.
3. Establece la tasa de aprendizaje y el número de iteraciones.
4. Al hacer clic en el botón "Calcular", el algoritmo realiza las iteraciones de descenso del gradiente, actualizando los valores de las variables en cada paso.
5. Los valores finales de las variables después de las iteraciones se muestran en la interfaz.

## Instalación
**Usamos bun como runtime, el proyecto es compatible con node y npm, usa sus comandos de ser necesario.**

1. Clona este repositorio:

  ```bash
  git clone https://github.com/tu-usuario/gradient-descent-simulator.git
  ```
2. Instala las dependencias:
   
  ```bash
  cd gradient-descent-simulator
  bun install
  ```
3. Ejecuta la aplicación:
   
  ```bash
  bun run dev
  ```
4. Navega a: http://localhost:5173/

## Tecnologías Usadas
- React: Biblioteca para construir la interfaz de usuario.
- mathjs: Librería de matemáticas para la evaluación de expresiones algebraicas y cálculo de derivadas.
- TypeScript: Lenguaje de programación para mejorar la calidad del código con tipado estático
