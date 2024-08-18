const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const coin = document.querySelector('.coin'); // Selecionando a moeda

const start = document.querySelector('.start');
const gameOver = document.querySelector('.game-over');

let isGameRunning = false;

const audioStart = new Audio('./src/audio/audio_theme.mp3');
const audioGameOver = new Audio('./src/audio/audio_gameover.mp3');

const startGame = () => {
  isGameRunning = true;
  pipe.classList.add('pipe-animation');
  coin.style.display = 'block'; // Exibir a moeda
  start.style.display = 'none';

  // Iniciar áudio
  audioStart.play();

  loop();
}

const restartGame = () => {
  gameOver.style.display = 'none';
  
  // Resetando a posição e animação do cano
  pipe.style.left = '';
  pipe.style.right = '0';
  pipe.classList.add('pipe-animation');
  
  // Resetando o Mario
  mario.src = 'img/mario.gif'; // Certifique-se que o caminho esteja correto
  mario.style.width = '150px';
  mario.style.bottom = '0';
  mario.style.marginLeft = '0';

  // Exibir o botão de iniciar e esconder o game over
  start.style.display = 'none';
  
  // Resetando áudio
  audioGameOver.pause();
  audioGameOver.currentTime = 0;
  
  audioStart.play();
  audioStart.currentTime = 0;
  
  isGameRunning = true;
  
  // Recomeçar o loop do jogo
  loop();
}

const jump = () => {
  if (!mario.classList.contains('jump')) {
    mario.classList.add('jump');
    setTimeout(() => {
      mario.classList.remove('jump');
    }, 800);
  }
}

const loop = () => {
  const gameLoop = setInterval(() => {
    if (!isGameRunning) {
      clearInterval(gameLoop);
      return;
    }

    const pipePosition = pipe.offsetLeft;
    const marioPosition = parseFloat(window.getComputedStyle(mario).bottom.replace('px', ''));

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
      pipe.classList.remove('pipe-animation');
      pipe.style.left = `${pipePosition}px`;

      mario.classList.remove('jump');
      mario.style.bottom = `${marioPosition}px`;

      mario.src = 'img/game-over.png';
      mario.style.width = '80px';
      mario.style.marginLeft = '50px';

      // Removendo a moeda ao colidir com o cano
      coin.style.display = 'none';

      // Parar o áudio do tema
      audioStart.pause();

      // Tocar o áudio de game over
      audioGameOver.play();

      gameOver.style.display = 'flex';

      isGameRunning = false;

      clearInterval(gameLoop);
    }
  }, 10);
}

document.addEventListener('keypress', e => {
  const tecla = e.key;
  if (tecla === ' ') {
    jump();
  }
});

document.addEventListener('touchstart', e => {
  if (e.touches.length) {
    jump();
  }
});

document.addEventListener('keypress', e => {
  const tecla = e.key;
  if (tecla === 'Enter') {
    if (!isGameRunning) {
      restartGame();
    } else {
      startGame();
    }
  }
});
