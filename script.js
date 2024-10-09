async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

async function renderChart1() {
  const data = await fetchData("https://sua-api.com/endpoint-grafico1"); // Substitua pela sua URL
  const ctx = document.getElementById("chart1").getContext("2d");
  const chart1 = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Vitórias", "Derrotas"],
      datasets: [
        {
          label: "Porcentagem",
          data: [data.vitorias, data.derrotas], // Assumindo que a API retorna esses campos
          backgroundColor: ["#42A5F5", "#FF6384"],
        },
      ],
    },
  });
}

async function renderChart2() {
  const data = await fetchData("https://sua-api.com/endpoint-grafico2"); // Substitua pela sua URL
  const ctx = document.getElementById("chart2").getContext("2d");
  const chart2 = new Chart(ctx, {
    type: "line",
    data: {
      labels: data.dias, // Assumindo que a API retorna um array de dias
      datasets: [
        {
          label: "Consultas",
          data: data.consultas, // Assumindo que a API retorna um array de valores
          borderColor: "#42A5F5",
          fill: false,
        },
      ],
    },
  });
}

async function renderChart3() {
  const data = await fetchData("https://sua-api.com/endpoint-grafico3"); // Substitua pela sua URL
  const ctx = document.getElementById("chart3").getContext("2d");
  const chart3 = new Chart(ctx, {
    type: "pie",
    data: {
      labels: data.cartas, // Assumindo que a API retorna um array de nomes de cartas
      datasets: [
        {
          label: "Comparação",
          data: data.valores, // Assumindo que a API retorna um array de valores
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        },
      ],
    },
  });
}

async function renderJogadores() {
  const data = await fetchData("https://sua-api.com/endpoint-jogadores"); // Substitua pela sua URL
  const jogadoresInfoDiv = document.getElementById("jogadores-info");

  // Limpa conteúdo anterior
  jogadoresInfoDiv.innerHTML = '';

  // Loop através dos jogadores e suas batalhas
  data.jogadores.forEach(jogador => {
    const jogadorDiv = document.createElement('div');
    jogadorDiv.classList.add('jogador');

    // Exibe informações básicas do jogador
    jogadorDiv.innerHTML = `
      <h3>Nickname: ${jogador.nickname}</h3>
      <p>Tempo de Jogo: ${jogador.tempo_jogo}</p>
      <p>Troféus: ${jogador.trofeus}</p>
      <h4>Batalhas Realizadas:</h4>
    `;

    // Exibe cada batalha realizada
    jogador.batalhas.forEach(batalha => {
      const batalhaDiv = document.createElement('div');
      batalhaDiv.classList.add('batalha');

      batalhaDiv.innerHTML = `
        <p>Tempo de Batalha: ${batalha.tempo_batalha}</p>
        <p>Torres Derrubadas - Jogador: ${batalha.torres_jogador}, Oponente: ${batalha.torres_oponente}</p>
        <p>Vencedor: ${batalha.vencedor}</p>
        <p>Deck Utilizado: ${batalha.deck_jogador.join(', ')}</p>
        <p>Troféus no Momento da Partida: Jogador - ${batalha.trofeus_jogador}, Oponente - ${batalha.trofeus_oponente}</p>
      `;

      jogadorDiv.appendChild(batalhaDiv);
    });

    jogadoresInfoDiv.appendChild(jogadorDiv);
  });
}

document.querySelector('button[onclick="showSection(\'jogadores\')"]').addEventListener('click', renderJogadores);
// Exibe a seção inicial
showSection("home");
