import { useOperativosContext } from '../hooks/useOperativosContext';
import { HistorialDescargueNacionalItem } from './nacional/descargue/HistorialDescargueNacionalItem';
import { HistorialCargueNacionalItem } from './nacional/cargue/HistorialCargueNacionalItem';
import { HistorialCargueRegionalItem } from './regional/cargue/HistorialCargueRegionalItem';
import { HistorialDescargueRegionalItem } from './regional/descargue/HistorialDescargueRegionalItem';
import { HistorialCargueUrbanoItem } from './urbano/cargue/HistorialCargueUrbanoItem';
import { HistorialDescargueUrbanoItem } from './urbano/descargue/HistorialDescargueUrbanoItem';


export const HistorialItems = () => {

    const { state } = useOperativosContext();
    // console.log(state.filtro)
    if(state.filtro)return (
        <>
            {(state.filtro.operativo === 'nacional' && state.filtro.objetivo === 'cargue') && <HistorialCargueNacionalItem />}
            {(state.filtro.operativo === 'nacional' && state.filtro.objetivo === 'descargue') && <HistorialDescargueNacionalItem />}
            {(state.filtro.operativo === 'regional' && state.filtro.objetivo === 'cargue') && <HistorialCargueRegionalItem />}
            {(state.filtro.operativo === 'regional' && state.filtro.objetivo === 'descargue') && <HistorialDescargueRegionalItem />}
            {(state.filtro.operativo === 'urbano' && state.filtro.objetivo === 'cargue') && <HistorialCargueUrbanoItem />}
            {(state.filtro.operativo === 'urbano' && state.filtro.objetivo === 'descargue') && <HistorialDescargueUrbanoItem />}
            {state.filtro.operativo === '' && <p className='text-[#0009] text-lg mb-4  max-[768px]:text-center'>Aquí aparecerán tus vehículos filtrados</p>}
        </>
    )
}
