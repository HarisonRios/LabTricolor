const pontuacao = sessionStorage.getItem('Pontos');
document.getElementById('ultimaPontuacao').textContent = pontuacao || '0';

const idUsuario = sessionStorage.getItem('ID_USUARIO');
if (idUsuario) {
  fetch(`/quiz/listarPontos`)
    .then(response => response.json())
    .then(data => {
      const ultimaPontuacao = data[0]["avg(qtdPontos)"];
      document.getElementById('mediaPontuacaoJogador').textContent = Math.floor(parseFloat(ultimaPontuacao));
    })
    .catch(error => console.error('Erro ao obter pontuação:', error));
} else {
  console.error('ID do usuário não encontrado na sessão.');
}

document.getElementById("b_usuario").textContent = sessionStorage.NOME_USUARIO || "Usuário";

function buscarPontuacao() {
fetch(`/grafico/buscarPontuacao`, { cache: 'no-store' })
.then(response => {
  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
  }
  return response.json();
})
.then(resposta => {
  if (resposta && resposta.length > 0) {
    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
    plotarGrafico(resposta);
  } else {
    console.error('Nenhum dado válido encontrado para o gráfico.');
  }
})
.catch(error => {
  console.error(`Erro na obtenção dos dados para o gráfico: ${error.message}`);
});
}


function plotarGrafico(resposta) {
  const labels = ['Categorias'];
  const dados = {
    labels: labels,
    datasets: [
      {
        label: 'Até 10',
        data: [resposta[0].ate_10],
        backgroundColor: 'rgb(105,105,105)',
        borderColor: 'rgb(105,105,105)',
      },
      {
        label: 'Até 15',
        data: [resposta[0].ate_15],
        backgroundColor: 'rgb(218,165,32)',
        borderColor: 'rgb(218,165,32)',
      },
      {
        label: '16',
        data: [resposta[0].ate_16],
        backgroundColor: 'rgb(199, 52, 52)',
        borderColor: 'rgb(199, 52, 52)',
      }
    ]
  };

  const config = {
    type: 'bar',
    data: dados,
    options: {
      scales: {
        x: { beginAtZero: true },
        y: { beginAtZero: true }
      }
    }
  };

  new Chart(document.getElementById('myChart2'), config);
}