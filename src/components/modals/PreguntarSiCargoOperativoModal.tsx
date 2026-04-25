import { Fragment } from 'react';
import { Dialog, DialogPanel, Transition } from '@headlessui/react';

interface PreguntarSiCargoOperativoModalProps {
    setShowModalDespacho: (value: boolean) => void,
    showModalDespacho: boolean,
    setFormDespachoSinCargaModal: (value: boolean) => void,
    setFormDespachoConCargaModal: (value: boolean) => void,
}

export const PreguntarSiCargoOperativoModal = ({ showModalDespacho, setShowModalDespacho, setFormDespachoSinCargaModal, setFormDespachoConCargaModal }: PreguntarSiCargoOperativoModalProps) => {

    const onMostrarFormularioDespachoCarga = () => {
        setFormDespachoConCargaModal(true);
        setShowModalDespacho(false);
    }

    const onMostrarFormDespachoSinCarga = () => {
        setFormDespachoSinCargaModal(true);
        setShowModalDespacho(false);
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
                                <h3 className='text-2xl text-center font-bold'>Confirmación</h3>
                                <p className='mt-2 text-[#0009]  text-lg text-center'>¿Realizó cargue el operativo?</p>
                                <div className='w-full mt-4 flex gap-2 max-[460px]:flex-col'>
                                    <button onClick={onMostrarFormularioDespachoCarga} className='py-2 px-4 bg-[#fe7d14] hover:opacity-80 rounded-sm text-white w-1/2 max-[460px]:w-full'>Si</button>
                                    <button onClick={onMostrarFormDespachoSinCarga} className='py-2 px-4 bg-[#1a1731] hover:opacity-80 rounded-sm text-white w-1/2 max-[460px]:w-full'>No</button>
                                </div>
                            </DialogPanel>
                        </Transition>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
