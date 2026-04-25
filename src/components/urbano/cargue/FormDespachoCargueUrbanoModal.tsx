import { Fragment } from 'react';
import { Dialog, DialogPanel, Transition } from '@headlessui/react';
import { useForm } from '../../../hooks/useForm';
import type { DespachoUrbanoCargueForm } from '../../../interfaces/interfaces';
import { toast } from 'react-toastify';
import { useOperativosContext } from '../../../hooks/useOperativosContext';

interface FormDespachoCargueUrbanoModalProps {
    setShowModalDespacho: (value: boolean) => void;
    showModalDespacho: boolean;
    operativoId: string,
}

const initialForm: DespachoUrbanoCargueForm = {
    asignacion: '',
    novedad: '',
    plantilla: '',
}

export const FormDespachoCargueUrbanoModal = ({ setShowModalDespacho, showModalDespacho, operativoId }: FormDespachoCargueUrbanoModalProps) => {

    const { form, handleChange, reset } = useForm(initialForm);
    const { dispatch } = useOperativosContext();

    const despacharUrbano = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (form.asignacion === '' || form.novedad === '' || form.plantilla === '') {
            toast.error('Todos los campos son obligatorios');
            return;
        }

        dispatch({
            type: 'despacho-urbano-con-carga',
            payload: {
                id: operativoId,
                form
            }
        });
        toast.success('Urbano despachado correctamente');
        reset();

    }

    return (
        <Transition appear show={showModalDespacho} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => setShowModalDespacho(false)}>
                <Transition
                    show={showModalDespacho}
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
                            show={showModalDespacho}
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <DialogPanel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <h3 className='text-2xl text-center font-bold'>Formulario de despacho Urbano</h3>
                                <p className='mt-2 text-[#0009]  text-lg text-center'>Llene el siguiente formulario para despachar el urbano</p>
                                <form
                                    onSubmit={despacharUrbano}
                                >
                                    <label className="mt-2 flex flex-col gap-1 font-bold">
                                        Asignación
                                        <input value={form.asignacion} onChange={handleChange} className="p-2 bg-slate-100 rounded-md font-normal focus:outline-[#fd7e14]" type="number" name="asignacion" placeholder="Asignación" />
                                    </label>
                                    <label className="mt-2 flex flex-col gap-1 font-bold">
                                        Plantilla
                                        <input value={form.plantilla} onChange={handleChange} className="p-2 bg-slate-100 rounded-md font-normal focus:outline-[#fd7e14]" type="number" name="plantilla" placeholder="Plantilla" />
                                    </label>
                                    <label className="mt-2 flex flex-col gap-1 font-bold">
                                        Novedades
                                        <textarea value={form.novedad} onChange={handleChange} className="w-full p-2 bg-slate-100 rounded-md font-normal focus:outline-[#fd7e14]" name="novedad" placeholder="Ingrese las novedades del vehiculo"></textarea>
                                    </label>
                                    <button className="w-full mt-4 py-3 rounded-md text-white font-bold bg-[#fd7e14] hover:opacity-85" type="submit">Despachar</button>
                                </form>
                            </DialogPanel>
                        </Transition>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
