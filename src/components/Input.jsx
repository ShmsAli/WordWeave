import PropTypes from 'prop-types';
import React, {useId} from 'react';

const Input = React.forwardRef(function Input(
    {   type = 'text', 
        label, className = '', 
        errorMessage, 
        placeholder,
        ...props
    }, ref){

    const id = useId();
    return (
        <div className="my-2">

            {label && <label htmlFor={id}>{label}</label>}

            <div className="w-full my-1">

                <input autoComplete="on" id={id} ref={ref} className={`${type==='file'? 'input-file-style' : 'input-simple-style'} ${className}`} type={type} placeholder={placeholder} {...props} />

            </div>

            {errorMessage && <span className="text-red-500 text-sm">{errorMessage}</span>}
        </div>
    )
})

Input.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    className: PropTypes.string,
    errorMessage: PropTypes.string,
    placeholder: PropTypes.string,
}

// Set display name for the Input component
// Input.displayName = 'Input';

export default Input;