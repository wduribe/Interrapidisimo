import type { IngresoOperativoCarguePayload, IngresoOperativoCargueStateReducer, DespachoOperativoCargueForm as DespachoOperativoCargueFormPayload, IngresoOperativoDescarguePayload, OperativoDescargueStateReducer, UrbanoCargueStateReducer, IngresoUrbanoCarguePayload, DespachoUrbanoCargueForm, IngresoUrbanoDescarguePayload, UrbanoDescargueStateReducer } from '../interfaces/interfaces';

export interface OperativosState {
    carguesNacionales: IngresoOperativoCargueStateReducer,
    descarguesNacionales: OperativoDescargueStateReducer,
    carguesRegionales: IngresoOperativoCargueStateReducer,
    descarguesRegionales: OperativoDescargueStateReducer,
    carguesUrbanos: UrbanoCargueStateReducer,
    descarguesUrbanos: UrbanoDescargueStateReducer,
    filtro: { [key: string]: any }
}

export const initialState: OperativosState = {
    carguesNacionales: JSON.parse(localStorage.getItem('carguesNacionales') ?? '[]'),
    descarguesNacionales: JSON.parse(localStorage.getItem('descarguesNacionales') ?? '[]'),
    carguesRegionales: JSON.parse(localStorage.getItem('carguesRegionales') ?? '[]'),
    descarguesRegionales: JSON.parse(localStorage.getItem('descarguesRegionales') ?? '[]'),
    carguesUrbanos: JSON.parse(localStorage.getItem('carguesUrbanos') ?? '[]'),
    descarguesUrbanos: JSON.parse(localStorage.getItem('descarguesUrbanos') ?? '[]'),
    filtro: {
        operativo: '',
    },
}

export type OperativosActions =
    { type: 'ingreso-nacional-cargue', payload: { cargueNacional: IngresoOperativoCarguePayload } } |
    { type: 'despacho-nacional-cargue', payload: { despachoNacionalCargue: DespachoOperativoCargueFormPayload, operativoId: string } } |

    { type: 'ingreso-nacional-descargue', payload: { descargueNacional: IngresoOperativoDescarguePayload } } |
    { type: 'asignar-muelle-descargue-nacional', payload: { id: string, muelleDescargue: string } } |
    { type: 'despacho-nacional-sin-carga', payload: { id: string, novedad: string } } |
    { type: 'despacho-nacional-con-carga', payload: { id: string, novedad: string, fechaHoraSalida: string } } |
    { type: 'ingreso-regional-cargue', payload: { cargueRegional: IngresoOperativoCarguePayload } } |
    { type: 'despacho-regional-cargue', payload: { despachoRegionalCargue: DespachoOperativoCargueFormPayload, operativoId: string } } |
    { type: 'ingreso-regional-descargue', payload: { descargueRegional: IngresoOperativoDescarguePayload } } |
    { type: 'asignar-muelle-descargue-regional', payload: { id: string, muelleDescargue: string } } |
    { type: 'despacho-regional-sin-carga', payload: { id: string, novedad: string } } |
    { type: 'despacho-regional-con-carga', payload: { id: string, novedad: string, fechaHoraSalida: string } } |
    { type: 'ingreso-urbano-cargue', payload: { cargueUrbano: IngresoUrbanoCarguePayload } } |
    { type: 'asignar-muelle-cargue-urbano', payload: { id: string, muelleCargue: string } } |
    { type: 'despacho-urbano-con-carga', payload: { id: string, form: DespachoUrbanoCargueForm } } |
    { type: 'ingreso-urbano-descargue', payload: { descargueUrbano: IngresoUrbanoDescarguePayload } } |
    { type: 'asignar-muelle-descargue-urbano', payload: { id: string, muelleDescargue: string } } |
    { type: 'despacho-urbano-sin-carga', payload: { id: string, novedad: string } } |
    { type: 'filtrar', payload: { fecha: number | string, operativo: string, objetivo: string } }


export const operativosReducer = (state: OperativosState, action: OperativosActions) => {

    switch (action.type) {

        case 'ingreso-nacional-cargue':
            return { ...state, carguesNacionales: [...state.carguesNacionales, action.payload.cargueNacional] };

        case 'despacho-nacional-cargue':
            return {
                ...state, carguesNacionales: state.carguesNacionales.map(nacional => {
                    if (nacional.id === action.payload.operativoId) {
                        nacional.enBodega = false;
                        return { ...nacional, ...action.payload.despachoNacionalCargue }
                    }
                    return nacional;
                })
            }

        case 'ingreso-nacional-descargue':
            return { ...state, descarguesNacionales: [...state.descarguesNacionales, action.payload.descargueNacional] }

        case 'asignar-muelle-descargue-nacional':
            return {
                ...state, descarguesNacionales: state.descarguesNacionales.map(nacional => {
                    if (nacional.id === action.payload.id) {
                        nacional.muelleDescargue = action.payload.muelleDescargue;
                        return nacional;
                    }
                    return nacional;
                })
            }

        case 'despacho-nacional-sin-carga':
            return {
                ...state, descarguesNacionales: state.descarguesNacionales.map(nacional => {
                    if (nacional.id === action.payload.id) {
                        nacional.fechaHoraSalida = new Date().toLocaleString('es-CO');
                        nacional.novedad = action.payload.novedad;
                        nacional.enBodega = false;
                        return nacional;
                    }
                    return nacional;
                })
            };

        case 'despacho-nacional-con-carga':
            return {
                ...state,
                descarguesNacionales: state.descarguesNacionales.map(nacional => {
                    if (nacional.id === action.payload.id) {
                        nacional.novedad = action.payload.novedad;
                        nacional.enBodega = false;
                        nacional.fechaHoraSalida = action.payload.fechaHoraSalida;
                        return nacional;
                    }
                    return nacional;
                })
            }

        //* Dispatch regionales    

        case 'ingreso-regional-cargue':
            return { ...state, carguesRegionales: [...state.carguesRegionales, action.payload.cargueRegional] };

        case 'despacho-regional-cargue':
            return {
                ...state, carguesRegionales: state.carguesRegionales.map(regional => {
                    if (regional.id === action.payload.operativoId) {
                        regional.enBodega = false;
                        return { ...regional, ...action.payload.despachoRegionalCargue }
                    }
                    return regional;
                })
            }


        case 'ingreso-regional-descargue':
            return { ...state, descarguesRegionales: [...state.descarguesRegionales, action.payload.descargueRegional] }

        case 'asignar-muelle-descargue-regional':
            return {
                ...state, descarguesRegionales: state.descarguesRegionales.map(regional => {
                    if (regional.id === action.payload.id) {
                        regional.muelleDescargue = action.payload.muelleDescargue;
                        return regional;
                    }
                    return regional;
                })
            }

        case 'despacho-regional-sin-carga':
            return {
                ...state, descarguesRegionales: state.descarguesRegionales.map(regional => {
                    if (regional.id === action.payload.id) {
                        regional.fechaHoraSalida = new Date().toLocaleString('es-CO');
                        regional.novedad = action.payload.novedad;
                        regional.enBodega = false;
                        return regional;
                    }
                    return regional;
                })
            };

        case 'despacho-regional-con-carga':
            return {
                ...state,
                descarguesRegionales: state.descarguesRegionales.map(regional => {
                    if (regional.id === action.payload.id) {
                        regional.novedad = action.payload.novedad;
                        regional.enBodega = false;
                        regional.fechaHoraSalida = action.payload.fechaHoraSalida;
                        return regional;
                    }
                    return regional;
                })
            }

        //* Dispatch urbanos    

        case 'ingreso-urbano-cargue':
            return { ...state, carguesUrbanos: [...state.carguesUrbanos, action.payload.cargueUrbano] };

        case 'asignar-muelle-cargue-urbano':
            return {
                ...state, carguesUrbanos: state.carguesUrbanos.map(urbano => {
                    if (urbano.id === action.payload.id) {
                        urbano.muelleCargue = action.payload.muelleCargue;
                        return urbano;
                    }
                    return urbano;
                })
            }

        case 'despacho-urbano-con-carga':
            return {
                ...state, carguesUrbanos: state.carguesUrbanos.map(urbano => {
                    if (urbano.id === action.payload.id) {
                        urbano.enBodega = false;
                        urbano.fechaHoraSalida = new Date().toLocaleString('es-CO');
                        return { ...urbano, ...action.payload.form };
                    }
                    return urbano;
                })
            }

        case 'ingreso-urbano-descargue':
            return { ...state, descarguesUrbanos: [...state.descarguesUrbanos, action.payload.descargueUrbano] };

        case 'asignar-muelle-descargue-urbano':
            return {
                ...state, descarguesUrbanos: state.descarguesUrbanos.map(urbano => {
                    if (urbano.id === action.payload.id) {
                        urbano.muelleDescargue = action.payload.muelleDescargue;
                        return urbano;
                    }
                    return urbano;
                })
            }

        case 'despacho-urbano-sin-carga':
            return {
                ...state, descarguesUrbanos: state.descarguesUrbanos.map(urbano => {
                    if (urbano.id === action.payload.id) {
                        urbano.fechaHoraSalida = new Date().toLocaleString('es-CO');
                        urbano.novedad = action.payload.novedad;
                        urbano.enBodega = false;
                        return urbano;
                    }
                    return urbano;
                })
            };

        case 'filtrar':
            return { ...state, filtro: { ...state.filtro, ...action.payload } }

        default: return state;
    }



}