import tiposDeCor from '../../utils/tipodecor';
import tiposDeFont from '../../utils/tipodefont';
import modoPadrao from '../../utils/modopadrao';
import {useState, useRef} from 'react';



export default function Configuracao({setJanelaConfiguracao, inputConfiguracao, setInputConfiguracao, setCorPomodoro, setTempo, setBotaoSelecionado, setModosBotao, setFontPomodoro, janelaConfiguracao}) {
    const [fontFocus, setFontFocus] = useState(tiposDeFont[0].nome);
    const [corFocus, setCorFocus] = useState(tiposDeCor[0].nome);
    const corConfig = useRef(tiposDeCor[0].nome);
    const fontConfig = useRef(tiposDeFont[0].nome);
    const inputConfigTempo = useRef(modoPadrao[0].duracao);
    const inputConfigModo = useRef(modoPadrao[0].nome);


    return (
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
              {tiposDeFont.map((modo) => {
                return (
                  <button
                    key={modo.nome}
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
              {tiposDeCor.map((modo) => {
                return (
                  <button
                    key={modo.nome}
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
    )
}