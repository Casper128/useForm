import { useEffect, useMemo, useState } from 'react';

export const useForm = (defaultValues = {}) => {
    const [formState, setFormState] = useState();
    const [formErrors, setFormErrors] = useState({});

    // useEffect(() => {
    //     setFormState(defaultValues);
    // }, [defaultValues])

    const registerField = (name, validations = {}) => {
        // Aqui deseo registar el campo usando el name que se envia a 
        // la funcion sin usar deafult value si no unicamente el name
        // y asi hacer algo como esto sin que genere un bucle infinito 
        setFormState({
            ...formState,
            [name]: ''
        });

        const onChange = ({ target }) => {
            const { name, value } = target;
            setFormState({
                ...formState,
                [name]: value
            });

            const errorMessage = validateField(value, validations);
            setFormErrors({
                ...formErrors,
                [`${name}Valid`]: errorMessage
            });
        };

        return {
            onChange,
            value: formState[name] || '',
            // valueLength: formState[name]?.length,
            maxLength: validations.maxLength?.value,
            name
        };
    };

    const onResetForm = () => {
        setFormState(initialForm);
    }

    const validateField = (value, validations) => {
        for (const validationType of Object.keys(validations)) {
            const validationItem = validations[validationType];

            if (validationType === 'required') {
                if (typeof validationItem === 'object') {
                    if (!value) return validationItem.message || 'This field is required.';
                } else {
                    if (!value) return validations.message || 'This field is required.';
                }
            }

            if (validationType === 'pattern') {
                if (!validationItem.value.test(value)) return validationItem.message;
            }

            if (validationType === 'minLength') {
                if (value.length < validationItem.value) return validationItem.message;
            }

            if (validationType === 'maxLength') {
                if (value.length > validationItem.value) return validationItem.message;
            }

            if (validationType === 'isNumber') {
                if (isNaN(value)) return validationItem;
            }

            if (validationType === 'minNumber') {
                if (value.length < validationItem.value) return validationItem.message;
            }

            if (validationType === 'maxNumber') {
                if (value.length > validationItem.value) return validationItem.message;
            }

            if (validationType === 'callbackValidation') {
                if (typeof validationItem.fn === 'function') {
                    if (!validationItem.fn(value)) return validationItem.message;
                }
            }
        }
        return null;
    };

    const isFormValid = useMemo(() => {
        for (const fieldValidation of Object.keys(formState)) {
            if (formErrors[`${fieldValidation}Valid`] !== null) return false;
        }
        return true;
    }, [formErrors, formState])

    const handleSubmit = (event, callback) => {
        event.preventDefault();
        // console.log('Entro');
        // validateForm(data);
        // if (isFormValid) {
            callback({...formState});
            // console.log(data);
            // resetForm();
        // }
    };

    return {
        ...formState,
        formState,
        onResetForm,
        registerField,
        isFormValid,
        formErrors,
        handleSubmit
    }
}