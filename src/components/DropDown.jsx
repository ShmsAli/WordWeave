import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

function DropDown({ trigger, content, className='' }) {

    const dropdownRef = useRef(null);
    const [show, setShow] = useState(false);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShow(false);
        }
    };

    useEffect(() => {
        window.addEventListener('click', handleClickOutside);

        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);
    return (
        <div className={`relative z-[100] ${className}`} ref={dropdownRef}>
            {/* Trigger */}
            <div onClick={() => setShow((prev) => !prev)} className='cursor-pointer'>
                {trigger}
            </div>
            {/* Content */}
            <div onClick={() => setShow((prev) => !prev)}  className={`absolute w-48 right-0 top-6 border bg-white border-gray-100 rounded-md shadow-sm ${show ? 'block' : 'hidden'}`}>
                <div className="ltr:origin-top-right rtl:origin-top-left end-0">
                    {content}
                </div>
            </div>
        </div>
    )
}

DropDown.propTypes = {
    trigger:PropTypes.node.isRequired,
    content:PropTypes.node.isRequired,
    className:PropTypes.string,
}

export default DropDown