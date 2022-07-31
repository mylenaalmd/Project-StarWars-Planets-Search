import React, { useContext } from 'react';
import context from '../context/context';

function Table() {
  const { data } = useContext(context);

  return (
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
                <td key={ key }>{planet[key]}</td>
              ))}

            </tr>
          ))
        ) : false
      }
    </table>
  );
}

export default Table;
