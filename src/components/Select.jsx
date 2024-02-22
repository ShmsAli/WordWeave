import PropTypes from 'prop-types';
function Select({children, onChange, defaultValue}) {
    return (
        <select defaultValue={defaultValue} onChange={onChange} id="countries" className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-1 ">
            {children}
        </select>
    )
}

Select.propTypes = {
    children: PropTypes.node,
    onChange: PropTypes.func,
    defaultValue:PropTypes.string
  }

export default Select
