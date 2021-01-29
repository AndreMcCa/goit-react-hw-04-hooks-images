import PropTypes from 'prop-types';

export default function Button({className, type, children, onClick}) {
    return (
        <button className={className} type={type} onClick={onClick}>{children}</button>
    )
}

Button.propTypes = {
    className: PropTypes.string,
    type: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object,), PropTypes.element, PropTypes.string,]),
    onClick: PropTypes.func,
}