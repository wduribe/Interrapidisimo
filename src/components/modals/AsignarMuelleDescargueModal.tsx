import { Fragment, type FormEvent } from 'react';
import { Dialog, DialogPanel, Transition } from '@headlessui/react';
import { useForm } from '../../hooks/useForm';
import { toast } from 'react-toastify';
import { useOperativosContext } from '../../hooks/useOperativosContext';

interface AsignarMuelleModalProps {
    setShowModalMuelle: (value: boolean) => void;
    showModalMuelle: boolean,
    operativoId: string,
    operativo: string,
    urbano?: string,
}

const initialForm = {
    muelleDescargue: ''
}

export const AsignarMuelleDescargueModal = ({ showModalMuelle, setShowModalMuelle, operativoId, operativo, urbano }: AsignarMuelleModalProps) => {

    const { form, handleChange, reset } = useForm(initialForm);
    const { dispatch } = useOperativosContext();

    const asignarMuelle = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (form.muelleDescargue === '') {
            toast.error('Debe asignar un muelle');
            return;
        }

        if (operativo === 'nacional') {
            dispatch({
                type: 'asignar-muelle-descargue-nacional',
                payload: {
                    id: operativoId,
                    muelleDescargue: form.muelleDescargue,
                }
            });
        }

        if (operativo === 'regional') {
            dispatch({
                type: 'asignar-muelle-descargue-regional',
                payload: {
                    id: operativoId,
                    muelleDescargue: form.muelleDescargue,
                }
            });
        }

        if (operativo === 'urbano' && urbano === 'cargue') {
            dispatch({
                type: 'asignar-muelle-cargue-urbano',
                payload: {
                    id: operativoId,
                    muelleCargue: form.muelleDescargue,
                }
            });
        }

        if (operativo === 'urbano' && urbano === 'descargue') {
            dispatch({
                type: 'asignar-muelle-descargue-urbano',
                payload: {
                    id: operativoId,
                    muelleDescargue: form.muelleDescargue,
                }
            });
        }

        reset();
        toast.success('Muelle asigando correctamente');
        setShowModalMuelle(false);
    }

    return (
        <Transition appear show={showModalMuelle} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => setShowModalMuelle(false)}>
                <Transition
                    show={showModalMuelle}
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
                            show={showModalMuelle}
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <DialogPanel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <h3 className='text-2xl text-center font-bold'>Asignación de muelle</h3>
                                <p className='mt-2 text-[#0009]  text-lg text-center'>Ingrese el número del muelle</p>
                                <form onSubmit={asignarMuelle}>
                                    <div className='w-full mt-5 flex flex-col gap-2'>
                                        <label className="mb-2 flex flex-col gap-1 font-bold" >
                                            {(operativo === 'urbano' && urbano === 'cargue') ? 'Muelle Cargue' : 'Muelle Descargue'}
                                            <input value={form.muelleDescargue} onChange={handleChange} className="p-2 bg-slate-100 rounded-md font-normal focus:outline-[#fd7e14]" type="number" name="muelleDescargue" placeholder={`${(operativo === 'urbano' && urbano === 'cargue') ? 'Muelle Cargue' : 'Muelle Descargue'}`} />
                                        </label>
                                        <button className='w-full py-2 px-4 bg-[#fe7d14] hover:opacity-80 text-white rounded-sm'>Asignar muelle</button>
                                    </div>
                                </form>
                            </DialogPanel>
                        </Transition>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
