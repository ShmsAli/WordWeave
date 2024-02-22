import { Link, } from "react-router-dom"
import PropTypes from 'prop-types';

function Button({ type = 'button', children, to, onClick , className}) {

    const class_name = `hover:ring-gray-300 hover:ring-2 focus:ring-2 focus:ring-gray-950 rounded-lg px-6 py-2 border boder-[#A6A6A6] ${className}`;

    if (type === 'link')
        return (
            <Link
                to={to} className={class_name}
            >
                {children}
            </Link>
        )
    else
        return (
            <button 
                type={type} className={class_name} onClick={onClick}>
                {children}
            </button>
        )
}

Button.propTypes ={
    type: PropTypes.string,
    children: PropTypes.node.isRequired,
    to: PropTypes.string,
    onClick: PropTypes.func,
    className: PropTypes.string,
}

export default Button
