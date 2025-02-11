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

const GradientDescent: React.FC = () => {
  const [func, setFunc] = useState<string>("sin(sqrt(x*y))");
  const [variables, setVariables] = useState<string[]>([]);
  const [initialPoint, setInitialPoint] = useState<Point>({ x: -2, y: -1 });
  const [alpha, setAlpha] = useState<number>(0.1);
  const [iterations, setIterations] = useState<number>(1);
  const [result, setResult] = useState<Point>({});

  useEffect(() => {
    const detectedVariables = new Set(func.match(/[a-zA-Z]+/g) || []);
    functions.forEach((f) => detectedVariables.delete(f));
    setVariables([...detectedVariables]);
    setInitialPoint(Object.fromEntries([...detectedVariables].map((v) => [v, -2])));
    setResult({});
  }, [func]);

  const computeGradient = (point: Point): Point => {
    const gradient: Point = {};
    variables.forEach((varName) => {
      try {
        const gradExpr = derivative(func, varName).toString();
        const gradValue = evaluate(gradExpr, point);
        gradient[varName] = gradValue;
      } catch (error) {
        console.error(`Error al calcular la derivada respecto a ${varName}:`, error);
        gradient[varName] = 0;
      }
    });
    return gradient;
  };

  const runGradientDescent = () => {
    let newPoint: Point = { ...initialPoint };

    for (let i = 0; i < iterations; i++) {
      const gradient = computeGradient(newPoint);

      variables.forEach((varName) => {
        newPoint[varName] -= alpha * gradient[varName];
      });
    }

    setResult(newPoint);
  };

  return (
    <div>
      <h2>Descenso del Gradiente</h2>
      <label>Función: </label>
      <input type="text" value={func} onChange={(e) => setFunc(e.target.value)} />
      <br />
      {variables.map((varName) => (
        <div key={varName}>
          <label>{`Punto inicial (${varName}): `}</label>
          <input
            type="number"
            value={initialPoint[varName]}
            onChange={(e) =>
              setInitialPoint({ ...initialPoint, [varName]: parseFloat(e.target.value) })
            }
          />
        </div>
      ))}
      <label>Tasa de Aprendizaje (α): </label>
      <input
        type="number"
        value={alpha}
        onChange={(e) => setAlpha(parseFloat(e.target.value))}
        step="0.01"
      />
      <br />
      <label>Iteraciones: </label>
      <input
        type="number"
        value={iterations}
        onChange={(e) => setIterations(parseInt(e.target.value))}
      />
      <br />
      <button onClick={runGradientDescent}>Calcular</button>
      <h3>Resultado después de {iterations} iteraciones:</h3>
      {variables.map((varName) => (
        <h3 key={varName}>
          {`${varName}: ${result[varName]?.toFixed(4) ?? "N/A"}`}
        </h3>
      ))}
    </div>
  );
};

export default GradientDescent;