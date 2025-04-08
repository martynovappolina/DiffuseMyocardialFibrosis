import React from 'react';
import './CustomRange.scss';

interface CustomRangeProps {
    disabled: boolean;
    max: number;
    min?: number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value: number;
}

const CustomRange: React.FC<CustomRangeProps> = ({ disabled, max, min = 0, onChange, value }) => {
    const sliderWidth = 350;

    const shift = max >= 1000 ? -3 : -1;

    const scaleArray = Array.from({ length: 6 }, (_, index) => (max - min) / (5) * index);

    return (
        <div className='custom-range'>
            <input 
            style={{ width: `${sliderWidth}px` }}
            type="range" 
            disabled={disabled}
            min={min} 
            max={max} 
            value={value || 0}
            onChange={onChange}
            />

            <div className='custom-range-scale'>
                {scaleArray.map((item, index) => 
                    <div 
                    key={index} 
                    style={{
                        position: 'absolute',
                        left: `${sliderWidth / 5 * index + shift * index}px`
                    }}>
                        {item}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomRange;

