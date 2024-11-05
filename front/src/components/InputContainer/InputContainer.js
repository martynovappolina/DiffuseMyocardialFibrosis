import './InputContainer.scss'

const InputContainer = ({ label, unit='', value, setValue, error, setError=()=>{}, result }) => {
    return (
        <div className='input-container'>
            <div className='custom-label'> {label} </div>
            <div className='input-container-box'>
                <input 
                value={value}
                placeholder='0'
                type='number'
                onChange={(e) => setValue(e.target.value)}
                onFocus={() => setError(false)}
                disabled={typeof result != 'undefined'}
                className={error? 'custom-input error': 'custom-input'} />
                {unit}
            </div>
        </div>
    )
}

export default InputContainer