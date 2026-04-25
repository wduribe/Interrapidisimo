import { useContext } from 'react';
import { OperativosContext, type OperativosContextProps } from '../context/OperativosContext';

export const useOperativosContext = (): OperativosContextProps => {

    const {state, dispatch} = useContext(OperativosContext);

    return {
        state,
        dispatch,
    }
}