import api from'./sistema cep/api';
import { useState } from 'react';
import './edicao.css';
import { FiCheck } from 'react-icons/fi';

function App() {

const [input, setInput] = useState('')
const {cep, setCep} = useState({});

async function procuracep(){
  if(input === ''){
    alert("Insira um CEP!!!")
    return;
  }

  try{
    const response = await api.get(`${input}/json`);
    setCep(response.data);
    setInput("");
  }catch{
    alert("Ops algo errado ocorreu")
    setInput("")
  }

}
  return (
    <div className="container">
      <h1 className="titulo">Buscador CEP</h1>

      <div className="containerinput">
       <input
       type="text"
       placeholder="Digite seu cep..."
       value={input}
       onChange={(e) => setInput(e.target.value)}
       />

<button className="botaoprocurar" onClick={procuracep}>
    <FiCheck size={25} color="#000"/>
</button>
      </div>

      
    {Object.keys(cep).length > 0 && (
      <main className="main">
        <h2> CEP: {cep.cep}</h2>
        <span>{cep.logradouro}</span>
        <span>Complemento:{cep.complemento}</span>
        <span>{cep.bairro}</span>
        <span>{cep.localidade} - {cep.uf}</span>
        
    </main>
    )}
    </div>
  );

}

export default App;