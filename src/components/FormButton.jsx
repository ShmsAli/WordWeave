import PropTypes from 'prop-types';
function FormButton({children}) {
    return (
        <div className="relative w-full">
            <button type="submit" className="w-full bg-gray-950 text-white px-4 py-3 rounded-lg">
                {children}
            </button>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                className="absolute text-white top-1/2 bottom-1/2 right-2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 cursor-pointer">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
            </svg>

        </div>
    )
}

FormButton.propTypes = {
    children:PropTypes.string
}

export default FormButton
