import './CustomDropdown.scss'

const CustomDropdown = ({ label, options, value, setValue, error, setError, disabled }) => {
    return (
        <div className='custom-dropdown-container'>
            <div className='custom-label'> {label} </div>
            <select
            className='custom-select'
            onChange={() => setValue(1)}
            disabled={disabled}
            >
                {
                    options.map(option => 
                        <option 
                        key={option.key}
                        selected={option.key === value}
                        value={option.value}>{option.text}</option>
                    )
                }
            </select> 
        </div>       
    )
}

export default CustomDropdown