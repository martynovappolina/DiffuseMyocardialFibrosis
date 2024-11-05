import './App.css';
import Header from './components/Header/Header'
import Calculator from './components/Calculator/Calculator';
import { fields } from './data';

function App() {
  return (
    <>
      <Header />
      <div>
        <div className='title'>Оценка вероятности наличия диффузного миокардиального фиброза при акромегалии</div>
        <Calculator fields={fields} url='predict/' />
      </div>
    </>
  )
}

export default App;
