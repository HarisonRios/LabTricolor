document.addEventListener("DOMContentLoaded", function () {
  const botaoIniciar = document.querySelector(".iniciar-quiz");
  const containerPerguntas = document.querySelector(".container-perguntas");
  const containerRespostas = document.querySelector(".container-respostas");
  const textoPergunta = document.querySelector(".pergunta");
  const proximaPergunta = document.querySelector(".proxima-pergunta");
  
  botaoIniciar.addEventListener("click", iniciarQuiz);
  proximaPergunta.addEventListener("click", mostrarProximaQuestao);
  
  let perguntaAtual = 0;
  let pontos = 0;
  
  function iniciarQuiz() {
    botaoIniciar.classList.add("hide");
    containerPerguntas.classList.remove("hide");
    mostrarProximaQuestao();
  }
  
  function mostrarProximaQuestao() {
    resetarQuiz();
  
    if (perguntas.length == perguntaAtual) {
      return acabarJogo();
    }
  
    textoPergunta.textContent = perguntas[perguntaAtual].pergunta;
  
    perguntas[perguntaAtual].respostas.forEach((respostas) => {
      const novaResposta = document.createElement("button");
      novaResposta.classList.add("button", "resposta");
      novaResposta.textContent = respostas.texto;
  
      if (respostas.correct) {
        novaResposta.dataset.correct = respostas.correct;
      }
      containerRespostas.appendChild(novaResposta);
  
      novaResposta.addEventListener("click", selecionarResposta);
    });
  }
  
  function resetarQuiz() {
    while (containerRespostas.firstChild) {
      containerRespostas.removeChild(containerRespostas.firstChild);
    }
  
    document.getElementById("imagem").innerHTML = ``;
    document.getElementById("info-usuario").innerHTML = "";
    proximaPergunta.classList.add("hide");
  }
  
  function selecionarResposta(event) {
    const respostaClickada = event.target;
  
    if (respostaClickada.dataset.correct) {
      pontos++;
      document.getElementById("info-usuario").innerHTML = "Você acertou! :)";
    } else {
      document.getElementById("info-usuario").innerHTML = "Você errou :(";
    }
  
    document.querySelectorAll(".resposta").forEach((button) => {
      if (button.dataset.correct) {
        button.classList.add("correct");
      } else {
        button.classList.add("incorrect");
      }
  
      button.disabled = true;
    });
  
    proximaPergunta.classList.remove("hide");
    perguntaAtual++;
  }

  
  function cadastrarPontos(pontos) {
    const idUsuario = sessionStorage.getItem("ID_USUARIO"); // Usando o getItem corretamente
    sessionStorage.setItem("Pontos", pontos); // Armazenando pontos no sessionStorage
    
    if (!idUsuario) {
      console.error("ID do usuário não encontrado.");
      return;
    }
    
    fetch("/quiz/cadastrarPontos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pontos: pontos, idUsuario: idUsuario }),
    })
    .then((response) => response.json()) 
    .then((data) => {
      console.log("Resposta do servidor:", data);
      if (data.error) {
        console.error("Erro ao cadastrar pontos:", data.error);
      } else {
        console.log("Pontos cadastrados com sucesso:", data);
      }
    })
    .catch((error) => {
      console.error("Erro ao cadastrar pontos:", error);
    });
  }   
  

  function acabarJogo() {
    const totalPerguntas = perguntas.length;
    const totalAcertos = (pontos / totalPerguntas) * 100;
  
    let mensagem = "";
  
    switch (true) {
      case totalAcertos >= 90:
        mensagem = "Parabéns você foi muito bem";
        break;
      case totalAcertos >= 70:
        mensagem = "Muito bom!";
        break;
      case totalAcertos >= 50:
        mensagem = "Você foi bem, nada mais que isso";
        break;
      default:
        mensagem = "Pode melhorar...";
    }
  
    containerPerguntas.innerHTML = `
    <p class="mensagem-final">
      Você acertou ${pontos} de ${totalPerguntas} perguntas!
      <span>Resultado: ${mensagem}</span>
    </p>
    <button onclick="window.location.reload()" class="button">
      Refazer Quiz
    </button>
    <button onclick="window.location.href='dashboard.html'" class="button">
      Visão Geral
    </button>
  `;
  
  
    cadastrarPontos(pontos);
  }
  
}); 
    
    



const perguntas = [
  {
    pergunta: "Em que ano o São Paulo Futebol Clube foi fundado?",
    respostas: [
      { texto: "1922", correct: false },
      { texto: "1930", correct: true },
      { texto: "1935", correct: false },
      { texto: "1940", correct: false },
    ],
  },
  {
    pergunta: "Qual é o estádio do São Paulo FC?",
    respostas: [
      { texto: "Maracanã", correct: false },
      { texto: "Arena Corinthians", correct: false },
      { texto: "Morumbi", correct: true },
      { texto: "Pacaembu", correct: false },
    ],
  },
  {
    pergunta: "Qual foi o ano do primeiro título mundial conquistado pelo São Paulo?",
    respostas: [
      { texto: "1993", correct: false },
      { texto: "1992", correct: true },
      { texto: "2005", correct: false },
      { texto: "2016", correct: false },
    ],
  },
  {
    pergunta: "Quem é o maior artilheiro da história do São Paulo FC?",
    respostas: [
      { texto: "Serginho Chulapa", correct: true },
      { texto: "Careca", correct: false },
      { texto: "Luisão", correct: false },
      { texto: "Raí", correct: false },
    ],
  },
  {
    pergunta: "Em qual ano o São Paulo venceu o seu terceiro Mundial de Clubes?",
    respostas: [
      { texto: "1999", correct: false },
      { texto: "2000", correct: false },
      { texto: "2010", correct: false },
      { texto: "2005", correct: true },
    ],
  },
  {
    pergunta: "Qual o nome do maior rival do São Paulo no futebol paulista?",
    respostas: [
      { texto: "Santos FC", correct: false },
      { texto: "Corinthians", correct: true },
      { texto: "Palmeiras", correct: false },
      { texto: "Flamengo", correct: false },
    ],
  },
  {
    pergunta: "Quantos títulos de Campeonato Brasileiro o São Paulo FC conquistou?",
    respostas: [
      { texto: "3", correct: false },
      { texto: "5", correct: false },
      { texto: "6", correct: true },
      { texto: "7", correct: false },
    ],
  },
  {
    pergunta: "Quem foi o técnico que comandou o São Paulo na conquista da Copa Libertadores em 2005?",
    respostas: [
      { texto: "Telê Santana", correct: false },
      { texto: "Paulo Autuori", correct: true },
      { texto: "Jorge Sampaoli", correct: false },
      { texto: "Cuca", correct: false },
    ],
  },
  {
    pergunta: "Em que ano o São Paulo ganhou o seu primeiro título de Copa do Brasil?",
    respostas: [
      { texto: "2023", correct: true },
      { texto: "2020", correct: false },
      { texto: "1999", correct: false },
      { texto: "2000", correct: false },
    ],
  },
  {
    pergunta: "Qual jogador do São Paulo FC é considerado um dos maiores ídolos da história do clube, conhecido por suas defesas e liderança?",
    respostas: [
      { texto: "Gilberto Silva", correct: false },
      { texto: "Raí", correct: false },
      { texto: "Careca", correct: false },
      { texto: "Rogério Ceni", correct: true },
    ],
  },
];
