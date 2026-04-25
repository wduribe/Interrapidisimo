import { useEffect, useReducer, type JSX } from 'react';
import { OperativosContext } from './OperativosContext';
import { initialState, operativosReducer } from '../reducer/operativos.reducer';

const { Provider } = OperativosContext;

interface OperativosProviderProps {
    children: JSX.Element | JSX.Element[],
}

export const OperativosProvider = ({ children }: OperativosProviderProps) => {

    const [state, dispatch] = useReducer(operativosReducer, initialState);

    useEffect(() => {
        localStorage.setItem('carguesNacionales', JSON.stringify(state.carguesNacionales))
    }, [state.carguesNacionales]);

    useEffect(() => {
        localStorage.setItem('descarguesNacionales', JSON.stringify(state.descarguesNacionales))
    }, [state.descarguesNacionales]);

    useEffect(() => {
        localStorage.setItem('carguesRegionales', JSON.stringify(state.carguesRegionales))
    }, [state.carguesRegionales]);

    useEffect(() => {
        localStorage.setItem('descarguesRegionales', JSON.stringify(state.descarguesRegionales))
    }, [state.descarguesRegionales]);

    useEffect(() => {
        localStorage.setItem('carguesUrbanos', JSON.stringify(state.carguesUrbanos))
    }, [state.carguesUrbanos]);

    useEffect(() => {
        localStorage.setItem('descarguesUrbanos', JSON.stringify(state.descarguesUrbanos))
    }, [state.descarguesUrbanos]);

    return (
        <Provider
            value={{
                state,
                dispatch,
            }}
        >
            {children}
        </Provider>
    );
}