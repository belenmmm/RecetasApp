import { fireEvent, render, screen } from "@testing-library/react"
import { RecetaAdd } from "../../../src/recetas/components/RecetaAdd"

describe('Pruebas en <RecetaAdd />', () => { 

    test('debe de cambiar el valor de la caja de texto', () => { 

        render(<RecetaAdd onNewRecipe={ () => {} } />);
        const input = screen.getByPlaceholderText('nombre');

        fireEvent.input( input, { target: { value: 'chicken'}});

        expect(input.value).toBe('chicken');
        screen.debug();


    })

 })