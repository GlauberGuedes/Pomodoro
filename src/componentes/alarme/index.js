import { useEffect, useRef } from "react";
import despertador from "../../assets/despertador.mp3";

export default function Alarme({
  tempo,
  setBotaoSelecionado,
  setTempo,
  setLigado,
  inputConfiguracao,
}) {
  const refAudio = useRef();

  useEffect(() => {
    if (tempo === 0) {
      refAudio.current.play();
    }
  }, [tempo]);

  return (
    <div className="alarme" style={{ display: tempo === 0 ? "" : "none" }}>
      <audio controls ref={refAudio}>
        <source src={despertador} />
      </audio>
      <div className="botao-alarme">
        <button
          onClick={() => {
            setBotaoSelecionado(inputConfiguracao[0].nome);
            setTempo(inputConfiguracao[0].duracao);
            setLigado(false);
            refAudio.current.pause();
            refAudio.current.currentTime = 0;
          }}
        >
          Dispensar
        </button>
      </div>
    </div>
  );
}
