import type { FormEvent } from 'react';
import { useForm } from '../../../hooks/useForm';
import type { IngresoOperativoCargueForm } from '../../../interfaces/interfaces';
import { nacionalSelect } from '../../../interfaces/interfaces';
import { toast } from 'react-toastify';
import { uuidAdapter } from '../../../config';
import { useOperativosContext } from '../../../hooks/useOperativosContext';

const initialForm: IngresoOperativoCargueForm = {
  id: '',
  operativo: 'nacional',
  nombreOperativo: '',
  tipoOperativo: 'nacional',
  nombreConductor: '',
  placa: '',
  reporteIngreso: '',
  fechaHoraIngreso: '',
  enBodega: null,
  muelleCargue: '',
  precintoSalida: '',
  manifiestoCargue: '',
  gpsCargue: '',
  estadoGpsCargue: '',
  fechaHoraSalida: '',
  reporteSalida: '',
  novedad: '',
}

export const FormCargueNacional = () => {

  const { handleChange, form, reset } = useForm<IngresoOperativoCargueForm>(initialForm);
  const { dispatch } = useOperativosContext();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {

    event.preventDefault();

    if (form.nombreOperativo === '' || form.tipoOperativo === '' || form.nombreConductor === '' || form.placa === '' || form.reporteIngreso === '') {
      toast.error('Todos los campos son requeridos');
      return;
    }

    form.id = uuidAdapter();
    form.fechaHoraIngreso = new Date().toLocaleString('es-CO');
    form.enBodega = true;

    dispatch({
      type: 'ingreso-nacional-cargue',
      payload: {
        cargueNacional: form,
      }
    });

    reset();
    toast.success(`Operativo ${form.tipoOperativo} ingresado correctamente`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-full w-[650px]">
      <h3 className="mt-4 mb-2 font-bold text-2xl max-[460px]:text-center">Formulario de Cargue Operativos Nacionales</h3>
      <label className="mb-2">
        <p className="mb-1">Eligir Operativo Nacional</p>
        <select
          className="w-full p-3 flex-1 rounded bg-slate-100  focus:outline-[#fd7e14]"
          id="category"
          name='nombreOperativo'
          value={form.nombreOperativo}
          onChange={handleChange}
        >
          <option value="">-- Elija un operativo nacional</option>
          {
            nacionalSelect.map(nacional => (
              <option key={nacional.id} value={nacional.value}>{nacional.nombre}</option>
            ))
          }
        </select>
      </label>
      <div className="my-2 flex gap-2">
        <div className="flex flex-col">
          <p className="mb-1">Tipo de operativo</p>
          <label><input onChange={handleChange} type="radio" name="tipoOperativo" value="directo" />{"  "} Directo</label>
          <label><input onChange={handleChange} type="radio" name="tipoOperativo" value="pueblos" />{"  "} Pueblos</label>
        </div>
        <div className="flex flex-col justify-end">
          <label><input onChange={handleChange} type="radio" name="tipoOperativo" value="fijos" />{"  "} Fijos</label>
          <label><input onChange={handleChange} type="radio" name="tipoOperativo" defaultChecked defaultValue={'nacional'} />{"  "} Nacional</label>
        </div>
      </div>
      <label className="mb-2 flex flex-col gap-1 font-bold" >
        Nombre Conductor
        <input onChange={handleChange} value={form.nombreConductor} className="p-2 bg-slate-100 rounded-md font-normal focus:outline-[#fd7e14]" type="text" name="nombreConductor" placeholder="Nombre Conductor" />
      </label>
      <label className="mb-2 flex flex-col gap-1 font-bold">
        Placa vehiculo
        <input onChange={handleChange} value={form.placa} className="p-2 bg-slate-100 rounded-md font-normal focus:outline-[#fd7e14]" type="text" name="placa" placeholder="Ejemplo: xyz321" />
      </label>
      <label className="mb-2 flex flex-col gap-1 font-bold" htmlFor="reporteIngreso">
        Reporte Plataforma Ingreso
        <input onChange={handleChange} value={form.reporteIngreso} className="p-2 bg-slate-100 rounded-md font-normal focus:outline-[#fd7e14]" name="reporteIngreso" placeholder="Reporte Ingreso" ></input>
      </label>
      <button className="w-full mt-2 mb-4 py-3 rounded-md text-white font-bold bg-[#fd7e14] hover:opacity-85" type="submit">Dar Ingreso</button>
    </form>
  )
}
