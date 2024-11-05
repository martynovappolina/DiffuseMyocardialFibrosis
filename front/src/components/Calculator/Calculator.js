import { useEffect, useState } from 'react';
import CheckboxContainer from '../../components/CheckboxContainer/CheckboxContainer';
import InputContainer from '../../components/InputContainer/InputContainer';
import './Calculator.scss'
import {baseUrl} from '../../baseUrl'
import {objectToFormData} from '../../utils/objectToFormData'

const Calculator = ({fields, title, url, onNeedResult, calculateOnChageField=false}) => {
    const [result, setResult] = useState()
    const [state, setState] = useState();
    const [errorState, setErrorState] = useState({});

    const getInitState = () => {
        const initialState = {};
        
        fields.reduce((acc, curr) => {
            acc[curr.val] = curr.defaultValue ? curr.defaultValue: '';
            acc[`${curr.val}Error`] = false
            return acc;
        }, initialState);
        setResult()
        setState(initialState)
        setErrorState({})
    }

    const calculate = () => {
        const body = {}

        fields.reduce((acc, curr) => {
            let val = state[curr.val] === '' ? curr.checkbox? curr.defaultValue: 0: state[curr.val] 
            acc[curr.val] = val
            return acc
        }, body)

        let tempErrorState = {};
        let isError = false
        fields.map(f => {
            tempErrorState[`${f.val}Error`] = state[`${f.val}`] === '' 
            isError = isError || tempErrorState[`${f.val}Error`]
        })
        
        setErrorState(tempErrorState);

        if (isError && !calculateOnChageField) return

        if(onNeedResult !== undefined) {
            setResult(onNeedResult(body))
        }else{
            const bodyFormData = objectToFormData(body)
        
            fetch(`${baseUrl}${url}`, {
              method: 'POST',
              body: bodyFormData
            })
            .then(resp => resp.json())
            .then(resp => 
                setResult(resp.data.split('\n'))
            )    
        }
    }

    useEffect(()=>{
        getInitState()
    }, [])

    useEffect(()=>{
        if(calculateOnChageField && state != undefined){
            calculate()
        }
    }, [state])

    return(
        <div style={{paddingTop: '30px'}} className='container'>
            <div className='title'>{title}</div>
            {
                fields.map(field => <>
                    {
                        field.checkbox? 
                        <CheckboxContainer 
                        label={field.label}
                        option={state && state[field.val]}
                        setOption={v => {setState({...state, [field.val]: v})}}
                        optionLabels={field.optionLabels}
                        result={calculateOnChageField? undefined: result}
                        error={errorState && errorState[`${field.val}Error`]}
                        setError={()=>{
                            const initialState = errorState;
                            initialState[`${field.val}Error`] = false
                            setErrorState(prevState => ({
                                ...prevState,
                                ...initialState
                            }));
                        }}
                        />: 
                        
                        field.subtitle?
                        <div className='subtitle'>{field.label}</div>:

                        <InputContainer 
                        label={field.label}
                        unit={field.unit}
                        error={errorState && errorState[`${field.val}Error`]}
                        setError={()=>{
                            const initialState = errorState;
                            initialState[`${field.val}Error`] = false
                            setErrorState(prevState => ({
                                ...prevState,
                                ...initialState
                            }));
                        }}
                        value={state && state[field.val]}
                        setValue={v => {setState({...state, [field.val]: v})}}
                        result={calculateOnChageField? undefined: result}
                        />
                    }
                </>
                )
            }

            {calculateOnChageField ? '' : <>
                <div className='calculator-button-container'>
                    <button 
                    onClick={getInitState}
                    style={{marginRight: '15px'}}
                    className='button'>Сбросить</button>
                    {
                        result === undefined ? 
                        <button 
                        disabled={fields.filter(f => state && state[f.val] === '').length > 0}
                        onClick={calculate}
                        className='button'>
                        Рассчитать
                        </button>            
                        : null
                    }
                </div>
            </>}
            {
                result && <>{result.map(res => <div style={{marginTop: '10px'}}>{res}</div>)}</>
            }
        </div>
    )
}

export default Calculator