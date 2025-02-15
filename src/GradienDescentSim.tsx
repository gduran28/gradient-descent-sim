import React, { useState, useEffect } from "react";
import { evaluate, derivative } from "mathjs";
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import FunctionPlot from "./FunctionPlot"

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
  const [initialPointInput, setInitialPointInput] = useState<string>(`(${Object.values(initialPoint).join(", ")})`);

  useEffect(() => {
    const detectedVariables = new Set(func.match(/[a-zA-Z]+/g) || []);
    functions.forEach((f) => detectedVariables.delete(f));
    setVariables([...detectedVariables]);
  }, [func]);

  useEffect(() => {
    setInitialPointInput(`(${Object.values(initialPoint).join(", ")})`);
  }, [initialPoint]);

  const handlePointChange = (value: string) => {
    const newPoint = value.match(/-?\d+(\.\d+)?/g) || [];
    const newPointObj: Point = Object.fromEntries(variables.map((v, i) => [v, parseFloat(newPoint[i] || "0")]));

    setInitialPoint(newPointObj);
  }

  const handlePointInputChange = (value: string) => {
    setInitialPointInput(value);
  }

  const handleBlur = () => {
    handlePointChange(initialPointInput);
    setInitialPoint((prevPoint) => {
      const formattedPoint: Point = {};
      Object.keys(prevPoint).forEach((key) => {
        formattedPoint[key] = parseFloat(prevPoint[key].toFixed(4));
      });
      return formattedPoint;
    });
  }

  const runGradientDescent = () => {
    setResults([{}]);
    console.log("Running gradient descent...");
    console.log("Initial point:", initialPoint);
    console.log("Alpha:", alpha);
    console.log("Iterations:", iterations);
    console.log("Function:", func);
    console.log("Variables:", variables);
    if(!initialPoint.x || !initialPoint.y || !alpha || !iterations || !func || !variables) {
      return;
    }
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
          console.log(`gradiente respecto a ${varName}:`, gradValue);
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
    <div className="flex flex-col p-6 pt-10 md:p-12 md:pt-10 lg:p-24 lg:pt-10 space-y-6 justify-center items-center text-left">
      <h1 className="text-xl mb-10">Simulador del descenso del gradiente</h1>
      <div className="flex flex-col md:flex-row w-full space-y-6 md:space-y-0 md:space-x-6">
        {/* Form - takes 1/3 of the space */}
        <div className="w-full md:w-1/3 bg-black rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
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
              value={initialPointInput}
              onChange={(e) => handlePointInputChange(e.target.value)}
              onBlur={handleBlur}
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
          <div className="flex flex-col justify-center">
            <h2>Resultados:</h2>
            <div className="flex flex-col space-y-2 text-2xl">
              {results.map((result, i) => (
                <div key={i}>{`${i + 1}a iteración: `}{formatResult(result)}</div>
              ))}
            </div>
          </div>
          
        </div>
        {/* Plot - takes 2/3 of the space */}
        <div className="w-full md:w-2/3 h-[600px] mt-8 md:mt-0">
          <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={0.7} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
            <FunctionPlot func={func} results={Object.values(results)} />
            <OrbitControls />
          </Canvas>
        </div>
      </div>
    </div>
  )
}

export default GradientDescentSim;