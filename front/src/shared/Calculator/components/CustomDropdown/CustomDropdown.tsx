import React from 'react';
import './CustomDropdown.scss';
import { Option } from '../../../types/option';

interface CustomDropdownProps {
    label?: string;
    options: Option[];
    value: string | number;
    setValue: (value: string) => void;
    disabled?: boolean;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ label, options, value, setValue, disabled }) => {
    return (
        <div 
        style={{display: label ? 'grid' : 'inline-block'}}
        className='custom-dropdown-container'>
            {label && <div className='custom-label'>{label}</div>}
            <select
            onChange={option => setValue(option.target.value)}
            disabled={disabled}
            >
                {
                    options.map(option => 
                        <option 
                        key={option.text}
                        selected={option.value === value}
                        value={option.value}>{option.text}</option>
                    )
                }
            </select> 
        </div>       
    );
}

export default CustomDropdown;
