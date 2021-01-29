import PropTypes from 'prop-types';

export default function Input({className, type, name, value, placeholder, onChange}) {
    return (
        <input className={className} type={type} name={name} value={value} placeholder={placeholder} onChange={onChange} autoComplete='off' autoFocus/>
    )
}

Input.propTypes = {
    className: PropTypes.string,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
}