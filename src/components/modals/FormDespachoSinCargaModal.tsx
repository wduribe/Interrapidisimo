import { Fragment } from 'react';
import { Dialog, DialogPanel, Transition } from '@headlessui/react';
import type { DespachoOperativoSinCargaForm } from '../../interfaces/interfaces';
import { useForm } from '../../hooks/useForm';
import { toast } from 'react-toastify';
import { useOperativosContext } from '../../hooks/useOperativosContext';

interface FormDespachoSinCargaModalProps {
    setFormDespachoSinCargaModal: (value: boolean) => void;
    formDespachoSinCargaModal: boolean
    operativoId: string,
    operativo: string,
}

const initialForm: DespachoOperativoSinCargaForm = {
    novedad: '',
}

export const FormDespachoSinCargaModal = ({ formDespachoSinCargaModal, setFormDespachoSinCargaModal, operativoId, operativo }: FormDespachoSinCargaModalProps) => {

    const { form, handleChange, reset } = useForm<DespachoOperativoSinCargaForm>(initialForm);
    const { dispatch } = useOperativosContext();

    const despacharOperativo = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if (form.novedad === '') {
            toast.error('Debe llenar todos los campos del formulario');
            return;
        }

        if (operativo === 'nacional') {
            dispatch({
                type: 'despacho-nacional-sin-carga',
                payload: {
                    id: operativoId,
                    novedad: form.novedad,
                }
            });
        }

        if (operativo === 'regional') {
            console.log(operativo);
            dispatch({
                type: 'despacho-regional-sin-carga',
                payload: {
                    id: operativoId,
                    novedad: form.novedad,
                }
            });
        }


        reset();
        toast.success('Operativo despachado correctamente');

    }

    return (
        <Transition appear show={formDespachoSinCargaModal} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => setFormDespachoSinCargaModal(false)}>
                <Transition
                    show={formDespachoSinCargaModal}
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
                            show={formDespachoSinCargaModal}
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
                                <p className='mt-2 text-[#0009]  text-lg text-center'>Ingrese las novedades</p>
                                <form
                                    onSubmit={despacharOperativo}
                                >
                                    <label className="mt-2 flex flex-col gap-1 font-bold">
                                        Novedades
                                        <textarea value={form.novedad} onChange={handleChange} className="w-full p-2 bg-slate-100 rounded-md font-normal focus:outline-[#fd7e14]" name="novedad" placeholder="Ingrese las novedades del vehiculo"></textarea>
                                    </label>
                                    <button className='w-full mt-4 py-2 px-4 bg-[#fe7d14] hover:opacity-80 text-white rounded-sm'>Despachar operativo</button>
                                </form>
                            </DialogPanel>
                        </Transition>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
