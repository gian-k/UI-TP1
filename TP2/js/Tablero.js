class Tablero {

    constructor(canvas, imgSrc) {
        this.columnas = 7;
        this.filas = 6;
        this.encastre = 30;
        this.casillero = 100;
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.imgSrc = imgSrc;
        this.img = new Image();
        this.fichas = []
        this.ultJugador = null;
        this.ultInsertada = { j: 0, i: 0 };
        this.pos = { X: 0, Y: 0 };
    }

    getCantCeldas() {
        return this.columnas * this.filas;
    }

    cargarCeldas() {
        for (let i = 1; i <= this.columnas; i++)
            this.fichas[i] = [null, null, null, null, null, null];
    }

    dibujarTablero() {
        if (this.img.src == "") {
            this.img.src = this.imgSrc;
            let cargarImg = function () {
                this.pos.X = (this.canvas.width / 2) - (this.img.width / 2);
                this.pos.Y = (this.canvas.height / 2) - (this.img.height / 2) + 25;
                this.context.drawImage(this.img, this.pos.X, this.pos.Y, this.img.width, this.img.height);
            }
            this.img.onload = cargarImg.bind(this);
        } else {
            this.context.drawImage(this.img, this.pos.X, this.pos.Y, this.img.width, this.img.height);
        }
    }

    clickeado(mX, mY) {
        return !(mX < this.pos.X + 25 || mX > this.pos.X + (this.img.width - 25) || mY < this.pos.Y || mY > this.pos.Y + this.img.height)
    }

    posFicha(ficha) {
        let posX = 0;
        let posY = 0;
        if (this.ultInsertada.j == 1) {
            posX = this.pos.X + this.encastre / 2;
        } else {
            posX = this.pos.X + this.encastre / 2 + (this.ultInsertada.j - 1) * (this.encastre + ficha.getRadio() * 2);
        }
        if (this.ultInsertada.i == 1) {
            posY = this.pos.Y + this.img.height - ficha.getRadio() * 2 - this.encastre / 2;
        } else {
            posY = this.pos.Y + this.img.height - ficha.getRadio() * 2 - this.encastre / 2 - (this.ultInsertada.i - 1) * (this.encastre + ficha.getRadio() * 2);
        }
        ficha.setPosiciones(posX, posY);
        if (sonidosActivados.value == "1")
            sonidoFicha.play();
    }

}