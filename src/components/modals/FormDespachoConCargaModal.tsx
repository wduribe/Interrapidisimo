import { Fragment, type FormEvent } from 'react';
import { Dialog, DialogPanel, Transition } from '@headlessui/react';
import type { IngresoOperativoCargueForm, IngresoOperativoDescargueProps } from '../../interfaces/interfaces';
import { useForm } from '../../hooks/useForm';
import { toast } from 'react-toastify';
import { useOperativosContext } from '../../hooks/useOperativosContext';
import { uuidAdapter } from '../../config';

const initialForm: IngresoOperativoCargueForm = {
    id: '',
    operativo: '',
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
    estadoGpsCargue: '100%',
    fechaHoraSalida: '',
    reporteSalida: '',
    novedad: '',
}

interface FormDespachoConCargaModalProps {
    setFormDespachoConCargaModal: (value: boolean) => void,
    formDespachoConCargaModal: boolean,
    operativo: IngresoOperativoDescargueProps,
}

export const FormDespachoConCargaModal = ({ formDespachoConCargaModal, setFormDespachoConCargaModal, operativo }: FormDespachoConCargaModalProps) => {

    const { form, handleChange } = useForm<IngresoOperativoCargueForm>(initialForm);
    const { dispatch } = useOperativosContext();

    const despacharOperativo = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (form.muelleCargue === '' || form.precintoSalida === '' || form.manifiestoCargue === '' || form.gpsCargue === '' || form.estadoGpsCargue === '' || form.reporteSalida === '' || form.novedad === '') {
            toast.error('Todos los campos son requeridos');
            return;
        }

        form.id = uuidAdapter();
        form.operativo = operativo.operativo;
        form.nombreOperativo = operativo.nombreOperativo;
        form.tipoOperativo = operativo.tipoOperativo;
        form.nombreConductor = operativo.nombreConductor;
        form.placa = operativo.placa;
        form.reporteIngreso = operativo.reporteIngreso;
        form.fechaHoraIngreso = operativo.fechaHoraIngreso;
        form.enBodega = false;
        form.fechaHoraSalida = new Date().toLocaleString('es-CO');

        if (operativo.operativo === 'nacional') {
            dispatch({
                type: 'ingreso-nacional-cargue',
                payload: {
                    cargueNacional: form,
                }
            });

            dispatch({
                type: 'despacho-nacional-con-carga',
                payload: {
                    id: operativo.id,
                    fechaHoraSalida: form.fechaHoraSalida,
                    novedad: form.novedad,
                }
            });
        }

        if (operativo.operativo === 'regional') {
            dispatch({
                type: 'ingreso-regional-cargue',
                payload: {
                    cargueRegional: form,
                }
            });

            dispatch({
                type: 'despacho-regional-con-carga',
                payload: {
                    id: operativo.id,
                    fechaHoraSalida: form.fechaHoraSalida,
                    novedad: form.novedad,
                }
            });
        }

        toast.success('Operativo despachado correctamente');
        setFormDespachoConCargaModal(false);

    }

    return (
        <Transition appear show={formDespachoConCargaModal} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => setFormDespachoConCargaModal(false)}>
                <Transition
                    show={formDespachoConCargaModal}
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-75" />
                </Transition>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition
                            show={formDespachoConCargaModal}
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <DialogPanel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <h3 className='text-2xl text-center font-bold'>Formulario de despacho Nacional</h3>
                                <p className='mt-2 text-[#0009]  text-lg text-center'>Llene el formulario para el despacho</p>
                                <form
                                    onSubmit={despacharOperativo}
                                >
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
                            </DialogPanel>
                        </Transition>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
