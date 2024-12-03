const URL_TABELA = 'https://api.api-futebol.com.br/v1/campeonatos/10/tabela';
const API_KEY = 'live_f8452473c652d99eebadb5c5f8935b';

// Função para obter a tabela do Brasileirão
async function obterTabela() {
    const resp = await fetch(URL_TABELA, {
        headers: {
            'Authorization': `Bearer ${API_KEY}`
        }
    });
    if (resp.status === 200) {
        const data = await resp.json();
        console.log(data); 
        return data;
    } else {
        console.error(`Erro: ${resp.status} - ${resp.statusText}`);
        return null;
    }
}
// Função para mostrar a tabela e os próximos jogos no HTML
async function mostrarTabelaEJogos() {
    const tabela = await obterTabela();
    const tabelaElement = document.getElementById('tabela');

    // FUNCÃO PARA MOSTRAR A TABELA
    if (tabela) {
        tabela.slice(0, 20).forEach(time => {
            const timeElement = document.createElement('div');
            timeElement.innerHTML = `
                <img src="${time.time.escudo}" alt="Escudo do ${time.time.nome_popular}" width="50">
                <span>${time.posicao}º - ${time.time.nome_popular} - ${time.pontos} pontos</span>
            `;
            tabelaElement.appendChild(timeElement);
        });
    }
}






mostrarTabelaEJogos();
