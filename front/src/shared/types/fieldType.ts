import React from 'react';  
import { CalculatorStateType } from './calculatorStateType';
import { IFieldType } from '../../domain/abstract/iFieldType';

export type FieldType = {
    variableName: string;  
    label: string | React.ReactElement;
    category?: string;
    defaultValue?: number;
    isVisible?: (state: CalculatorStateType) => boolean;
    type?: IFieldType;
};
