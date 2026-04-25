import { toast } from 'react-toastify';
import { useForm } from '../../../hooks/useForm';
import { urbanoSelect, type IngresoUrbanoDescargueForm } from '../../../interfaces/interfaces';
import { uuidAdapter } from '../../../config';
import { useOperativosContext } from '../../../hooks/useOperativosContext';


const initialForm: IngresoUrbanoDescargueForm = {
    id: '',
    operativo: 'urbano',
    nombreConductor: '',
    placa: '',
    novedad: '',
    enBodega: false,
    fechaHoraIngreso: '',
    fechaHoraSalida: '',
    muelleDescargue: '',
    zona: '',
}

export const FormDescargueUrbano = () => {

    const { form, handleChange, reset } = useForm<IngresoUrbanoDescargueForm>(initialForm);
    const { dispatch } = useOperativosContext();

    const darIngreso = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (form.zona === '' || form.nombreConductor === '' || form.placa === '') {
            toast.error('Debe llenar los campos obligatorios');
            return;
        }

        form.id = uuidAdapter();
        form.enBodega = true;
        form.fechaHoraIngreso = new Date().toLocaleString('es-CO');

        dispatch({
            type: 'ingreso-urbano-descargue',
            payload: {
                descargueUrbano: form,
            }
        });
        toast.success('Urbano ingresado correctamente');
        reset();
    }

    return (

        <form
            className="max-w-full w-[650px]"
            onSubmit={darIngreso}
        >
            <h3 className="mt-4 mb-2 font-bold text-2xl max-[460px]:text-center">Formulario de Descargue Urbanos</h3>

            <label>
                Elegir Urbano
                <select
                    className="mb-2 w-full p-3 flex-1 rounded bg-slate-100  focus:outline-[#fd7e14]"
                    name='zona'
                    value={form.zona}
                    onChange={handleChange}
                >
                    <option value="">-- Elija una zona</option>
                    {
                        urbanoSelect.map(zona => (
                            <option key={zona.id} value={zona.value}>{zona.nombre}</option>
                        ))
                    }
                </select>
            </label>
            <label className="mb-2 flex flex-col gap-1 font-bold">
                Nombre Conductor
                <input value={form.nombreConductor} onChange={handleChange} className="p-2 bg-slate-100 rounded-md font-normal focus:outline-[#fd7e14]" type="text" name="nombreConductor" placeholder="Nombre Conductor" />
            </label>
            <label className="mb-2 flex flex-col gap-1 font-bold">
                Placa vehiculo
                <input value={form.placa} onChange={handleChange} className="p-2 bg-slate-100 rounded-md font-normal focus:outline-[#fd7e14]" type="text" name="placa" placeholder="Placa Vehiculo" />
            </label>
            <label className="mt-2 flex flex-col gap-1 font-bold">
                Muelle Descargue
                <input value={form.muelleDescargue} onChange={handleChange} className="p-2 bg-slate-100 rounded-md font-normal focus:outline-[#fd7e14]" type="number" name="muelleDescargue" placeholder="Muelle Descargue" />
            </label>
            <button className="w-full mb-4 mt-4 py-3 rounded-md text-white font-bold bg-[#fd7e14] hover:opacity-85" type="submit">Dar Ingreso</button>

        </form>)
}
