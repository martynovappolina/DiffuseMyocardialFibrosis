import React from 'react'
import './CheckboxContainer.scss'
import { Option } from '../../../types/option'

interface CheckboxContainerProps {
    column?: boolean
    label: string | React.ReactElement
    optionLabels: Option[]
    option: string
    setOption: (option: number) => void
    error: boolean
    setError: (error: boolean) => void
    result?: string
}

const CheckboxContainer: React.FC<CheckboxContainerProps> = ({
    column = false,
    label,
    optionLabels,
    option,
    setOption,
    error,
    setError,
    result
}) => {
    return(
        <div className={`checkbox-container ${column ? 'column': 'row'}`}>
            <div className='custom-label'> {label} </div>
            <div className={`checkbox-container-box ${column ? 'column': ''}`} >
                {
                    optionLabels.map((opt) => 
                    <div 
                    onClick={() => {
                        setError(false)
                        if(typeof result === 'undefined') setOption(opt.value)
                    }}
                    className={
                        opt.text === 'Да' ? 'checkbox-container-option-box yes': 'checkbox-container-option-box'
                    }>
                        <input 
                        checked={option?.toString()===opt.value?.toString()}
                        disabled={typeof result != 'undefined'}
                        style={{visibility: error ? 'hidden': 'visible'}}
                        type='checkbox' />
                        <div className={error ? "checkbox error": ""} />
                        {opt.text}
                    </div>                    
                    )
                }
            </div>
        </div>
        )
    }
    
    export default CheckboxContainer