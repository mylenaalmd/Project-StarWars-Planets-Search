import React from 'react';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import App from '../App';
import testData from '../../cypress/mocks/testData'
import userEvent from '@testing-library/user-event';

// test('I am your test', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/Hello, App!/i);
//   expect(linkElement).toBeInTheDocument();
// });

describe('Teste da aplicação', () => {
    beforeEach(()=>{
      jest.spyOn(global, 'fetch')
      global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue(testData),
      });
    })

    afterEach(() => {
      jest.clearAllMocks();
    })

    it('teste de filtro pelo nome', async() => {
      render(<App />);
      const nameFilter = screen.getByTestId('name-filter');
      const tatooine = await screen.findByText('Tatooine');
      fireEvent.change(nameFilter, {target: {value: 'b'}});
      await waitFor(()=> expect(tatooine).not.toBeInTheDocument())
      fireEvent.change(nameFilter, {target: {value: ''}});
      expect(fetch).toBeCalledTimes(2)
    })

    it('inputs e bottons estam sendo rederizados', () =>{
      render(<App />);
      const buttonFilter= screen.getByTestId('button-filter');
      const nameFilter = screen.getByTestId('name-filter');
      expect(buttonFilter).toBeInTheDocument();
      expect(nameFilter).toBeInTheDocument();
    })
    it('teste se o planeta tatooine renderiza ', async() => {
      render(<App />);
      const tatooine = await screen.findByText('Tatooine')
      expect(tatooine).toBeInTheDocument();
      const buttonFilter= screen.getByTestId('button-filter');
      userEvent.click(buttonFilter);
      waitFor(() => expect(tatooine).not.toBeInTheDocument())
    })
    it('teste do filtro population sendo < 4000', async ()=> {
      render(<App />);
      const planeta = await screen.findAllByTestId('planet-name');
      const tatooine = await screen.findByText('Tatooine')
      expect(planeta.length).toBe(10);
      const addFilter = screen.getByRole('button', {name: /adicionar filtros/i});
      userEvent.selectOptions(
        screen.getByTestId('comparison-filter'),
        screen.getByRole('option', {name: 'menor que'}),
      )
      expect(screen.getByRole('option', {name: 'menor que'}).selected).toBe(true)
      fireEvent.change(screen.getByTestId('value-filter'), {target: {value: '4000'}});
      userEvent.click(addFilter);
      waitFor(() => expect(tatooine).not.toBeInTheDocument())
    })
    it('teste do filtro population sendo = 4000', async ()=> {
      render(<App />);
      const planeta = await screen.findAllByTestId('planet-name');
      const tatooine = await screen.findByText('Tatooine')
      expect(planeta.length).toBe(10);
      const addFilter = screen.getByRole('button', {name: /adicionar filtros/i});
      userEvent.selectOptions(
        screen.getByTestId('comparison-filter'),
        screen.getByRole('option', {name: 'igual a'}),
      )
      expect(screen.getByRole('option', {name: 'igual a'}).selected).toBe(true)
      fireEvent.change(screen.getByTestId('value-filter'), {target: {value: '4000'}});
      userEvent.click(addFilter);
      waitFor(() => expect(tatooine).not.toBeInTheDocument())
    })
    it('teste de ordem ascendente', async() => {
      render(<App />);
      await waitFor(()=> expect(screen.getAllByTestId('planet-name').length).toBe(10))
      const rowEndor = await screen.findByRole('row', {name: /endor/i});
      const endor = within(rowEndor).queryByTestId('planet-name');
      userEvent.selectOptions(
        screen.getByTestId('column-sort'),
        screen.getAllByRole('option', { name: 'diameter'})[1],
        );
        const ASC = screen.getByTestId('column-sort-input-asc');
        userEvent.click(ASC);
        const btnORDER = screen.getByRole('button', {name: /ordenar por/i});
        userEvent.click(btnORDER);
      await waitFor(() => expect(screen.getAllByTestId('planet-name').length).toBe(10))
      const rows = await screen.findAllByRole('row');
      const el =await within(rows[1]).findByTestId('planet-name');
      await waitFor(() => expect(within(screen.getAllByRole('row')[1])
      .getAllByTestId('planet-name')).toStrictEqual(el))
    })
    it('teste de ordem decrescente', async() => {
      render(<App />);
      await waitFor(()=> expect(screen.getAllByTestId('planet-name').length).toBe(10))
      const rowBespin = await screen.findByRole('row', {name: /bespin/i});
      const bespin = within(rowBespin).queryByTestId('planet-name');
      userEvent.selectOptions(
        screen.getByTestId('column-sort'),
        screen.getAllByRole('option', { name: 'diameter'})[1],
        );
        const DESC = screen.getByTestId('column-sort-input-desc');
        userEvent.click(DESC);
        const btnORDER = screen.getByRole('button', {name: /ordenar por/i});
        userEvent.click(btnORDER);
      await waitFor(() => expect(screen.getAllByTestId('planet-name').length).toBe(10))
      const rows = await screen.findAllByRole('row');
      const el =await within(rows[1]).findByTestId('planet-name');
      expect(el).toStrictEqual(bespin)
    })
    it('teste remover filtros', async ()=> {
      render(<App />)
      const addFilter = screen.getByRole('button', {name: /adicionar filtros/i});
      await waitFor(() => expect(screen.getAllByTestId('planet-name').length).toBe(10))
      userEvent.selectOptions(
        screen.getByTestId('comparison-filter'),
        screen.getByRole('option', {name: 'menor que'}),
        )
        fireEvent.change(screen.getByTestId('value-filter'), {target: {value: '2000000000'}});
        userEvent.click(addFilter);
        const removeFilters = await screen.findAllByRole('button', {name: /x/i});
      userEvent.click(removeFilters[0]);
      expect(fetch).toBeCalledTimes(1);
    })

  
  //   const columnHeader = await screen.findAllByRole('columnheader')
  //   const name = await screen.findByText('columnHeader', {name: /name/i})
  //   const hoth = await screen.findByText('Hoth')
  //   const valueFilter = screen.getByTestId('value-filter')

  //   expect(columnHeader).toHaveLength(13);
  //   expect(name).toBeInTheDocument();
  //   userEvent.click(buttonFilter);
  //   expect(hoth).not.toBeInTheDocument();
  //   userEvent.selectOptions(columnFilter, screen.getByRole('option', {name: /rotation_period/i}))
  //   userEvent.selectOptions(comparisonFilter, screen.getByRole('option', {name: 'maior que'}))
  //   userEvent.type(valueFilter, '500')
  //   userEvent.click(buttonFilter)
  // })

});