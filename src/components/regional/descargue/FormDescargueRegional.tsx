import type { FormEvent } from 'react';
import { useForm } from '../../../hooks/useForm';
import { regionalSelect, type IngresoOperativoDescargueForm } from '../../../interfaces/interfaces';
import { toast } from 'react-toastify';
import { uuidAdapter } from '../../../config';
import { useOperativosContext } from '../../../hooks/useOperativosContext';


const initialForm: IngresoOperativoDescargueForm = {
    id: '',
    operativo: 'regional',
    nombreOperativo: '',
    tipoOperativo: 'regional',
    nombreConductor: '',
    placa: '',
    precintoDescargue: '',
    muelleDescargue: '',
    manifiestoDescargue: '',
    gpsDescargue: '',
    estadoGPSDescargue: '0%',
    reporteIngreso: '',
    enBodega: false,
    fechaHoraIngreso: '',
    fechaHoraSalida: '',
    novedad: '',
}

export const FormDescargueRegional = () => {

    const { form, handleChange, reset } = useForm<IngresoOperativoDescargueForm>(initialForm);
    const { dispatch } = useOperativosContext();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (form.nombreOperativo === '' || form.tipoOperativo === '' || form.nombreConductor === '' || form.placa === '' || form.precintoDescargue === '' || form.manifiestoDescargue === '' || form.gpsDescargue === '' || form.estadoGPSDescargue === '' || form.reporteIngreso === '') {
            toast.error('Todos los campos obligatorios excepto el mulle');
            return;
        }

        form.id = uuidAdapter();
        form.fechaHoraIngreso = new Date().toLocaleString('es-CO');
        form.enBodega = true;

        reset();
        toast.success(`Operativo ${form.tipoOperativo} ingresado correctamente`);

        dispatch({
            type: 'ingreso-regional-descargue',
            payload: {
                descargueRegional: form,
            }
        });

    }

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-full w-[650px] flex flex-col">
            <h3 className="mt-4 mb-2 font-bold text-2xl max-[460px]:text-center">Formulario de Descargue Operativos Regionales</h3>
            <label className="mb-2" htmlFor="zona">
                Eligir Operativo Regional
                <select
                    className="w-full p-3 flex-1 rounded bg-slate-100  focus:outline-[#fd7e14]"
                    id="category"
                    name='nombreOperativo'
                    value={form.nombreOperativo}
                    onChange={handleChange}
                >
                    <option value="">-- Elija un operativo regional</option>
                    {
                        regionalSelect.map(nacional => (
                            <option key={nacional.id} value={nacional.value}>{nacional.nombre}</option>
                        ))
                    }
                </select>
            </label>
            <div className="mb-2 flex gap-2">
                <div className="flex flex-col">
                    <h3 className='mb-1 font-bold'>Tipo de operativo</h3>
                    <label ><input onChange={handleChange} type="radio" name="tipoOperativo" value="directo" />{"  "} Directo</label>
                    <label ><input onChange={handleChange} defaultChecked defaultValue={'pueblos'} type="radio" name="tipoOperativo" />{"  "} Pueblos</label>
                </div>
                <div className="flex flex-col justify-end">
                    <label><input onChange={handleChange} type="radio" name="tipoOperativo" value="fijos" />{"  "} Fijos</label>
                    <label><input onChange={handleChange} type="radio" name="tipoOperativo" value="nacional" />{"  "} Nacional</label>
                </div>
            </div>
            <label className="mb-2 flex flex-col gap-1 font-bold">
                Nombre Conductor
                <input value={form.nombreConductor} onChange={handleChange} className="p-2 bg-slate-100 rounded-md font-normal focus:outline-[#fd7e14]" type="text" name="nombreConductor" placeholder="Nombre Conductor" />
            </label>
            <label className="mb-2 flex flex-col gap-1 font-bold">
                Placa vehiculo
                <input value={form.placa} onChange={handleChange} className="p-2 bg-slate-100 rounded-md font-normal focus:outline-[#fd7e14]" type="text" name="placa" placeholder="Placa Vehiculo" />
            </label>
            <label className="mb-2 flex flex-col gap-1 font-bold" >
                Precinto Descargue
                <input value={form.precintoDescargue} onChange={handleChange} className="p-2 bg-slate-100 rounded-md font-normal focus:outline-[#fd7e14]" type="text" name="precintoDescargue" placeholder="Precinto Descargue" />
            </label>
            <label className="mb-2 flex flex-col gap-1 font-bold" >
                Muelle Descargue - ingrese muelle si esta disponible
                <input value={form.muelleDescargue} onChange={handleChange} className="p-2 bg-slate-100 rounded-md font-normal focus:outline-[#fd7e14]" type="number" name="muelleDescargue" placeholder="Muelle Descargue" />
            </label>
            <label className="mb-2 flex flex-col gap-1 font-bold" >
                Manifiesto Descargue
                <input value={form.manifiestoDescargue} onChange={handleChange} className="p-2 bg-slate-100 rounded-md font-normal focus:outline-[#fd7e14]" type="number" name="manifiestoDescargue" placeholder="Manifiesto Descargue" />
            </label>
            <label className="mb-2 flex flex-col gap-1 font-bold" >
                GPS Descargue
                <input value={form.gpsDescargue} onChange={handleChange} className="p-2 bg-slate-100 rounded-md font-normal focus:outline-[#fd7e14]" type="text" name="gpsDescargue" placeholder="GPS Descargue" />
            </label>
            <div className="flex flex-col gap">
                <h3 className='mb-1 font-bold'>Estado GPS descargue:</h3>
                <label ><input onChange={handleChange} defaultChecked defaultValue={'0%'} type="radio" name="estadoGPSDescargue" />{"  "} 0%</label>
                <label ><input onChange={handleChange} type="radio" name="estadoGPSDescargue" value="50%" />{"  "} 50%</label>
                <label ><input onChange={handleChange} type="radio" name="estadoGPSDescargue" value="100%" />{"  "} 100%</label>
            </div>
            <label className="mb-2 flex flex-col gap-1 font-bold">
                Reporte Ingreso
                <input value={form.reporteIngreso} onChange={handleChange} className="p-2 bg-slate-100 rounded-md font-normal focus:outline-[#fd7e14]" name="reporteIngreso" placeholder="Reporte Ingreso" />
            </label>
            <button className="my-2 py-3 rounded-md text-white font-bold bg-[#fd7e14] hover:opacity-85" type="submit">Dar Ingreso</button>
        </form>

    )
}
