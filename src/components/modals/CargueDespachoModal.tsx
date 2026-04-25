import { Dialog, DialogPanel, Transition } from '@headlessui/react';
import { Fragment } from 'react/jsx-runtime';
import type { IngresoOperativoCargueProps } from '../../interfaces/interfaces';
import { FormCargueDespacho } from './FormCargueDespacho';

interface CargueDespachoModalProps {
    showForm: boolean,
    setShowForm: (value: boolean) => void,
    operativoId: IngresoOperativoCargueProps['id'],
    operativo: string,
}

export const CargueDespachoModal = ({ showForm, setShowForm, operativoId, operativo }: CargueDespachoModalProps) => {
    return (
        <Transition appear show={showForm} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => setShowForm(false)}>
                <Transition
                    show={showForm}
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
                            show={showForm}
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <DialogPanel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <h3 className='text-2xl text-center font-bold'>Formulario despacho - cargue operativos Nacionales</h3>
                                <p className='mt-2 text-[#0009]  text-lg text-center'>Llene el siguiente formulario para despachar el operativo</p>
                                <div className='w-full mt-5 flex gap-2 max-[460px]:flex-col'>
                                    <FormCargueDespacho operativoId={operativoId} setShowForm={setShowForm} operativo={operativo} />
                                </div>
                            </DialogPanel>
                        </Transition>
                    </div>
                </div>
            </Dialog>
        </Transition>
    ) 
}
