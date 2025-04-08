import React, { useEffect } from 'react';
import './InputWithRange.scss';
import { FieldType } from '../../../types/fieldType.tsx';
import CustomRange from '../CustomRange/CustomRange.tsx';
import { InputWithRangeType } from '../../../../domain/fieldTypes/inputWithRangeType.ts';

interface InputWithRangeProps {
    field: FieldType
    value: string
    setValue: (value: string) => void
    error: boolean
    setError: (error: boolean) => void
    result?: any
}

const InputWithRange : React.FC<InputWithRangeProps> = ({
    field,
    value,
    setValue,
    error,
    setError,
    result,
}) => {
    useEffect(() => {
        setError(false)
        if (field.type instanceof InputWithRangeType) {
            if (Number(value) > field.type.max) setValue(field.type.max.toString())
            const min = field.type.min ? field.type.min : 0
            if (min && Number(value) < min) setValue(min.toString())
        }
    }, [value])

    return <div className='input-with-range'>
        <h3>{field.label}</h3>
    
        <div className='input-with-range-grid'>
            <div className='input-with-unit'>
                <input
                value={value}
                placeholder='0'
                type='number'
                onChange={(e) => setValue(e.target.value)}
                onFocus={() => setError(false)}
                disabled={typeof result !== 'undefined'}
                className={error ? 'error' : ''}
                />
                <div className='unit'>{field.type instanceof InputWithRangeType? field.type.unit: ''}</div>
            </div>

            <CustomRange
            disabled={typeof result !== 'undefined'}
            max={field.type instanceof InputWithRangeType ? field.type.max: 0}
            min={field.type instanceof InputWithRangeType && field.type.min ? field.type.min: 0}
            onChange={(e) => setValue(e.target.value)}
            value={Number(value)}
            />
        </div>
    </div>
}

export default InputWithRange;