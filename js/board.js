const board = {
    createBoard: () => {
        cards = []
        const level = document.getElementById('select-level').value

        console.log('level', level)

        // Creamos dinámicamente las tarjetas
        gameContainer.classList.add('hide')
        switch (level) {
            case 'Easy':
                images = init.imagesFour
                break
            case 'Normal':
                images = init.imagesSix
                break
            case 'Difficult':
                images = init.imagesEight
                break
            case 'Expert':
                images = init.imagesTwelve
                break
            case 'Professional':
                images = init.imagesSixteen
                break
            default:
                images = init.imagesFour
                break
        }

        if (level === 'Easy' || level === 'Normal' || level === 'Difficult') {
            gameContainer.classList.add('few-elements')
            gameContainer.classList.remove('many-elements')
        } else {
            gameContainer.classList.add('many-elements')
            gameContainer.classList.remove('few-elements')
        }

        boardSize = images.length * 2

        for (let i = 0; i < boardSize; i++) {
            const cardElement = document.createElement('div')
            cardElement.classList.add('card')
            const cardFront = document.createElement('div')
            cardFront.classList.add('card__front')
            const cardBack = document.createElement('img')
            cardBack.classList.add('card__back')

            if (level === 'Easy' || level === 'Normal') {
                cardElement.classList.remove('card-small')
                cardElement.classList.add('card-big')
            } else {
                cardElement.classList.remove('card-big')
                cardElement.classList.add('card-small')
            }

            const backId = `b${i}`
            cardBack.setAttribute('id', backId)

            cardElement.appendChild(cardFront)
            cardElement.appendChild(cardBack)
            cardElement.setAttribute('id', i)

            gameContainer.appendChild(cardElement)

            /** Creamos los objetos card para que contengan la lógica */
            const card = {
                id: i,
                revealed: false,
                succeeded: false,
                color: '#fff',
                imageId: 0,
            }

            cards.push(card)

            /** Array temporal para ir descontando las tarjetas con color asignado
             * a medida que las vayamos seleccionando para ello
             */
            remainingCards.push(card)
        }
    },
    assignBackCardImage: () => {
        /** Asignamos imágenes aleatorias a la parte de atrás */
        images.forEach(image => {
            const randomIndex =
                remainingCards[
                    Math.floor(Math.random() * remainingCards.length)
                ].id

            // Eliminamos la tarjeta de las pendientes por asignar
            remainingCards = remainingCards.filter(
                card => card.id !== randomIndex
            )

            // Le asignamos la imagen al elemento correspondiente del DOM
            const cardBackElement = document.getElementById(`b${randomIndex}`)
            cardBackElement.setAttribute('src', image.element)

            /** Buscamos la tarjeta correspondiente y le asignamos el id de la
             * imagen para poder comparar posteriormente si dos seleccionadas
             * son iguales */
            board.updateCardImageId(randomIndex, image.id)

            /** Buscamos una pareja para asignarle la misma imagen */
            const pairedIndex =
                remainingCards[
                    Math.floor(Math.random() * remainingCards.length)
                ].id

            // Eliminamos la tarjeta de las pendientes por asignar
            remainingCards = remainingCards.filter(
                card => card.id !== pairedIndex
            )

            // Le asignamos la misma imagen al elemento correspondiente del DOM
            const pairedCardBackElement = document.getElementById(
                `b${pairedIndex}`
            )
            // pairedCardBackElement.style.backgroundColor = image.element
            pairedCardBackElement.setAttribute('src', image.element)

            /** Buscamos la tarjeta correspondiente y le asignamos el id de la
             * imagen para poder comparar posteriormente si dos seleccionadas
             * son iguales */
            board.updateCardImageId(pairedIndex, image.id)
        })
    },
    updateCardImageId: (index, imageId) => {
        cards = cards.map(card => {
            if (card.id === index) {
                return {
                    ...card,
                    imageId,
                }
            }
            return card
        })
    },
}
