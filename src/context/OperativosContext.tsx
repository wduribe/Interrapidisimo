import { createContext, type Dispatch } from 'react';
import type { OperativosActions, OperativosState } from '../reducer/operativos.reducer';


export interface OperativosContextProps {
    state: OperativosState,
    dispatch: Dispatch<OperativosActions>,
}

export const OperativosContext = createContext({} as OperativosContextProps );