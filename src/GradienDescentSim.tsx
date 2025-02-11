import React, { useState, useEffect } from "react";
import { evaluate, derivative } from "mathjs";

interface Point {
  [key: string]: number;
}

const functions = [
  "sin",
  "cos",
  "tan",
  "log",
  "sqrt",
  "abs",
  "exp",
  "ceil",
  "floor",
  "round",
  "sign",
  "max",
  "min",
  "pow",
  "atan",
  "acos",
  "asin",
  "acosh",
  "asinh",
  "atanh",
]

const GradientDescentSim: React.FC = () => {
  const [func, setFunc] = useState<string>("sin(sqrt(x*y))");
  const [variables, setVariables] = useState<string[]>([]);
  const [initialPoint, setInitialPoint] = useState<Point>({ x: -2, y: -1 });
  const [alpha, setAlpha] = useState<number>(0.1);
  const [iterations, setIterations] = useState<number>(1);
  const [results, setResults] = useState<Point[]>([{}]);

  useEffect(() => {
    const detectedVariables = new Set(func.match(/[a-zA-Z]+/g) || []);
    functions.forEach((f) => detectedVariables.delete(f));
    setVariables([...detectedVariables]);
  }, [func]);

  const handlePointChange = (value: string) => {
    const newPoint = value.match(/-?\d+(\.\d+)?/g) || [];
    const newPointObj: Point = Object.fromEntries(variables.map((v, i) => [v, parseFloat(newPoint[i] || "0")]));

    setInitialPoint(newPointObj);
  }

  const runGradientDescent = () => {
    setResults([{}]);
    console.log("Running gradient descent...");
    console.log("Initial point:", initialPoint);
    console.log("Alpha:", alpha);
    console.log("Iterations:", iterations);
    console.log("Function:", func);
    console.log("Variables:", variables);

    let res = { ...initialPoint };
    let newResults = [];

    var derivatives = variables.map((varName) => {
      return derivative(func, varName);
    })
    for (let i = 0; i < iterations; i++) {
      const gradients = variables.map((varName, i) => {
        try {
          const gradExpr = derivatives[i].toString();
          const gradValue = evaluate(gradExpr, res);
          console.log("punto", res);
          console.log(`Derivada respecto a ${varName}:`, gradValue);
          return gradValue;
        } catch (error) {
          console.error(`Error al calcular la derivada respecto a ${varName}:`, error);
          return 0;
        }
      });
      res = applyGradient(res, gradients);
      console.log(`Iteración ${i + 1}:`, res);
      newResults.push({ ...res });
    }
    setResults(newResults);
  }

  const applyGradient = (point: Point, gradients: number[]): Point => {
    let newPoint: Point = { ...point };
    variables.forEach((varName, i) => {
      newPoint[varName] -= alpha * gradients[i];
    });
    return newPoint;
  }

  const formatResult = (result: Point): string => {
    return `(${Object.values(result).map(value => value.toFixed(4)).join(", ")})`;
  }

  return (
    <div className="flex flex-col p-6 md:p-12 lg:p-24 space-y-6 justify-center items-center text-left">
      <h1 className="text-xl">Simulador del descenso del gradiente</h1>
      <div className="w-full bg-black rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
        {/* funcion f */}
        <div className="mb-4">
          <label htmlFor="func" className="block text-xl text-gray-300 mb-2">Función f(x, y):</label>
          <input
            id="func"
            type="text"
            value={func}
            onChange={(e) => setFunc(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* punto inicial */}
        <div className="mb-4">
          <label htmlFor="initialPoint" className="block text-xl text-gray-300 mb-2">Punto inicial:</label>
          <input
            id="initialPoint"
            type="text"
            value={`(${Object.values(initialPoint).join(", ")})`}
            onChange={(e) => handlePointChange(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* alpha */}
        <div className="mb-4">
          <label htmlFor="alpha" className="block text-xl text-gray-300 mb-2">Alpha:</label>
          <input
            id="alpha"
            type="number"
            value={alpha}
            onChange={(e) => setAlpha(parseFloat(e.target.value))}
            className="w-full px-3 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* iteraciones */}
        <div className="mb-6">
          <label htmlFor="iterations" className="block text-xl text-gray-300 mb-2">Iteraciones:</label>
          <input
            id="iterations"
            type="number"
            value={iterations}
            onChange={(e) => setIterations(parseInt(e.target.value))}
            className="w-full px-3 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* boton */}
        <button
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 mb-4"
          onClick={() => runGradientDescent()}>Ejecutar</button>

        {/* resultado */}
        <div className="flex flex-col">
          <h2>Resultados:</h2>
          <div className="flex flex-col space-y-2 text-3xl">
            {results.map((result, i) => (
              <div key={i}>{`${i + 1}a iteración: `}{formatResult(result)}</div>
            ))}
          </div>
        </div>
        
      </div>

    </div>
  )
}

export default GradientDescentSim;