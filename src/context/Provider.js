import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './context';

function Provider({ children }) {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchApiPlanets = async () => {
      const dataPlanet = await fetch('https://swapi-trybe.herokuapp.com/api/planets/')
        .then((response) => response.json())
        .then((item) => item.results);
      dataPlanet.forEach((planet) => delete planet.residents);
      const planeteSorted = dataPlanet.sort((a, b) => {
        if (a.name < b.name) {
          const NUMBER = -1;
          return NUMBER;
        }
        return true;
      });
      setData(planeteSorted);
      console.log(planeteSorted);
    };
    fetchApiPlanets();
  }, []);

  return (
    <Context.Provider
      value={ {
        data,
      } }
    >
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.any,
    ),
  ).isRequired,
};

export default Provider;
