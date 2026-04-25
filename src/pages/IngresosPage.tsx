import { useState } from 'react';
import { FormCargueNacional, FormDescargueNacional } from '../components';
import { FormCargueRegional } from '../components/regional/cargue/FormCargueRegional';
import { FormDescargueRegional } from '../components/regional/descargue/FormDescargueRegional';
import { FormCargueUrbano } from '../components/urbano/cargue/FormCargueUrbano';
import { FormDescargueUrbano } from '../components/urbano/descargue/FormDescargueUrbano';

export const IngresosPage = () => {

  const [vehiculo, setVehiculo] = useState<string>('');
  const [objetivoVehiculo, setObjetivoVehiculo] = useState<string>('');

  const onEligiendoVehiculo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setVehiculo(value);
  }

  const onEligiendoObjetivo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setObjetivoVehiculo(value);
  }

  return (
    <div className='max-w-full w-[1100px] px-5 max-[460px]:px-2'>

      <div className='mt-10 mb-5 flex flex-col gap-2'>
        <h2 className='font-bold text-3xl max-[460px]:text-center max-[460px]:text-2xl' >Bienvendo al sistema de ingresos Operativos Interrapidisimo</h2>
        <p className='text-[#0009] text-lg max-[460px]:text-center'>Llene la información del formulario para dar ingreso</p>
      </div>

      <form>

        <div className='flex flex-col '>
          <h3 className='mb-0 my-2 font-bold'>Seleccione el tipo de vehículo:</h3>
          <label>
            <input onChange={onEligiendoVehiculo} type="radio" name="operativo" value={'nacional'} />{"  "}
            Nacional
          </label>
          <label>
            <input onChange={onEligiendoVehiculo} type="radio" name="operativo" value="regional" />{"  "}
            Regional
          </label>
          <label>
            <input onChange={onEligiendoVehiculo} type="radio" name="operativo" value="urbano" />{"  "}
            Urbano
          </label>
        </div>

        <div className='mb-4 flex flex-col'>
          <h3 className='mb-0 my-2 font-bold'>Seleccione si el ingreso es para cargar o descargar:</h3>
          <label>
            <input onChange={onEligiendoObjetivo} type="radio" name="objetivo" value={'cargue'} />{"  "}
            Cargue
          </label>
          <label>
            <input onChange={onEligiendoObjetivo} type="radio" name="objetivo" value="descargue" />{"  "}
            Descargue
          </label>
        </div>
      </form>

      {(vehiculo === '' || objetivoVehiculo === '') && null}

      {/*Formulario para cargue*/}
      {(vehiculo === 'nacional' && objetivoVehiculo === 'cargue' && <FormCargueNacional />)}
      {(vehiculo === 'regional' && objetivoVehiculo === 'cargue' && <FormCargueRegional />)}
      {(vehiculo === 'urbano' && objetivoVehiculo === 'cargue' && <FormCargueUrbano />)}

      {/*Formulario para descargue*/}
      {(vehiculo === 'nacional' && objetivoVehiculo === 'descargue' && <FormDescargueNacional />)}
      {(vehiculo === 'regional' && objetivoVehiculo === 'descargue' && <FormDescargueRegional />)}
      {(vehiculo === 'urbano' && objetivoVehiculo === 'descargue' && <FormDescargueUrbano />)}

    </div>
  )
}
