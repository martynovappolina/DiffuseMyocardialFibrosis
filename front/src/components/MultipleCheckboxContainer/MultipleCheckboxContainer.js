import './MultipleCheckboxContainer.scss'

const MultipleCheckboxContainer = ({ label, optionLabels, options, setOptions, error, setError=()=>{}, result }) => {
    return (
        <div className='checkbox-container multiple'>
            <div className='custom-label'> {label} </div>
            <div className='checkbox-container-box' >
                {
                    optionLabels.map((opt, index) => 
                    <div 
                    onClick={() => setOptions(options.map((option, ind) => {
                        if(ind === index) option = !option
                        return option
                    }))}
                    className='checkbox-container-option-box'>
                        <input 
                        checked={options[index]}
                        disabled={typeof result != 'undefined'}
                        style={{visibility: error ? 'hidden': 'visible'}}
                        type='checkbox' />
                        <div 
                        onClick={() => setError(false)}
                        className={error && "checkbox error"} />
                        {opt}
                    </div>                    
                    )
                }
            </div>
        </div>
    )
}

export default MultipleCheckboxContainer