import "./App.css";
import { useEffect, useState, useRef } from "react";

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

const modoPadrao = [
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

const tiposDeFont = [
  {
    nome: '"Kumbh Sans", sans serif',
  },
  {
    nome: '"Roboto Slab", serif',
  },
  {
    nome: '"Space Mono", monospace',
  },
];

const tiposDeCor = [
  {
    nome: "var(--vermelho)",
  },
  {
    nome: "var(--ciano)",
  },
  {
    nome: "var(--roxo)",
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
  const [modosFont, setModosFont] = useState(tiposDeFont);
  const [modosCor, setModosCor] = useState(tiposDeCor);
  const [janelaConfiguracao, setJanelaConfiguracao] = useState(false);
  const [fontPomodoro, setFontPomodoro] = useState(tiposDeFont[0].nome);
  const [corPomodoro, setCorPomodoro] = useState(tiposDeCor[0].nome);
  const corConfig = useRef(tiposDeCor[0].nome);
  const [corFocus, setCorFocus] = useState(tiposDeCor[0].nome);
  const fontConfig = useRef(tiposDeFont[0].nome);
  const [fontFocus, setFontFocus] = useState(tiposDeFont[0].nome);
  const inputConfigTempo = useRef(modoPadrao[0].duracao);
  const inputConfigModo = useRef(modoPadrao[0].nome);


  const minutos = String(Math.floor(tempo / 60)).padStart(2, "0");
  const segundos = String(tempo % 60).padStart(2, "0");
  const intervalId = useRef();

  useEffect(() => {
    if (ligado) {
      if(tempo > 0) {
      intervalId.current = setInterval(
        () => setTempo((tempoanterior) => tempoanterior - 1),
        1000
      );
      }
    }
    return () => clearInterval(intervalId.current);
  }, [ligado, tempo]);

  return (
    <div
      className="container"
      style={{
        fontFamily: `${fontPomodoro}`,
        "--cor-que-muda": `${corPomodoro}`,
      }}
    >
      <h1>Pomodoro</h1>
      <div className="botoes-tempo">
        {modosBotao.map((modo) => {
          return (
            <button
              className={
                botaoSelecionado === modo.nome ? "botao-selecionado" : ""
              }
              onClick={() => {
                setBotaoSelecionado(modo.nome);
                setTempo(modo.duracao);
                setLigado(false);
              }}
            >
              {modo.nome}
            </button>
          );
        })}
      </div>
      <div className="relogio-fundo">
        <div className="relogio">
          <div className="tempo">
            {minutos}:{segundos}
          </div>
          <button onClick={() => setLigado(!ligado)}>
            {ligado ? "PAUSE" : "START"}
          </button>
        </div>
      </div>
      <button
        title="abrir configuração"
        aria-label="abrir configuração"
        onClick={() => setJanelaConfiguracao(true)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28">
          <path
            fill="#D7E0FF"
            d="M26.965 17.682l-2.927-2.317c.055-.448.097-.903.097-1.365 0-.462-.042-.917-.097-1.365l2.934-2.317a.702.702 0 00.167-.896l-2.775-4.851a.683.683 0 00-.847-.301l-3.454 1.407a10.506 10.506 0 00-2.345-1.379l-.52-3.71A.716.716 0 0016.503 0h-5.55a.703.703 0 00-.687.588l-.52 3.71c-.847.357-1.63.819-2.345 1.379L3.947 4.27a.691.691 0 00-.847.301L.325 9.422a.705.705 0 00.167.896l2.927 2.317c-.055.448-.097.903-.097 1.365 0 .462.042.917.097 1.365L.492 17.682a.702.702 0 00-.167.896L3.1 23.429a.683.683 0 00.847.301L7.4 22.323a10.506 10.506 0 002.345 1.379l.52 3.71c.056.329.34.588.687.588h5.55a.703.703 0 00.687-.588l.52-3.71c.847-.357 1.631-.819 2.346-1.379l3.454 1.407c.313.119.673 0 .847-.301l2.775-4.851a.705.705 0 00-.167-.896zM13.73 18.9c-2.685 0-4.857-2.191-4.857-4.9 0-2.709 2.172-4.9 4.857-4.9 2.684 0 4.856 2.191 4.856 4.9 0 2.71-2.172 4.9-4.856 4.9z"
            opacity=".5"
          />
        </svg>
      </button>
      <div
        className={
          janelaConfiguracao
            ? "configuracao-fundo"
            : "configuracao-fundo-fechada"
        }
      >
        <div className="configuracao">
          <div className="titulo">
            <h2>Settings</h2>
            <button
              title="fechar configuração"
              aria-label="fechar configuração"
              onClick={() => setJanelaConfiguracao(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14">
                <path
                  fill="#1E213F"
                  fillRule="evenodd"
                  d="M11.95.636l1.414 1.414L8.414 7l4.95 4.95-1.414 1.414L7 8.414l-4.95 4.95L.636 11.95 5.586 7 .636 2.05 2.05.636 7 5.586l4.95-4.95z"
                  opacity=".5"
                />
              </svg>
            </button>
          </div>
          <div className="configuracao-tempo">
            <h3>TIME (MINUTES)</h3>
            <div className="inputs">
              {inputConfiguracao.map((modo) => {
                return (
                  <div className="input-tempo" key={modo.nome}>
                    <label htmlFor={modo.nome}>{modo.nome}</label>
                    <input
                      id={modo.nome}
                      type="number"
                      min={1}
                      value={modo.duracao / 60}
                      onChange={(e) => {
                        setInputConfiguracao((botao) => {
                          return botao.map((novoModo) => {
                            if (novoModo.nome === modo.nome) {
                              return {
                                ...novoModo,
                                duracao: e.target.valueAsNumber * 60,
                              };
                            } else {
                              return novoModo;
                            }
                          });
                        });
                        inputConfigTempo.current = e.target.valueAsNumber * 60;
                        inputConfigModo.current = modo.nome;
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="fonts">
            <h3>FONT</h3>
            <div className="opcoes-font">
              {modosFont.map((modo) => {
                return (
                  <button
                    className={
                      fontFocus === modo.nome ? "font-selecionada" : ""
                    }
                    style={{ fontFamily: `${modo.nome}` }}
                    onClick={() => {
                      fontConfig.current = modo.nome;
                      setFontFocus(modo.nome);
                    }}
                  >
                    Aa
                  </button>
                );
              })}
            </div>
          </div>
          <div className="cores">
            <h3>COLORS</h3>
            <div className="opcoes-cores">
              {modosCor.map((modo) => {
                return (
                  <button
                    style={{ backgroundColor: `${modo.nome}` }}
                    onClick={() => {
                      corConfig.current = modo.nome;
                      setCorFocus(modo.nome);
                    }}
                  >
                    <svg
                      className={corFocus === modo.nome ? "" : "sem-svg"}
                      width="15"
                      height="11"
                      viewBox="0 0 15 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 5.5L4.95263 9.45263L13.4053 1"
                        stroke="#161932"
                        strokeWidth="2"
                      />
                    </svg>
                  </button>
                );
              })}
            </div>
          </div>
          <button
            className="apply"
            onClick={() => {
              setCorPomodoro(corConfig.current);
              setJanelaConfiguracao(false);
              setTempo(inputConfigTempo.current);
              setBotaoSelecionado(inputConfigModo.current);
              setModosBotao(inputConfiguracao);
              setFontPomodoro(fontConfig.current);
            }}
          >
            Apply
          </button>
        </div>
      </div>
      <div className="alarme" style={{display: tempo === 0 ? "" : "none"}}>
        <div className="botao-alarme">
            <button onClick={() => {
              setBotaoSelecionado(modoPadrao[0].nome);
              setTempo(modoPadrao[0].duracao);
              setLigado(false);
            }}>Dispensar</button>
        </div>
      </div>
    </div>
  );
}

export default App;
