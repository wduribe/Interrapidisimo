import { useState } from 'react';
import type { IngresoOperativoCargueProps } from '../../../interfaces/interfaces';
import { nombreOperativos, tipoOperativos } from '../../../locales/nombreOperativos';
import { CargueDespachoModal } from '../../modals/CargueDespachoModal';

interface CargueNacionalItemProps {
    operativo: IngresoOperativoCargueProps,
}

export const CargueNacionalItem = ({ operativo }: CargueNacionalItemProps) => {

    const [showForm, setShowForm] = useState(false);

    const onHandleShowForm = () => {
        setShowForm(true);
    }
 
    return (
        <>
            <li className='mt-4 p-4 shadow-lg rounded-sm'>
                <p><strong>Operativo:</strong> {tipoOperativos[operativo.tipoOperativo]}</p>
                <p><strong>Nombre operativo:</strong> {nombreOperativos[operativo.nombreOperativo]}</p>
                <p><strong>Conductor:</strong> {operativo.nombreConductor}</p>
                <p><strong>Placa:</strong> {operativo.placa}</p>
                <button onClick={onHandleShowForm} className='mt-2 py-2 px-4 bg-[#fe7d14] hover:opacity-80 text-white rounded-sm  w-1/2 min-[768px]:w-1/4 max-[420px]:w-full'>Despachar</button>
            </li>
            <CargueDespachoModal showForm={showForm} setShowForm={setShowForm} operativoId={operativo.id} operativo={operativo.operativo} />
        </>
    )
}
