import { CargueNacionalItem } from '../components';
import { DescargueNacionalItem } from '../components/nacional/descargue/DescargueNacionalItem';
import { CargueRegionalItem } from '../components/regional/cargue/CargueRegionalItem';
import { DescargueRegionalItem } from '../components/regional/descargue/DescargueRegionalItem';
import { CargueUrbanoItem } from '../components/urbano/cargue/CargueUrbanoItem';
import { DescargueUrbanoItem } from '../components/urbano/descargue/DescargueUrbanoItem';
import { useOperativosContext } from '../hooks/useOperativosContext';

export const SalidasPage = () => {

  const { state } = useOperativosContext();

  return (
    <section className='max-w-full w-[1100px] px-5'>
      <h2 className='mt-10 font-bold text-3xl max-[460px]:text-center max-[460px]:text-2xl'>Vehiculos Ingresados</h2>
      <ul className='my-10'>
        {(state.carguesNacionales.length !== 0 || state.descarguesNacionales.length !== 0 || state.carguesRegionales.length !== 0 || state.descarguesRegionales.length !== 0 || state.carguesUrbanos.length !== 0 || state.descarguesUrbanos.length !== 0)
          &&
          <>
            {state.carguesNacionales.map(operativo => (operativo.enBodega) && <CargueNacionalItem key={operativo.id} operativo={operativo} />)}
            {state.descarguesNacionales.map(operativo => (operativo.enBodega) && <DescargueNacionalItem key={operativo.id} operativo={operativo} />)}
            {state.carguesRegionales.map(operativo => (operativo.enBodega) && <CargueRegionalItem key={operativo.id} operativo={operativo} />)}
            {state.descarguesRegionales.map(operativo => (operativo.enBodega) && <DescargueRegionalItem key={operativo.id} operativo={operativo} />)}
            {state.carguesUrbanos.map(operativo => (operativo.enBodega) && <CargueUrbanoItem key={operativo.id} operativo={operativo} />)}
            {state.descarguesUrbanos.map(operativo => (operativo.enBodega) && <DescargueUrbanoItem key={operativo.id} operativo={operativo} />)}
          </>
        }
      </ul>
      {
        <div>
          {
            (state.carguesNacionales.filter(operativo => (operativo.enBodega)).length === 0 && state.descarguesNacionales.filter(operativo => (operativo.enBodega)).length === 0 && state.carguesRegionales.filter(operativo => (operativo.enBodega)).length === 0 && state.descarguesRegionales.filter(operativo => (operativo.enBodega)).length === 0 && state.carguesUrbanos.filter(operativo => (operativo.enBodega)).length === 0 && state.descarguesUrbanos.filter(operativo => (operativo.enBodega)).length === 0)
            &&
            <p className='text-[#0009] text-lg max-[460px]:text-center'>
              No hay vehiculos ingresados a la Racol
            </p>
          }
        </div>
      }
    </section>
  )
}
