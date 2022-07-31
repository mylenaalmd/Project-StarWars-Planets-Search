// import { useState, useEffect } from 'react';

// function useFetch() {
//   const [dataUrl, setDataUrl] = useState('https://swapi-trybe.herokuapp.com/api/planets/');

//   useEffect(() => {
//     const fetchApi = async () => {
//       const { results } = await fetch(dataUrl).then((response) => response.json());
//       // const retorno = results.map((array) => array
//       // .filter((item) => item !== 'residents'));
//       setDataUrl(results);
//       console.log(results);
//     };
//     if (dataUrl) { fetchApi(); }
//   }, []);

//   return [dataUrl];
// }

// // const retorno = Object.keys(results).filter((item) => item !== 'residents');
// // return retorno;
// export default useFetch;
