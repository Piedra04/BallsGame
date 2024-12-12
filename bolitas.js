
window.onload = main;

const NUM = 5
const COLORS = ['yellow', 'blue', 'red', 'green', 'purple']
let TIEMPO = 60
let i = 0
let coloresEliminados = 0
let colorViejo = COLORS[0]
let cambioColor = 4000

function main() {
    createBalls()
    generatePlay()
    chColor()
}

//Creacion de bolas
function createBalls() {
    box = document.getElementById('box')

    for (let i = 0; i < COLORS.length; i++) {
        for (let j = 0; j < NUM; j++) {
            let ball = document.createElement('div')
            ball.classList.add('ball')
            ball.classList.add(COLORS[i])
            box.appendChild(ball)
        }
    }
}

//Movimiento de bolas y añadir intervalos
function generatePlay() {

    tiempoRestante = document.getElementById('tiempo')
    tiempoRestante.innerHTML = 'Tiempo restante: ' + TIEMPO

    mensaje = document.getElementById('mensaje')

    ballColor = document.getElementById('bolaMaster')

    ballSize = document.getElementsByClassName('ball')[0].offsetWidth
    border = getComputedStyle(box).borderWidth.slice(0, -2) * 2

    minWidth = 0, minHeight = 0
    maxWidth = box.offsetWidth - ballSize - border
    maxHeight = box.offsetHeight - ballSize - border

    x = 0, y = 0

    balls = document.getElementsByClassName('ball')

    for (let ball of balls) {

        let x = Math.random() * (maxWidth)
        let y = Math.random() * (maxHeight)

        let xSpeed = Math.random() * (5 - 1) + 1
        let ySpeed = Math.random() * (5 - 1) + 1

        ball.style.left = `${x}px`
        ball.style.top = `${y}px`

        function moveBall() {
            if (x <= 0 || x >= maxWidth)
                xSpeed = -xSpeed

            if (y <= 0 || y >= maxHeight)
                ySpeed = -ySpeed

            x += xSpeed
            y += ySpeed

            ball.style.left = `${x}px`
            ball.style.top = `${y}px`

        }
        ball.addEventListener('click', deleteBolas)
        time = setInterval(moveBall, 20)


    }
    intervalTime = setInterval(disminuirTiempo, 1000)
    interval = setInterval(chColor, cambioColor)
}

//Funcion de eliminar las bolas del color que clikes
function deleteBolas(event) {
    let clickedBall = event.target
    if (clickedBall.classList.contains(color) && !clickedBall.classList.contains('enProceso')) {
        let bolas = document.getElementsByClassName(color)
        //Mostar mensajes al clickar bolas
        /*
        switch (color) {
            case 'yellow':
                window.confirm("JAVA SCRIPT")
                break
            case 'blue':
                window.confirm("HTML")
                break
            case 'red':
                window.confirm("CSS")
                break
            case 'green':
                window.confirm("ANGULAR")
                break
            case 'purple':
                window.confirm("REACT")
                break
        }*/
        //Animacion de como desaparece
        for (let i = 0; i < bolas.length; i++) {
            if (bolas[i].id != 'bolaMaster') {
                grande(bolas[i])
                setTimeout(((bola) => {
                    return () => pequeño(bola)
                })(bolas[i]), 1000)
                setTimeout(((bola) => {
                    return () => eliminar(bola)
                })(bolas[i]), 2000)
            }
        }
        //Con esto evitamos que se puedan eliminar otras bolas mientas se esta haciendo la animacion para que desaparezca
        for (let ball of balls) {
            ball.classList.add('enProceso')
            setTimeout(() => {
                ball.classList.remove('enProceso')
            }, 2000);
        }
    }
}

//Funcion que cambia el color de la bola de arriba
function chColor() {
    let n = Math.floor(Math.random() * (COLORS.length - 0))
    color = COLORS[n]
    ballColor.classList.remove(colorViejo)
    ballColor.classList.add(color)
    colorViejo = color
}

//Animacion al eliminar una bola, que primero se haga grande, luego pequeño y luego desaparezca
function grande(elemento) {
    elemento.classList.add('grande')
}

function pequeño(elemento) {
    elemento.classList.remove('grande')
    elemento.classList.add('pequeño')
}

//Para contar las bolas y colores eliminados y que salga un mensaje de que has ganado cuando desaparezcan
let bolasD = 0
let coloresD = 0
function eliminar(elemento) {
    elemento.style.display = 'none'
    bolasD++
    coloresD = Math.floor(bolasD / NUM)
    if (coloresD == COLORS.length) {
        mensaje.innerHTML = "HAS GANADO"
        eliminarAnimaciones()
    }
}

//Contador de tiempo que tenemos
function disminuirTiempo() {
    if (TIEMPO % 5 == 0) {
        clearInterval(interval)
        cambioColor *= 0.9
        console.log(cambioColor)
        interval = setInterval(chColor, cambioColor)
    }
    TIEMPO--
    tiempoRestante.innerHTML = 'Tiempo restante: ' + TIEMPO
    if (TIEMPO == 0) {
        mensaje.innerHTML = "HAS PERDIDO"
        eliminarAnimaciones()
    }
}

//Para eliminar los intervalos y que aparezca luego un boton de reinciar, esto solo sale cuando se gana o pierde
function eliminarAnimaciones() {
    clearInterval(interval)
    clearInterval(intervalTime)
    for (let ball of balls) {
        ball.removeEventListener('click', deleteBolas);
    }
    mensaje.innerHTML += '<p><button onclick="reiniciar()">REINICIAR</button>'
}

//Cuando le das al boton de eliminar se reinicia la pagina gracias a esta funcion
function reiniciar() {
    window.location.reload()

}
