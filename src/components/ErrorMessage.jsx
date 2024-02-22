import PropTypes from 'prop-types'

function ErrorMessage({message}) {
    return (
        <div className="text-center mt-2 text-red-500">
            {message}
        </div>
    )
}

ErrorMessage.propTypes = {
    message: PropTypes.string.isRequired,
}

export default ErrorMessage
