import { useState } from 'react';
import type { IngresoOperativoDescargueProps } from '../../../interfaces/interfaces';
import { nombreOperativos, tipoOperativos } from '../../../locales/nombreOperativos';
import { PreguntarSiCargoOperativoModal } from '../../modals/PreguntarSiCargoOperativoModal';
import { toast } from 'react-toastify';
import { AsignarMuelleDescargueModal } from '../../modals/AsignarMuelleDescargueModal';
import { FormDespachoSinCargaModal } from '../../modals/FormDespachoSinCargaModal';
import { FormDespachoConCargaModal } from '../../modals/FormDespachoConCargaModal';

interface DescargueNacionalItemProps {
  operativo: IngresoOperativoDescargueProps,
}

export const DescargueNacionalItem = ({ operativo }: DescargueNacionalItemProps) => {

  const [showModalDespacho, setShowModalDespacho] = useState<boolean>(false);
  const [showModalMuelle, setShowModalMuelle] = useState<boolean>(false);
  const [formDespachoSinCargaModal, setFormDespachoSinCargaModal] = useState<boolean>(false);
  const [formDespachoConCargaModal, setFormDespachoConCargaModal] = useState<boolean>(false);

  const activarModalDespacho = () => {
    if (operativo.muelleDescargue === '') {
      toast.error('Debe asignar primero un muelle de descargue al operativo');
      return;
    }
    setShowModalDespacho(true);
  }

  return (
    <>
      <li className='mt-4 p-4 shadow-lg rounded-sm'>
        <p><strong>Operativo:</strong> {tipoOperativos[operativo.tipoOperativo]}</p>
        <p><strong>Nombre operativo:</strong> {nombreOperativos[operativo.nombreOperativo]}</p>
        <p><strong>Conductor:</strong> {operativo.nombreConductor}</p>
        <p><strong>Placa:</strong> {operativo.placa}</p>
        <p><strong>Muelle:</strong> {operativo.muelleDescargue ? operativo.muelleDescargue : <span className='text-red-700'>Sin asignar muelle</span>}</p>
        <div className='mt-2 flex gap-2 max-[420px]:flex-col'>
          <button onClick={activarModalDespacho} className='py-2 px-4 bg-[#fe7d14] hover:opacity-80 text-white rounded-sm  w-1/2 min-[768px]:w-1/4 max-[420px]:w-full'>Despachar</button>
          {(operativo.muelleDescargue === '') && <button onClick={() => setShowModalMuelle(true)} className='w-1/2 py-2 px-4 bg-[#1a1731] hover:opacity-80 rounded-sm text-white min-[768px]:w-1/4 max-[420px]:w-full'>Asignar muelle</button>}
        </div>
      </li>
      <PreguntarSiCargoOperativoModal showModalDespacho={showModalDespacho} setShowModalDespacho={setShowModalDespacho} setFormDespachoSinCargaModal={setFormDespachoSinCargaModal} setFormDespachoConCargaModal={setFormDespachoConCargaModal} />
      <AsignarMuelleDescargueModal showModalMuelle={showModalMuelle} setShowModalMuelle={setShowModalMuelle} operativoId={operativo.id} operativo={operativo.operativo} />
      <FormDespachoSinCargaModal setFormDespachoSinCargaModal={setFormDespachoSinCargaModal} formDespachoSinCargaModal={formDespachoSinCargaModal} operativoId={operativo.id} operativo={operativo.operativo} />
      <FormDespachoConCargaModal formDespachoConCargaModal={formDespachoConCargaModal} setFormDespachoConCargaModal={setFormDespachoConCargaModal} operativo={operativo} />
    </>
  )
}
