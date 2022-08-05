import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './context';

function Provider({ children }) {
  const [data, setData] = useState();
  const [filters, setFilter] = useState([]);
  const [retornoApi, setRetornoApi] = useState('https://swapi-trybe.herokuapp.com/api/planets/');

  const fetchApiPlanets = async () => {
    const dataPlanet = await fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json())
      .then((item) => item.results);
    dataPlanet.forEach((planet) => delete planet.residents);
    const planetsSorted = dataPlanet.sort((a, b) => {
      if (a.name < b.name) {
        const NUMBER = -1;
        return NUMBER;
      }
      return true;
    });
    setData(planetsSorted);
    console.log(planetsSorted);
  };

  useEffect(() => {
    fetchApiPlanets();
  }, []);

  const sorte = ({ sort, sortC }) => {
    const planets = data.filter((planet) => planet[sortC] !== 'unknown');
    const planetsDefault = data.filter((planet) => planet[sortC] === 'unknown');

    if (sort === 'ASC') {
      const planetsSorted = planets.sort((a, b) => a[sortC] - b[sortC]);
      const dataSorted = [...planetsSorted, ...planetsDefault];
      setData(dataSorted);
    } else {
      const planetsSorted = planets.sort((a, b) => b[sortC] - a[sortC]);
      const dataSorted = [...planetsSorted, ...planetsDefault];
      setData(dataSorted);
    }
  };

  const nameFilter = (value) => {
    const planets = data.filter((planet) => planet.name.includes(value));
    if (planets.length > 0) { setData(planets); }
    if (value.length < 1) { fetchApiPlanets(); }
  };

  const addFiltros = (addFilter) => {
    setFilter([...filters, addFilter]);
    setData(data.filter((item) => item[addFilter.column] !== 'unknown'));
    switch (addFilter.comparison) {
    case 'maior que':
      setData(
        data.filter((item) => parseInt(
          item[addFilter.column], 10,
        ) > addFilter.valueNumber),
      );
      break;
    case 'menor que':
      setData(
        data.filter((item) => parseInt(
          item[addFilter.column], 10,
        ) < addFilter.valueNumber),
      );
      break;
    default:
      setData(
        data.filter(
          (item) => parseInt(
            item[addFilter.column], 10,
          ) === parseInt(addFilter.valueNumber, 10),
        ),
      );
    }
  };

  const removeFilters = (filt) => {
    const newFilters = filters.filter((item) => item !== filt);
    console.log(newFilters);
    setRetornoApi().then((e) => {
      newFilters.forEach((f) => {
        setData(e.filter((planet) => planet[f.column] !== 'unknown'));
        switch (f.comparison) {
        case 'maior que':
          setData(
            e.filter((planet) => parseInt(planet[f.column], 10) > f.valueNumber),
          );
          break;
        case 'menor que':
          setData(
            e.filter((planet) => parseInt(planet[f.column], 10) < f.valueNumber),
          );
          break;
        default:
          setData(
            e.filter((planet) => parseInt(
              planet[f.column], 10,
            ) === parseInt(f.valueNumber, 10)),
          );
        }
      });
    });
  };

  return (
    <Context.Provider
      value={ {
        data,
        filters,
        setFilter,
        fetchApiPlanets,
        nameFilter,
        addFiltros,
        sorte,
        removeFilters,
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
