const confirmButton = document.getElementById('confirmButton');
const denyButton = document.getElementById('denyButton');
const card = document.getElementById('card');
const cardBack = document.getElementById('cardBack');
const flowerEffect = document.getElementById('flowerEffect');

// Função para criar corações ou flores animados
function createBloomEffect(x, y) {
    const bloomType = Math.random() > 0.5 ? 'heart' : 'flower';
    const bloom = document.createElement('div');
    bloom.classList.add(bloomType);
    
    // Adiciona animação de espalhamento
    bloom.style.left = `${x}px`;
    bloom.style.top = `${y}px`;
    
    // Configura o estilo do coração ou flor
    if (bloomType === 'heart') {
        bloom.innerHTML = '❤️';
        bloom.style.fontSize = '30px';
        bloom.style.animationDuration = '2s';
    } else {
        bloom.innerHTML = '❤️';
        bloom.style.fontSize = '30px';
        bloom.style.animationDuration = '2.5s';
    }

    flowerEffect.appendChild(bloom);

    // Remover o elemento após a animação
    setTimeout(() => {
        bloom.remove();
    }, 2500);
}

// Função para abrir a carta (ao clicar)
card.addEventListener('click', () => {
    cardBack.style.display = 'block'; // Exibe a parte de trás da carta
    card.querySelector('.card-front').style.transform = 'scaleY(0)'; // Esconde a parte frontal da carta
});

// Ação ao clicar em "Confirmar"
confirmButton.addEventListener('click', (e) => {
    alert('Que bom que aceitou! 💖 Nos vemos no nosso encontro.');

    // Cria efeito de flores ou corações
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createBloomEffect(e.clientX + Math.random() * 100 - 50, e.clientY + Math.random() * 100 - 50);
        }, i * 100);
    }
});

// Ação ao clicar em "Negar"
denyButton.addEventListener('click', () => {
    denyButton.classList.add('fade-out'); // Aplica a animação
    setTimeout(() => denyButton.style.display = 'none', 500); // Remove o botão após a animação
});
// Função para calcular o tempo restante até o encontro
function startCountdown() {
  const targetDate = new Date('2025-02-14T19:00:00'); // Data e hora do encontro
  const countdownElement = document.getElementById('countdown');
  const timeLeftElement = document.getElementById('timeLeft');

  // Função para atualizar a contagem regressiva
  function updateCountdown() {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
          timeLeftElement.innerHTML = "O encontro já chegou! 💖";
          clearInterval(countdownInterval); // Para a contagem após o encontro
      } else {
          // Calcular os dias restantes
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          // Calcular horas, minutos e segundos
          const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);

          // Exibir os dias e o tempo restante
          timeLeftElement.innerHTML = `${days} dias, ${hours} horas, ${minutes} minutos, ${seconds} segundos`;
      }
  }

  // Inicia a contagem regressiva
  updateCountdown();
  const countdownInterval = setInterval(updateCountdown, 1000);

  // Exibe o elemento de contagem regressiva
  countdownElement.style.display = 'block';
}

// Ação quando o botão de confirmar é clicado
document.getElementById('confirmButton').addEventListener('click', function() {
  // Exibir a parte de trás da carta
  document.getElementById('cardBack').style.transform = 'rotateY(0deg)';
  startCountdown(); // Iniciar a contagem regressiva
});
