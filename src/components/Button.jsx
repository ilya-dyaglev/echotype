import PropTypes from 'prop-types';
import '../styles/Button.css';

const Button = ({ children=[], onClick=()=>{}, type='button', className='', label='', isPrimary=false, disabled=false }) => {
  return (
    <button
      type={type}
      className={`btn ${isPrimary ? 'primary' : 'secondary'} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label && <span className="btn-label">{label}</span>}
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
  label: PropTypes.string,
  isPrimary: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Button;
