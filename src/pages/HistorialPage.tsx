import { useForm } from '../hooks/useForm';
import type { InitialForm } from '../interfaces/interfaces';
import 'react-calendar/dist/Calendar.css';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect, type FormEvent } from 'react';
import { useOperativosContext } from '../hooks/useOperativosContext';
import { HistorialItems } from '../components/HistorialItems';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';

const initialForm: InitialForm = {
  operativo: '',
  objetivo: '',
  fecha: new Date(),
}

export const HistorialPage = () => {

  const { form, handleChange, handleChangeDate } = useForm<InitialForm>(initialForm);
  const { dispatch } = useOperativosContext();

  useEffect(() => {
    return dispatch({
      type: 'filtrar',
      payload: {
        operativo: '',
        fecha: 123456,
        objetivo: ''
      }
    })
  }, []);

  const agregarFiltro = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const fechaInput = Date.parse(form.fecha.toLocaleString('es-CO').split(',')[0]);

    if (!form.fecha || form.objetivo === '' || form.operativo === '') {
      toast.error('Debe llenar todos los campos del filtro');
      return;
    }

    dispatch({
      type: 'filtrar',
      payload: {
        fecha: fechaInput,
        objetivo: form.objetivo,
        operativo: form.operativo,
      }
    });

  }


  return (
    <div className='max-w-full w-[1100px] mt-10 px-5 flex-col gap-4 max-[768px]:flex-col max-[460px]:px-2'>
      <div className='w-1/2 max-[768px]:w-full'>
        <div className='flex flex-col gap-2'>
          <h2 className='font-bold text-3xl max-[460px]:text-center max-[460px]:text-2xl' >Historial de ingresos y despachos</h2>
          <p className='text-[#0009] text-lg max-[460px]:text-center'>Ingrese la información del vehiculo que esta buscando</p>
        </div>

        <form
          onSubmit={agregarFiltro}
        >
          <div className='flex flex-col '>
            <h3 className='mb-0 my-2 font-bold'>Filtrar por:</h3>
            <label>
              <input onChange={handleChange} type="radio" name="operativo" value={'nacional'} />{"  "}
              Nacional
            </label>
            <label>
              <input onChange={handleChange} type="radio" name="operativo" value="regional" />{"  "}
              Regional
            </label>
            <label>
              <input onChange={handleChange} type="radio" name="operativo" value="urbano" />{"  "}
              Urbano
            </label>
            <h3 className='mb-0 my-2 font-bold'>Filtrar por:</h3>
            <label>
              <input onChange={handleChange} type="radio" name="objetivo" value={'cargue'} />{"  "}
              Cargue
            </label>
            <label>
              <input onChange={handleChange} type="radio" name="objetivo" value="descargue" />{"  "}
              Descargue
            </label>
            <label className="mt-2 w-full flex flex-col gap-1 font-bold">
              Fecha de ingreso
              <DatePicker
                className='bg-slate-100 p-2 border-0 w-full'
                selected={form.fecha}
                onChange={handleChangeDate}
              />
            </label>
          </div>
          <button className="w-full mt-2 mb-4 py-3 rounded-md text-white font-bold bg-[#fd7e14] hover:opacity-85" type="submit">Filtrar</button>

        </form>
      </div>

      <div className='w-full'>
        <h2 className='my-4 font-bold text-3xl max-[768px]:text-center max-[460px]:text-2xl' >Vehiculos encontrados</h2>
        <HistorialItems />
      </div>
    </div>
  )
}
