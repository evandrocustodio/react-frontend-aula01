import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from './alunos.png';
import './App.css';

type Aluno = {
  id: number;
  nome: string;
}
const AZURE_APP_NAME = "app-spring-boot.azurewebsites.net";
const API_URL = `https://${AZURE_APP_NAME}/`;
const App = () => {


  const api = axios.create({
    baseURL: API_URL,
  });

  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [erros, setErros] = useState<boolean>(false);

  useEffect(() => {
    api
      .get("/alunos")
      .then((a) => {
        setAlunos(a.data);
      })
      .catch((e) => {
        console.log("Não foi possivel carrregar lista de alunos");
        setErros(true);
      });
  }, []);


  return (
    <div className="App">
      <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
        <p>LISTAGEM DE ALUNOS </p>

        {erros && <div>Erro de conexão com o backend</div>}
        <div style={{width: '700px'}}>
        {alunos &&<div style={{display:'flex', justifyContent:'space-between', width:'100%', color:'yellow'}}>
                <div>ID</div>
                <div> NOME</div>
              </div>}
        {alunos &&
          alunos.map((a) => (
            <>            
              <div style={{display:'flex', justifyContent:'space-between', width:'100%'}}>
                <div>{a.id.toString().padStart(5,'0')}</div>
                <div > {a.nome}</div>
              </div>
            </>
          ))}
          </div>
      </header>
    </div>
  );
}

export default App;

