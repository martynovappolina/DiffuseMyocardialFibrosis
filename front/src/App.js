import './App.css';
import { fields } from './data.tsx';
import Calculator from './shared/Calculator/Calculator.tsx';

function App() {
  return (
    <>
      <h1>Оценка вероятности наличия диффузного миокардиального интерстициального фиброза при акромегалии</h1>
      <Calculator fields={fields} />
    </>
  )
}

export default App;
