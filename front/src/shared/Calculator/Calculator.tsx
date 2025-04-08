import React, { useEffect, useState } from 'react';
import CheckboxContainer from './components/CheckboxContainer/CheckboxContainer.tsx';
import InputContainer from './components/InputContainer/InputContainer.tsx';
import './Calculator.scss';
import { categoriesWithDescription } from '../categoriesWithDescription.ts';
import { DataType } from '../types/dataType.ts';
import { CalculatorStateType } from '../types/calculatorStateType.ts';
import { AccordionItemType } from '../types/accordionItemType.ts';
import { ErrorStateType } from '../types/errorStateType.ts';
import { FieldType } from '../types/fieldType.ts';
import InputWithRange from './components/InputWithRange/InputWithRange.tsx';
import { OptionsView } from '../enums/optionsView.ts';
import { CheckboxType } from '../../domain/fieldTypes/checkboxType.ts';
import { InputWithRangeType } from '../../domain/fieldTypes/inputWithRangeType.ts';
import { InputWithUnitValueType } from '../../domain/fieldTypes/inputWithUnitValueType.ts';
import { InputWithUnitOptionsType } from '../../domain/fieldTypes/inputWithUnitOptionsType.ts';


interface CalculatorProps {
    fields: DataType;
    calculate: (body: CalculatorStateType) => any;
    calculateOnChageField?: boolean;
}

const Calculator: React.FC<CalculatorProps> = ({ fields = [], calculate, calculateOnChageField = false }) => {
    const [result, setResult] = useState<any>();
    const [state, setState] = useState<CalculatorStateType>({});
    const [errorState, setErrorState] = useState<ErrorStateType>({});

    const [categories, setCategories] = useState<AccordionItemType[]>(() =>
        [...new Set(fields.map(field => field.category).filter((x): x is string => x != null))]
            .map(x => ({ title: x, accordionIsOpen: true }))
    );

    const getInitState = () => {
        const initialState: CalculatorStateType = {};
        fields.reduce((acc, curr) => {
            acc[curr.variableName] = '';
            acc[`${curr.variableName}Error`] = false;
            if (curr.type instanceof InputWithUnitValueType) acc[`${curr.variableName}UnitValue`] = curr.type.unitValue;
            else if (curr.type instanceof InputWithUnitOptionsType) acc[`${curr.variableName}UnitValue`] = curr.type.unitOptions[0].value;
            return acc;
        }, initialState);
        setResult(undefined);
        setState(initialState);
        setErrorState({});
    };

    const getResult = () => {
        const body: CalculatorStateType = {};

        fields.reduce((acc, curr) => {
            let val = state?.[curr.variableName] === '' ? (curr.type instanceof CheckboxType && curr.type.options?.length ? curr.defaultValue : 0) : state?.[curr.variableName];
            acc[curr.variableName] = val;
            if (curr.category) acc[`${curr.variableName}Category`] = curr.category;
            if (state?.[`${curr.variableName}UnitValue`]) acc[`${curr.variableName}UnitValue`] = state?.[`${curr.variableName}UnitValue`];
            return acc;
        }, body);

        let tempErrorState: ErrorStateType = {};
        let isError = false;
        fields.forEach(f => {
            if (f.isVisible === undefined || (f.isVisible !== undefined && f.isVisible(state))) {
                tempErrorState[`${f.variableName}Error`] = state?.[`${f.variableName}`] === '' && f.defaultValue === undefined;
                isError = isError || tempErrorState[`${f.variableName}Error`];
            }
        });

        setErrorState(tempErrorState);

        if (isError && !calculateOnChageField) {  
            const fieldsWithError = fields.filter(f => tempErrorState[`${f.variableName}Error`]);  
            const elements = fieldsWithError.map(f => {  
                const labelDiv = Array.from(document.querySelectorAll('div.custom-label')).find(div => div.textContent?.trim() === f.label);  
                return labelDiv ? labelDiv.parentElement : null; 
            }).filter(el => el != null); 
        
            if (elements.length > 0) {  
                const top = Math.min(...elements.map(el => el.getBoundingClientRect().top)); 
                window.scrollTo({ top: top - 100, behavior: 'smooth' });  
            }  
        
            return;  
        }  

        setResult(calculate(body));
    };

    useEffect(() => {
        getInitState();
    }, []);

    useEffect(() => {
        if (calculateOnChageField && state !== undefined) {
            getResult();
        }
    }, [state]);

    const fieldRender = (field: FieldType) => {
        if (state && (field.isVisible === undefined || (field.isVisible !== undefined && field.isVisible(state))))
            return (
                <>
                    {field.type instanceof CheckboxType  ? (
                        <CheckboxContainer
                            label={field.label}
                            option={state && state[field.variableName]}
                            column={field.type.optionsView === OptionsView.column}
                            setOption={(v: number) => { setState({ ...state, [field.variableName]: v }) }}
                            optionLabels={field.type.options}
                            result={calculateOnChageField ? undefined : result}
                            error={errorState && errorState[`${field.variableName}Error`]}
                            setError={() => {
                                const initialState = errorState;
                                initialState[`${field.variableName}Error`] = false;
                                setErrorState(prevState => ({
                                    ...prevState,
                                    ...initialState
                                }));
                            }}
                        />
                    ) : field.type instanceof InputWithRangeType ? 
                    
                    <InputWithRange
                    field={field}
                    error={errorState && errorState[`${field.variableName}Error`]}
                    setError={() => {
                        const initialState = errorState;
                        initialState[`${field.variableName}Error`] = false;
                        setErrorState(prevState => ({
                            ...prevState,
                            ...initialState
                        }));
                    }}
                    value={state && state[field.variableName]}
                    setValue={(v: any) => { setState({ ...state, [field.variableName]: v }) }}
                    /> : 

                    <InputContainer
                    field={field}
                    error={errorState && errorState[`${field.variableName}Error`]}
                    setError={() => {
                        const initialState = errorState;
                        initialState[`${field.variableName}Error`] = false;
                        setErrorState(prevState => ({
                            ...prevState,
                            ...initialState
                        }));
                    }}
                    value={state && state[field.variableName]}
                    setValue={(v: any) => { setState({ ...state, [field.variableName]: v }) }}
                    unitValue={state && state[`${field.variableName}UnitValue`]}
                    setUnitValue={(v: any) => { setState({ ...state, [`${field.variableName}UnitValue`]: v }) }}
                    result={calculateOnChageField ? undefined : result}
                    />
                    }
                </>
            );
    };

    return (
        <div style={{ paddingTop: '15px' }}>
            {fields?.filter(f => !f.category).map(fieldRender)}
            {categories.length > 0 ? categories.map(x => {
                const descriptions = categoriesWithDescription.filter(c => c.title === x.title);

                return (
                    <>
                        <div
                            onClick={() => setCategories(c => [...c.map(y => y.title === x.title ? { ...y, accordionIsOpen: !y.accordionIsOpen } : y)])}
                            className='category-header'>
                            <h2>{x.title}</h2>
                            <div className={`arrow ${x.accordionIsOpen ? 'down' : 'up'}`} />
                        </div>
                        {x.accordionIsOpen && (
                            <div>
                                {descriptions.length !== 0 && <p className='description'>{descriptions[0].description}</p>}
                                {fields?.filter(f => f.category === x.title).sort((a, b) => a.label.toString().localeCompare(b.label.toString())).map(fieldRender)}
                            </div>
                        )}
                    </>
                );
            }) : null}
            {!calculateOnChageField && (
                <>
                    <div className='calculator-button-container'>
                        <button onClick={getInitState} style={{ marginRight: '15px' }}>Сбросить</button>
                        {result === undefined ? (
                            <button onClick={getResult}>
                                Рассчитать
                            </button>
                        ) : null}
                    </div>
                </>
            )}
            {result && (
                <>
                    <div style={{ margin: '20px 0' }}>{result}</div>
                </>
            )}
        </div>
    );
};

export default Calculator;
