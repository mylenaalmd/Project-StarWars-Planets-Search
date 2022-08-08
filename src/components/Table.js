import React, { useContext, useState } from 'react';
import context from '../context/context';

function Table() {
  const { data, addFiltros, removeFilters,
    filters, nameFilter, sorte,
    setFilter, fetchApiPlanets,
  } = useContext(context);
  const [name, setName] = useState('');
  const [comparison, setComparison] = useState('maior que');
  const [valueNumber, setValueNumber] = useState(0);
  const [column, setColumn] = useState('population');
  const [sort, setSort] = useState('ASC');
  const [sortC, setSortC] = useState('population');
  // const [remove, setRemove] = useState([]);
  const filter = {
    comparison,
    column,
    valueNumber,
  };
  const order = {
    sort,
    sortC,
  };

  const keyCheck = (key) => {
    if (key === 'name') {
      return 'planet-name';
    }
    return (key);
  };

  const arrayFiltros = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
  const util = filters.map((e) => e.column);
  const disponible = arrayFiltros.filter((e) => !util.includes(e));

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        value={ name }
        onChange={ ({ target: { value } }) => {
          setName(value);
          nameFilter(value);
        } }
      />

      {filters.length < arrayFiltros.length ? (
        <div>
          <select
            value={ column }
            data-testid="column-filter"
            onChange={ ({ target: { value } }) => setColumn(value) }
          >
            {
              disponible.map(
                (filtro, i) => (
                  <option
                    key={ i }
                    value={ filtro }
                  >
                    {filtro}
                  </option>
                ),
              )
            }
          </select>
          <select
            value={ comparison }
            onChange={ ({ target: { value } }) => setComparison(value) }
            data-testid="comparison-filter"
          >
            <option value="maior que">
              maior que
            </option>
            <option value="menor que">
              menor que
            </option>
            <option value="igual a">
              igual a
            </option>
          </select>
          <input
            type="number"
            data-testid="value-filter"
            value={ valueNumber }
            onChange={ ({ target: { value } }) => setValueNumber(value) }
          />
          <button
            type="button"
            data-testid="button-filter"
            onClick={ () => { addFiltros(filter); setColumn('population'); } }
          >
            adicionar filtros
          </button>
          <select
            value={ sortC }
            data-testid="column-sort"
            onChange={ ({ target: { value } }) => setSortC(value) }
          >
            {arrayFiltros.map((f, index) => (
              <option
                key={ index }
                value={ f }
              >
                {f}
              </option>
            ))}
          </select>
          <label htmlFor="asc">
            ascendente
            <input
              type="radio"
              data-testid="column-sort-input-asc"
              value="ASC"
              name="sort"
              id="asc"
              onClick={ ({ target }) => setSort(target.value) }
            />
          </label>
          <label htmlFor="desc">
            descendente
            <input
              type="radio"
              data-testid="column-sort-input-desc"
              value="DESC"
              name="sort"
              id="desc"
              onClick={ ({ target }) => setSort(target.value) }
            />
          </label>
          <button
            type="button"
            data-testid="column-sort-button"
            onClick={ () => sorte(order) }
          >
            ordenar por
          </button>
        </div>
      ) : false}

      <table>
        <tr>
          {
            data ? (
              Object.keys(data[0]).map((item, index) => <th key={ index }>{item}</th>)
            ) : false
          }
        </tr>
        {
          data ? (
            data.map((planet) => (
              <tr key={ planet.url }>
                { Object.keys(planet).map((key) => (
                  <td key={ key } data-testid={ keyCheck(key) }>{planet[key]}</td>
                ))}
              </tr>
            ))
          ) : false
        }
        {filters.length > 0 ? (
          <>
            {filters.map(
              (element) => (
                <li
                  key={ element.column }
                  data-testid="filter"
                >
                  {element.column}
                  <button
                    type="button"
                    onClick={ () => {
                      removeFilters(element);
                    } }
                  >
                    x
                  </button>
                </li>
              ),
            )}
            <button
              type="button"
              data-testid="button-remove-filters"
              onClick={ () => {
                setFilter([]);
                fetchApiPlanets();
              } }
            >
              remover todos os filtros
            </button>
          </>
        ) : false}
      </table>
    </div>
  );
}

export default Table;
