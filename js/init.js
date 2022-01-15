/** Archivo para alojar constantes e inicializaciones de variables */
let gameContainer
let startButton
let startPage
let images
let boardSize
let cards
let remainingCards
let clickedCards
let hideSpeed
let trials
let endOfGame
let successSound
let cardFlipSound
let winSound
let background
let tryAgainButton
let selectLevel
let level
let backButton

const init = {
    imagesFour: [],
    imagesSix: [],
    imagesEight: [],
    imagesTwelve: [],
    imagesSixteen: [],
    load: () => {
        startPage = document.getElementById('start-page')
        startButton = document.getElementById('start-button')
        endOfGame = document.getElementById('end-of-game')
        tryAgainButton = document.getElementById('try-again')
        selectLevel = document.getElementById('select-level')
        backButton = document.getElementById('back-button')
        gameContainer = document.getElementById('game-container')

        seconds = 0
        minutes = 0
        hours = 0
        cards = []
        remainingCards = []
        images = []
        init.imagesFour = [
            { id: 1, element: '../img/bear.png' },
            { id: 2, element: '../img/chicken.png' },
            { id: 3, element: '../img/crocodile.png' },
            { id: 4, element: '../img/elephant.png' },
        ]
        init.imagesSix = [
            { id: 1, element: '../img/bear.png' },
            { id: 2, element: '../img/chicken.png' },
            { id: 3, element: '../img/crocodile.png' },
            { id: 4, element: '../img/elephant.png' },
            { id: 5, element: '../img/buffalo.png' },
            { id: 6, element: '../img/duck.png' },
        ]
        init.imagesEight = [
            { id: 1, element: '../img/bear.png' },
            { id: 2, element: '../img/chicken.png' },
            { id: 3, element: '../img/crocodile.png' },
            { id: 4, element: '../img/elephant.png' },
            { id: 5, element: '../img/buffalo.png' },
            { id: 6, element: '../img/duck.png' },
            { id: 7, element: '../img/giraffe.png' },
            { id: 8, element: '../img/dog.png' },
        ]
        init.imagesTwelve = [
            { id: 1, element: '../img/bear.png' },
            { id: 2, element: '../img/chicken.png' },
            { id: 3, element: '../img/crocodile.png' },
            { id: 4, element: '../img/elephant.png' },
            { id: 5, element: '../img/buffalo.png' },
            { id: 6, element: '../img/duck.png' },
            { id: 7, element: '../img/giraffe.png' },
            { id: 8, element: '../img/dog.png' },
            { id: 9, element: '../img/horse.png' },
            { id: 10, element: '../img/goat.png' },
            { id: 11, element: '../img/hippo.png' },
            { id: 12, element: '../img/panda.png' },
        ]
        init.imagesSixteen = [
            { id: 1, element: '../img/bear.png' },
            { id: 2, element: '../img/chicken.png' },
            { id: 3, element: '../img/crocodile.png' },
            { id: 4, element: '../img/elephant.png' },
            { id: 5, element: '../img/buffalo.png' },
            { id: 6, element: '../img/duck.png' },
            { id: 7, element: '../img/giraffe.png' },
            { id: 8, element: '../img/dog.png' },
            { id: 9, element: '../img/horse.png' },
            { id: 10, element: '../img/goat.png' },
            { id: 11, element: '../img/hippo.png' },
            { id: 12, element: '../img/panda.png' },
            { id: 13, element: '../img/penguin.png' },
            { id: 14, element: '../img/rabbit.png' },
            { id: 15, element: '../img/parrot.png' },
            { id: 16, element: '../img/snake.png' },
        ]

        hideSpeed = 1000
        trials = 0
        /** Usaremos este contador para contar las tarjetas sobre las que
         * se hace clic para seleccionar. Cuando se hayan seleccionado dos
         * distintas se ocultan y el contador se reinicia
         */
        clickedCards = 0

        /** Inicializamos sonidos */
        successSound = new Howl({
            src: ['../sounds/success.wav'],
            loop: false,
        })

        cardFlipSound = new Howl({
            src: ['../sounds/card-flip.wav'],
            loop: false,
        })

        winSound = new Howl({
            src: ['../sounds/win.wav'],
            loop: false,
        })

        background = new Howl({
            src: ['../sounds/background.mp3'],
            loop: true,
        })

        startPage.classList.remove('hide')
        gameContainer.classList.add('hide')
        endOfGame.classList.add('hide')

        const trialsElement = document.getElementById('trials')
        trialsElement.innerHTML = trials

        // images = init.imagesFour
        // boardSize = images.length * 2

        // init.createBoard()
        // init.assignBackCardImage()
        // gameContainer.classList.add('few-elements')
    },
}
