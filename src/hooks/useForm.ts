import { useState, type ChangeEvent } from 'react';



export const useForm = <T>(initialForm: T) => {

    const [form, setForm] = useState(initialForm);

    const handleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setForm({
            ...form,
            [name]: value,
        });
    }
    const handleChangeDate = (event: Date | null) => {
        if (!event) return;
        setForm({
            ...form,
            fecha: event
        });
    }

    const reset = () => {
        setForm(initialForm);
    }

    return {
        form,

        handleChange,
        handleChangeDate,
        reset,
    }
}