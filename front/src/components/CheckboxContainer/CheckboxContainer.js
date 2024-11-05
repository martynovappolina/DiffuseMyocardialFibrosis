import './CheckboxContainer.scss'

const CheckboxContainer = ({ column=false, label, optionLabels, option, setOption, error, setError, result }) => {
    return(
        <div className={`checkbox-container ${column ? 'column': ''}`}>
            <div className='custom-label'> {label} </div>
            <div className={`checkbox-container-box ${column ? 'column': ''}`} >
                {
                    optionLabels.map((opt) => 
                    <div 
                    onClick={() => {
                        setError(false)
                        if(typeof result == 'undefined') setOption(opt.value)
                    }}
                    className={
                        opt.title === 'Да' ? 'checkbox-container-option-box yes': 'checkbox-container-option-box'
                    }>
                        <input 
                        checked={option===opt.value}
                        disabled={typeof result != 'undefined'}
                        style={{visibility: error ? 'hidden': 'visible'}}
                        type='checkbox' />
                        <div 
                        className={error && "checkbox error"} />
                        {opt.title}
                    </div>                    
                    )
                }
            </div>
        </div>
    )
}

export default CheckboxContainer