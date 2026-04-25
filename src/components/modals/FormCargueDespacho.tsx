import { toast } from 'react-toastify';
import { useForm } from '../../hooks/useForm';
import type { DespachoOperativoCargueForm, IngresoOperativoCargueProps } from '../../interfaces/interfaces';
import { useOperativosContext } from '../../hooks/useOperativosContext';

interface FormCargueDespachoProps {
    operativo: string,
    operativoId: IngresoOperativoCargueProps['id'],
    setShowForm: (value: boolean) => void,
}

const initialForm: DespachoOperativoCargueForm = {
    muelleCargue: '',
    precintoSalida: '',
    manifiestoCargue: '',
    gpsCargue: '',
    estadoGpsCargue: '0%',
    fechaHoraSalida: '',
    reporteSalida: '',
    novedad: '',
}

export const FormCargueDespacho = ({ operativo, operativoId, setShowForm }: FormCargueDespachoProps) => {

    const { form, handleChange, reset } = useForm<DespachoOperativoCargueForm>(initialForm);
    const { dispatch } = useOperativosContext();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (form.muelleCargue === '' || form.precintoSalida === '' || form.manifiestoCargue === '' || form.gpsCargue === '' || form.estadoGpsCargue === '' || form.reporteSalida === '' || form.novedad === '') {
            toast.error('Todos los campos son requeridos');
            return;
        }

        form.fechaHoraSalida = new Date().toLocaleString('es-CO');

        if (operativo === 'nacional') {
            dispatch({
                type: 'despacho-nacional-cargue',
                payload: {
                    operativoId,
                    despachoNacionalCargue: form
                }
            });
        }

        if (operativo === 'regional') {
            dispatch({
                type: 'despacho-regional-cargue',
                payload: {
                    operativoId,
                    despachoRegionalCargue: form
                }
            });
        }

        reset();
        toast.success(`Operativo Despachado correctamente`);
        setShowForm(false);

    }

    return (
        <form
            onSubmit={handleSubmit}
            className='w-full'>
            <label className="mb-2 flex flex-col gap-1 font-bold">
                Muelle Cargue
                <input value={form.muelleCargue} onChange={handleChange} className="p-2 bg-slate-100 rounded-md font-normal focus:outline-[#fd7e14]" type="number" name="muelleCargue" placeholder="Muelle Cargue" />
            </label>
            <label className="mb-2 flex flex-col gap-1 font-bold">
                Precinto Salida
                <input value={form.precintoSalida} onChange={handleChange} className="p-2 bg-slate-100 rounded-md font-normal focus:outline-[#fd7e14]" type="text" name="precintoSalida" placeholder="Precinto Salida" />
            </label>
            <label className="mb-2 flex flex-col gap-1 font-bold">
                Manifiesto Cargue
                <input value={form.manifiestoCargue} onChange={handleChange} className="p-2 bg-slate-100 rounded-md font-normal focus:outline-[#fd7e14]" type="number" name="manifiestoCargue" placeholder="Manifiesto Cargue" />
            </label>
            <label className="mb-2 flex flex-col gap-1 font-bold">
                GPS Cargue
                <input value={form.gpsCargue} onChange={handleChange} className="p-2 bg-slate-100 rounded-md font-normal focus:outline-[#fd7e14]" type="text" name="gpsCargue" placeholder="GPS Cargue" />
            </label>
            <div className="flex flex-col gap">
                <h3 className='mb-1 font-bold'>Estado GPS Cargue:</h3>
                <label htmlFor="0%"><input defaultChecked defaultValue={'0%'} onChange={handleChange} type="radio" name="estadoGpsCargue" />{"  "} 0%</label>
                <label htmlFor="50%"><input onChange={handleChange} type="radio" name="estadoGpsCargue" value="50%" />{"  "} 50%</label>
                <label htmlFor="100%"><input onChange={handleChange} type="radio" name="estadoGpsCargue" value="100%" />{"  "} 100%</label>
            </div>
            <label className="mb-2 flex flex-col gap-1 font-bold">
                Reporte Plataforma Salida
                <input value={form.reporteSalida} onChange={handleChange} className="p-2 bg-slate-100 rounded-md font-normal focus:outline-[#fd7e14]" type="text" name="reporteSalida" placeholder="Reporte Salida" />
            </label>
            <label className="mb-2 flex flex-col gap-1 font-bold">
                Novedades
                <textarea value={form.novedad} onChange={handleChange} className="w-full p-2 bg-slate-100 rounded-md font-normal focus:outline-[#fd7e14]" name="novedad" placeholder="Ingrese las novedades del vehiculo"></textarea>
            </label>
            <button className="w-full mt-2 py-3 rounded-md text-white  bg-[#fd7e14] hover:opacity-85" type="submit">Despachar Operativo</button>
        </form>
    )
}
