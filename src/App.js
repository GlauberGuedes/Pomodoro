import "./App.css";
import { useState } from "react";
import tiposDeCor from './utils/tipodecor';
import tiposDeFont from './utils/tipodefont';
import modoPadrao from './utils/modopadrao';
import Configuracao from './componentes/configuracao';
import Main from './componentes/main';
import Alarme from './componentes/alarme';

const inputDaConfiguracao = [
  {
    nome: "pomodoro",
    duracao: 25 * 60,
  },
  {
    nome: "short breack",
    duracao: 5 * 60,
  },
  {
    nome: "long breack",
    duracao: 15 * 60,
  },
];

function App() {
  const [inputConfiguracao, setInputConfiguracao] = useState(
    inputDaConfiguracao
  );
  const [modosBotao, setModosBotao] = useState(modoPadrao);
  const [botaoSelecionado, setBotaoSelecionado] = useState(modoPadrao[0].nome);
  const [tempo, setTempo] = useState(modoPadrao[0].duracao);
  const [ligado, setLigado] = useState(false);
  const [janelaConfiguracao, setJanelaConfiguracao] = useState(false);
  const [fontPomodoro, setFontPomodoro] = useState(tiposDeFont[0].nome);
  const [corPomodoro, setCorPomodoro] = useState(tiposDeCor[0].nome);

  return (
    <div
      className="container"
      style={{
        fontFamily: `${fontPomodoro}`,
        "--cor-que-muda": `${corPomodoro}`,
      }}
    >
      <Main 
        ligado={ligado}
        tempo={tempo}
        setTempo={setTempo}
        modosBotao={modosBotao}
        setLigado={setLigado}
        setBotaoSelecionado={setBotaoSelecionado}
        setJanelaConfiguracao={setJanelaConfiguracao}
        botaoSelecionado={botaoSelecionado}
      />
      <Configuracao
        setJanelaConfiguracao={setJanelaConfiguracao}
        inputConfiguracao={inputConfiguracao}
        setInputConfiguracao={setInputConfiguracao}
        setCorPomodoro={setCorPomodoro}
        setTempo={setTempo}
        setBotaoSelecionado={setBotaoSelecionado}
        setModosBotao={setModosBotao}
        setFontPomodoro={setFontPomodoro}
        janelaConfiguracao={janelaConfiguracao}
      />
      <Alarme
        tempo={tempo}
        setBotaoSelecionado={setBotaoSelecionado}
        setTempo={setTempo}
        setLigado={setLigado}
        inputConfiguracao={inputConfiguracao}
      />
    </div>
  );
}

export default App;
