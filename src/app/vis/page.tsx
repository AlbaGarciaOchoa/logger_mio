'use client'

import React, { useEffect, useState } from 'react';
import { VegaLite } from 'react-vega';

interface Data {
  measure: number[];
  year_: number[];
  municipality: number[];
  statistic: string[];
}

const UsersPage = ({ data }: { data: Data }) => {
  const [matrimoniosPorMunicipio, setMatrimoniosPorMunicipio] = useState([]);

  useEffect(() => {
    if (!data) return; // Verifica si los datos están definidos
  
    // Utilizamos reduce para acumular los totales de matrimonios por municipio
    const matrimoniosPorMunicipio = data.reduce((accumulator, { Municipality, Measure, Statistic }) => {
      if (Statistic === 'matrimonis') {
        // Si el municipio ya existe en el acumulador, sumamos la medida, de lo contrario, inicializamos con la medida
        accumulator[Municipality] = (accumulator[Municipality] || 0) + Measure;
      }
      return accumulator;
    }, {});
  
    // Convertimos el objeto en un array de objetos
    const datosParaGrafico = Object.entries(matrimoniosPorMunicipio).map(([Municipality, TotalMatrimonios]) => ({
      Municipality,
      TotalMatrimonios
    }));
  
    // Actualizamos el estado con los datos para el gráfico
    setMatrimoniosPorMunicipio(datosParaGrafico);
  }, [data]);
  

  const spec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "description": "Total de matrimonios por municipio",
    "data": {
      "values": matrimoniosPorMunicipio
    },
    "mark": "bar",
    "encoding": {
      "x": {"field": "Municipality", "type": "ordinal"},
      "y": {"field": "TotalMatrimonios", "type": "quantitative"}
    }
  };

  return (
    <div>
      <p>Visualización de Matrimonios por Municipio</p>
      <VegaLite spec={spec} />
    </div>
  );
};

export default UsersPage;


/*import React from 'react';
import { VegaLite } from 'react-vega';

export default function UsersPage() {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const barChartData = {
    values: [
      { category: 'A', amount: 28 },
      { category: 'B', amount: 55 },
      { category: 'C', amount: 43 },
      { category: 'D', amount: 91 },
      { category: 'E', amount: 81 },
      { category: 'F', amount: 53 },
      { category: 'G', amount: 19 },
      { category: 'H', amount: 87 },
    ],
  };

  const pieChartData = {
    values: [
      { origin: 'USA', cars: 10 },
      { origin: 'Europe', cars: 20 },
      { origin: 'Japan', cars: 15 },
    ],
  };

  const barChartSpec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "description": "A simple bar chart with embedded data.",
    "data": barChartData,
    "mark": "bar",
    "encoding": {
      "x": {"field": "category", "type": "ordinal"},
      "y": {"field": "amount", "type": "quantitative"}
    }
  };

  const pieChartSpec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "description": "A simple pie chart with embedded data.",
    "data": pieChartData,
    "mark": "arc",
    "encoding": {
      "theta": {"field": "cars", "type": "quantitative"},
      "color": {"field": "origin", "type": "nominal"}
    }
  };

  return (
    <div>
      <p>Visualitzacions</p>
      {isClient && (
        <>
          <VegaLite spec={barChartSpec} />
          <VegaLite spec={pieChartSpec} />
        </>
      )}
    </div>
  );
}*/



