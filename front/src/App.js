import './App.css';
import { fields } from './data.tsx';
import Calculator from './shared/Calculator/Calculator.tsx';
import {runONNXModel} from './utils/runONNXModel.ts';

function App() {

  async function calculate(data) {
    const result = await runONNXModel({
      'Пол': 0,
      'Galectin3': data.galectin3,
      'PIIINP': data.piiinp,
      'TGF1b': data.tgfb1,
      'Длительность_заболевания': data.diseaseDuration,
      'ИФР1': data.igf1,
      'МЖП': data.septalThickness,
      'ЗС': data.posteriorWallThickness,
      'КДР': data.endDiastolicSize,
      'ИММЛЖ': data.myocardialMassIndex,
      'КДО': data.endDiastolicVolume,
      'КСО': 0,
      'ФВ': data.ejectionFraction
    }, (window.location.hostname === 'diabet.endocrincentr.ru' ? 'https://www.endocrincentr.ru/sites/default/files/all/Calc_23/' : './') + 'random_forest_model.onnx')

    return <div>
      {result == 1 ? 'Прогнозируется наличие отсроченного диффузного накопления миокарда. Вероятность правильного прогноза от 89% до 100%.': 
      'Прогнозируется отсутствие отсроченного диффузного накопления миокарда. Вероятность правильного прогноза от 54% до 100%.'}
    </div>
  }

  return (
    <>
      <h1>Оценка вероятности наличия диффузного миокардиального интерстициального фиброза при акромегалии</h1>
      <Calculator fields={fields} calculate={async (data) => {return await calculate(data)}}/>
    </>
  )
}

export default App;
