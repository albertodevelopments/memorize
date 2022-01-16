const main = {
    choosenCards: [],
    timeCounter: null,
    init: () => {
        main.cardsCounter = 0
        main.choosenCards = []

        startButton.addEventListener('click', e => {
            main.stop()
            main.start()
        })

        tryAgainButton.addEventListener('click', main.restart)
        backButton.addEventListener('click', main.restart)
    },
    restart: () => {
        main.stop()
        init.load()
        main.init()
    },
    start: () => {
        background.stop()
        background.play()
        cards = []
        const successContainerTmp = successContainer
        gameContainer.innerHTML = ''
        board.createBoard()
        board.assignBackCardImage()

        // Le asignamos el método de rotar tarjetas a cada elemento del DOM
        //  const cards = document.querySelectorAll('.card')
        for (let i = 0; i < cards.length; i++) {
            const card = cards[i]
            const cardElement = document.getElementById(card.id)
            cardElement.addEventListener('click', () => {
                if (main.choosenCards.length < 2) main.clickRotateCard(card)
            })
        }

        gameContainer.appendChild(successContainerTmp)

        startPage.classList.add('hide')
        gameContainer.classList.remove('hide')
        gameContainer.classList.add('game-container')
        const stats = document.getElementById('stats')
        stats.classList.remove('hide')

        main.runTimer()
    },
    runTimer: () => {
        let seconds = 0
        let minutes = 0
        let hours = 0

        const timerElement = document.getElementById('timer')
        timerElement.innerHTML = ''
        main.timeCounter = setInterval(() => {
            seconds++
            if (seconds === 10) {
                seconds = 0
                minutes++
            }
            if (minutes === 10) {
                minutes = 0
                hours++
            }
            timerElement.innerHTML = `${hours}h ${minutes}m ${seconds}s`
        }, 1000)
    },
    /** Función para rotar la tarjeta */
    clickRotateCard: card => {
        cardFlipSound.play()
        const id = parseInt(card.id)
        const cardObject = cards[id]
        if (!cardObject || cardObject.succeeded) return // La tarjeta no existe o ya se ha revelado con éxito

        if (cardObject.revealed) return // Si es una tarjeta ya revelada no hacemos nada al hacer clic con el ratón

        const selectedCard = document.getElementById(id)
        clickedCards++
        main.choosenCards.push(card)

        selectedCard.classList.add('rotate')
        cardObject.revealed = true

        /** Con el segundo clic activamos un intervalo de tiempo para ocultar las tarjetas
         * si son disntintas
         */
        if (clickedCards === 2) {
            clickedCards = 0

            const isSameImage = main.checkSameImage()
            const trialsElement = document.getElementById('trials')
            trials++

            trialsElement.innerHTML = trials

            if (!isSameImage) {
                main.hideCards()
            } else {
                // Difuminamos las cartas si hay pareja encontrada
                setTimeout(() => {
                    main.choosenCards.forEach(card => {
                        const cardElement = document.getElementById(
                            `b${card.id}`
                        )
                        cardElement.classList.add('success')
                        main.cardsCounter++
                    })
                    main.choosenCards = []
                }, 500)
            }
        }
    },
    hideCards: () => {
        setTimeout(() => {
            main.choosenCards.forEach(choosenCard => {
                const cardElement = document.getElementById(choosenCard.id)
                cardElement.classList.remove('rotate')
                cards = cards.map(card => {
                    if (card.id === choosenCard.id) {
                        return {
                            ...card,
                            revealed: false,
                        }
                    }
                    return card
                })
                main.choosenCards = []
            })
        }, hideSpeed)
    },
    checkSameImage: () => {
        const cardOne = main.choosenCards[0]
        const cardTwo = main.choosenCards[1]

        if (cardOne.imageId === cardTwo.imageId) {
            successSound.play()
            const successContainer = document.getElementById('tick-container')
            successContainer.style.display = 'block'
            const tickElement = document.getElementById('tick-container')
            const triggerElement = document.getElementById('trigger')
            tickElement.style.zIndex = 200
            triggerElement.classList.toggle('drawn')
            gameContainer.classList.add('success')

            setTimeout(() => {
                gameContainer.classList.remove('success')

                // Win condition
                if (main.cardsCounter === cards.length) {
                    main.stop()
                    background.stop()
                    winSound.play()
                    const totalTrials = document.getElementById('total-trials')
                    totalTrials.innerHTML = trials
                    endOfGame.classList.remove('hide')
                    gameContainer.classList.add('hide')
                }
            }, 2000)

            setTimeout(() => {
                triggerElement.classList.toggle('drawn')
            }, 1000)

            return true
        }

        return false
    },
    stop: () => {
        cards = []
        clearInterval(main.timeCounter)
    },
}

window.addEventListener('DOMContentLoaded', () => {
    init.load()
    main.init()
})
