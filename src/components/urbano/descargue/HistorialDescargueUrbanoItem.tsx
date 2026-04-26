import { useMemo } from 'react';
import { useOperativosContext } from '../../../hooks/useOperativosContext';
import { nombreOperativos } from '../../../locales/nombreOperativos';

export const HistorialDescargueUrbanoItem = () => {


    const { state } = useOperativosContext();

    const operativoFiltered = state.descarguesUrbanos.filter(operativo => (operativo.fechaHoraIngreso.split(',')[0]) === state.filtro.fecha && !operativo.enBodega)
    const isEmpty = useMemo(() => operativoFiltered.length === 0, [operativoFiltered]);

    return (
        <div className='w-full py-5 grid gap-2 grid-cols-2 max-[768px]:grid-cols-1'>
            {isEmpty ? <p className='text-gray-600 mb-4 text-2xl font-bold max-[768px]:text-center'>No se encontraron vehiculos con los datos ingresados</p> : (
                <>
                    {
                        operativoFiltered.map(operativo => (
                            <div key={operativo.id} className='p-5 shadow-lg rounded-lg'>
                                <p><strong>Nombre:</strong>  {nombreOperativos[operativo.zona]}</p>
                                <p><strong>Nombre conductor:</strong>  {operativo.nombreConductor}</p>
                                <p><strong>Placa:</strong>  {operativo.placa}</p>
                                <p><strong>Fecha ingreso:</strong>  {operativo.fechaHoraIngreso}</p>
                                <p><strong>Fecha salida:</strong>  {operativo.fechaHoraSalida}</p>
                                <p><strong>Muelle descargue:</strong>  {operativo.muelleDescargue}</p>
                                <p><strong>Novedades:</strong>  {operativo.novedad}</p>
                            </div>
                        ))
                    }
                </>
            )}
        </div>
    )
}
