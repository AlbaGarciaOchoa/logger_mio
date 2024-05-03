'use client'

import React, { useState, useEffect } from 'react';

interface Data {
  measure: number[];
  year_: number[];
  municipality: number[];
  statistic: string[];
}

const MyComponent = () => {
  const [data, setData] = useState<Data>({ measure: [], year_: [], municipality: [], statistic: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = 'user';
        const password = 'gced012024';
        const url = 'http://147.83.46.71:6000/api/test_api';

        const headers = new Headers();
        headers.set('Authorization', 'Basic ' + btoa(username + ':' + password));

        const response = await fetch(url, {
          method: 'GET',
          headers: headers
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Data from Virtual Machine</h1>
      <ul>
        {data.measure.map((measure, index) => (
          <li key={index}>
            Municipality: {data.municipality[index]}, Measure: {measure}, Statistic: {data.statistic[index]}, Year: {data.year_[index]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyComponent;