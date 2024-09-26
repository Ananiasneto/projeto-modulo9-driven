import { useState } from 'react'
import styled from 'styled-components'
import icone_certo from "..//assets/icone_certo.png";
import icone_errado from "../assets/icone_erro.png";
import icone_quase from "../assets/icone_quase.png";
import playImage from '../assets/seta_play.png'
import imagemVirar from '../assets/seta_virar.png'
import Feedback from './FeedBack';



export default function Flashcard({pergunta,resposta,index,setConcluidas,concluidas}){
   const [questao,setQuestao]=useState('pergunta ' +(index+1)); 
   const [imagem,setImagem]=useState(playImage);
   const [respondida,setRespondida]=useState(false);
   const [controle,setControle]=useState(false);
   const [cor,setCor]=useState('');
   const test=(imagem!==playImage && respondida===true) ? true:false ;

   function selecionado(){
    setQuestao(pergunta);
    setImagem(imagemVirar);
   }
   function pedeFeedBack(){
    setQuestao(resposta);
    setRespondida(true);
   }

   function mudaCor(imagem) {
    setConcluidas(concluidas+1); 
    if (imagem === icone_errado) {
        setCor('escolhidaErrada');
    } else if (imagem === icone_certo) {
        setCor('escolhidaCerta');
    } else if (imagem === icone_quase) {
        setCor('escolhidaQuase');
    }
}
   return (
    
   <>
<Pergunta  test={test} imagem={imagem} respondida={respondida} playImage={playImage}>


    <h1 className={cor} >{questao}</h1>
    
    <button onClick={(imagem===playImage) ? selecionado : pedeFeedBack} className={(respondida) ? 'botao feed' : 'botao'}>
        <img className="imgBotao" src={imagem} alt="" />
       
    </button>
    <div className={(!respondida) ? 'feed' : ''}>
        <Feedback index={index} setQuestao={setQuestao} setControle={setControle} icone_certo={icone_certo} icone_errado={icone_errado} icone_quase={icone_quase} mudaCor={mudaCor}/>
    </div>
   </Pergunta>
   </> 
    )
}
const Pergunta = styled.div`
background-color: #FFFFFF;
display: flex;
justify-content: space-between;
align-items: center;
width: 300px;
height: 65px;
margin-bottom: 25px;
border-radius: 5px;
padding-right: 15px;
padding-left: 15px;

h1 {
  font-family: "Recursive", sans-serif;
  font-weight: 700;
  font-size: 16px;
}
${({ test, imagem, respondida, playImage }) => {

  if (!test) {
    if (imagem === playImage) {
      console.log('Entrou na condição de playImage');
      return ``;
    } else {
      console.log('Entrou na condição de imagem diferente');
      return `
          height: 131px;
          background-color: #ffffd4;

          h1 {
            font-family: "Recursive", sans-serif;
            font-weight: 400;
            font-size: 18px;
            line-height: 21.6px;
          }

          .botao {
            align-self: flex-end;
            margin-right: 15px;
          }

          .imgBotao {
            width: 30px;
          }
      `
      ;
    }
  } else {
    if (respondida) {
      console.log('Entrou na condição de respondida');
      return `
        background-color: #ffffd4;
        padding-top: 13px;
        display: block;
        height: auto;
        padding-bottom: 10px;
      `;
    } else {
      console.log('Entrou na condição de não respondida');
      return ``;
    }
  }
}}
`;
