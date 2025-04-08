import React, { useEffect, useState, useRef } from 'react'
import CustomDropdown from '../CustomDropdown/CustomDropdown'
import './InputContainer.scss'
import { FieldType } from '../../../types/fieldType'
import { InputTypeBase } from '../../../../domain/fieldTypes/inputTypeBase'
import { InputWithUnitOptionsType } from '../../../../domain/fieldTypes/inputWithUnitOptionsType'

interface InputContainerProps {
    field: FieldType
    unitValue: number
    setUnitValue: (value: string) => void
    value: string
    setValue: (value: string) => void
    error: boolean
    setError: (error: boolean) => void
    result?: any
}

const InputContainer: React.FC<InputContainerProps> = ({
    field,
    unitValue,
    setUnitValue,
    value,
    setValue,
    error,
    setError,
    result,
}) => {
    const descriptionBubbleRef = useRef<HTMLDivElement>(null)
    const [descriptionBubbleWidth, setDescriptionBubbleWidth] = useState(0)
    const [descriptionIsVisible, setDescriptionIsVisible] = useState(false)

    useEffect(() => {
        if (descriptionBubbleRef.current) {
            setDescriptionBubbleWidth(descriptionBubbleRef.current.getBoundingClientRect().width)
        }
    }, [descriptionBubbleRef.current, value])

    return (
        <div className='input-container row'>
            <div className='custom-label'> {field.label} </div>
            <div className='input-container-box'>
                <div className='input-box'>
                    <input
                    value={value}
                    placeholder='0'
                    type='number'
                    onChange={(e) => setValue(e.target.value)}
                    onFocus={() => {
                        setError(false)
                        setDescriptionIsVisible(true)
                    }}
                    onMouseOver={() => setDescriptionIsVisible(true)}
                    onMouseLeave={() => setDescriptionIsVisible(false)}
                    disabled={typeof result !== 'undefined'}
                    className={error ? 'error' : ''}
                    />

                    <div
                    ref={descriptionBubbleRef}
                    style={{ 
                        visibility: field.type instanceof InputTypeBase && field.type.popoverUnitDescription && descriptionIsVisible ? 'visible': 'hidden',
                        left: `calc(50% - ${descriptionBubbleWidth / 2}px)` 
                    }}
                    className='description-bubble'
                    >
                        {value ? (parseFloat(value) / unitValue).toFixed(2) : 0}
                        {field.type instanceof InputTypeBase && field.type.popoverUnitDescription}
                    </div>
                </div>

                {field.type instanceof InputTypeBase && field.type.unit && <div className='unit'>{field.type?.unit}</div>}
                {field.type instanceof InputWithUnitOptionsType && (
                    <CustomDropdown
                    value={unitValue}
                    setValue={setUnitValue}
                    options={field.type.unitOptions}
                    />
                )}
            </div>
        </div>
    )
}

export default InputContainer
