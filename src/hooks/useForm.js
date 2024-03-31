import { useState } from 'react';

export const useForm = () => {
    const [formState, setFormState] = useState({});
    const [formErrors, setFormErrors] = useState({});

    const validateField = (name, value, inputConfig) => {

        const { required } = inputConfig;
        let errorMessage = '';
        if (required && value.trim() === '') {
            errorMessage = required;
        }

        setFormErrors({
            ...formErrors,
            [`${name}Valid`]: errorMessage
        });
    }

    const handleChange = (event, inputConfig) => {
        const { name, value } = event.target;
        validateField(name, value, inputConfig);

        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }));

    }
    const registerField = (name, inputConfig) => {
        return {
            name,
            value: formState[name] ?? "",
            onChange: (event) => handleChange(event, inputConfig),
            ...inputConfig
        };

    };
    const handleSubmit = (e) => {
        e.preventDefault();

    }

    return {
        formState,
        registerField,
        handleSubmit,
        formErrors
    }
}