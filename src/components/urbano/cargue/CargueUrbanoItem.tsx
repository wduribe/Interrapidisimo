import { useState } from 'react';
import type { IngresoUrbanoCargueProps } from '../../../interfaces/interfaces';
import { nombreOperativos, tipoOperativos } from '../../../locales/nombreOperativos';
import { AsignarMuelleDescargueModal } from '../../modals/AsignarMuelleDescargueModal';
import { FormDespachoCargueUrbanoModal } from './FormDespachoCargueUrbanoModal';
import { toast } from 'react-toastify';

interface CargueUrbanoItemProps {
    operativo: IngresoUrbanoCargueProps,
}
export const CargueUrbanoItem = ({ operativo }: CargueUrbanoItemProps) => {

    const [showModalMuelle, setShowModalMuelle] = useState<boolean>(false);
    const [showModalDespacho, setShowModalDespacho] = useState<boolean>(false);

    const darDespacho = () => {

        if (operativo.muelleCargue === '') {
            toast.error('Debe Asignar muelle de descargue');
            return;
        }
        setShowModalDespacho(true);
    }

    return (
        <>
            <li className='mt-4 p-4 shadow-lg rounded-sm'>
                <p><strong>Operativo:</strong> {tipoOperativos[operativo.operativo]}</p>
                <p><strong>Zona:</strong> {nombreOperativos[operativo.zona]}</p>
                <p><strong>Conductor:</strong> {operativo.nombreConductor}</p>
                <p><strong>Placa:</strong> {operativo.placa}</p>
                <p><strong>Muelle:</strong> {operativo.muelleCargue ? operativo.muelleCargue : <span className='text-red-700'>Sin asignar muelle</span>}</p>
                <div className='mt-2 flex gap-2 max-[420px]:flex-col'>
                    <button onClick={darDespacho} className='py-2 px-4 bg-[#fe7d14] hover:opacity-80 text-white rounded-sm  w-1/2 min-[768px]:w-1/4 max-[420px]:w-full'>Despachar</button>
                    {(operativo.muelleCargue === '') && <button onClick={() => setShowModalMuelle(true)} className='w-1/2 py-2 px-4 bg-[#1a1731] hover:opacity-80 rounded-sm text-white min-[768px]:w-1/4 max-[420px]:w-full'>Asignar muelle</button>}
                </div>
            </li>
            <AsignarMuelleDescargueModal showModalMuelle={showModalMuelle} setShowModalMuelle={setShowModalMuelle} operativoId={operativo.id} operativo={operativo.operativo} urbano='cargue' />
            <FormDespachoCargueUrbanoModal setShowModalDespacho={setShowModalDespacho} showModalDespacho={showModalDespacho} operativoId={operativo.id} />
        </>
    )
}
