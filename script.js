const celeste = document.getElementById('celeste');
const violeta = document.getElementById('violeta');
const naranja = document.getElementById('naranja');
const verde = document.getElementById('verde');
const btnEmpezar = document.getElementById('btnEmpezar');
const ULTIMO_NIVEL = 10;

class Juego {
  constructor() {
    this.inicializar();
    this.generarSecuencia();
    setTimeout(this.siguienteNivel, 500);
  }

  inicializar() {
    this.siguienteNivel = this.siguienteNivel.bind(this);
    this.elegirColor = this.elegirColor.bind(this);
    btnEmpezar.classList.add('hide');
    this.nivel = 1;
    this.colores = {
      celeste,
      violeta,
      naranja,
      verde,
    };
  }

  generarSecuencia() {
    this.secuencia = new Array(ULTIMO_NIVEL)
      .fill()
      .map(() => Math.floor(Math.random() * 4));
  }

  siguienteNivel() {
    this.subnivel = 0;
    this.iluminarSecuencia();
    this.agregarEventosClick();
  }

  transformarNumeroAColor(numero) {
    switch (numero) {
      case 0:
        return 'celeste';
      case 1:
        return 'violeta';
      case 2:
        return 'naranja';
      case 3:
        return 'verde';
      default:
        return 'verde';
    }
  }

  transformarColorANumero(color) {
    switch (color) {
      case 'celeste':
        return 0;
      case 'violeta':
        return 1;
      case 'naranja':
        return 2;
      case 'verde':
        return 3;
      default:
        return 'verde';
    }
  }

  iluminarSecuencia() {
    for (let i = 0; i < this.nivel; i++) {
      const color = this.transformarNumeroAColor(this.secuencia[i]);
      setTimeout(() => this.iluminarColor(color), 1000 * i);
    }
  }

  iluminarColor(color) {
    this.colores[color].classList.add('light');
    setTimeout(() => this.apagarColor(color), 350);
  }

  apagarColor(color) {
    this.colores[color].classList.remove('light');
  }

  agregarEventosClick() {
    this.colores.celeste.addEventListener('click', this.elegirColor);
    this.colores.verde.addEventListener('click', this.elegirColor);
    this.colores.violeta.addEventListener('click', this.elegirColor);
    this.colores.naranja.addEventListener('click', this.elegirColor);
  }

  eliminarEventosClick() {
    this.colores.celeste.removeEventListener('click', this.elegirColor);
    this.colores.verde.removeEventListener('click', this.elegirColor);
    this.colores.violeta.removeEventListener('click', this.elegirColor);
    this.colores.naranja.removeEventListener('click', this.elegirColor);
  }

  elegirColor(ev) {
    const nombreColor = ev.target.dataset.color;
    const numeroColor = this.transformarColorANumero(nombreColor);
    this.iluminarColor(nombreColor);
    if (numeroColor === this.secuencia[this.subnivel]) {
      this.subnivel++;
      if (this.subnivel === this.nivel) {
        this.nivel++;
        this.eliminarEventosClick();
        if (this.nivel === ULTIMO_NIVEL + 1) {
          this.winGame();
        } else {
          this.winLevel();
        }
      }
    } else {
      this.loseGame();
    }
  }

  deleteClickEvents() {
    this.colors.forEach((item) =>
      item.removeEventListener('click', this.chooseColor)
    );
  }

  winGame() {
    swal('Simon Colors', 'Congratulations, you win!', 'success').then(() =>
      this.initialize()
    );
  }

  loseGame() {
    swal(
      'You lose :(',
      "But you can try it again, don't give up!",
      'error'
    ).then(() => {
      this.deleteClickEvents();
      this.initialize();
    });
  }

  winLevel() {
    swal('Simon Colors', 'Perfect!, next level', 'success').then(() =>
      setTimeout(this.siguienteNivel(), 800)
    );
  }
}

const empezarJuego = () => {
  swal('Simon Dice', '¡El Juego va a empezar!', 'success').then(() =>
    setTimeout((window.juego = new Juego()))
  );
};
