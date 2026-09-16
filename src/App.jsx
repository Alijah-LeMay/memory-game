import { useState } from 'react'
import Card from './Card'
import './App.css'

  const cardValues = ['A', 'B', 'C', 'D', 'E', 'F']

function createShuffledCards() {
  const duplicatedValues = [...cardValues, ...cardValues]


  return duplicatedValues
  .map((value, index) => ({
    id: index,
    value,
    isFlipped: false,
    isMatched: false,
  })).sort(() => Math.random() - 0.5)


}

function App() {
  const [cards, setCards] = useState(createShuffledCards)

  const [firstCard, setFirstCard] = useState(null)
  const [secondCard, setSecondCard] = useState(null)
  const [isChecking, setIsChecking] = useState(false)

  const [moves, setMoves] = useState(0)

  const gameWon = cards.every((card) => card.isMatched)

  const matchedPairs =
  cards.filter((card) => card.isMatched).length / 2

  
function handleCardClick(id) {
  if (isChecking) {
    return
  }

  const clickedCard = cards.find((card) => card.id === id)

  if (
    clickedCard.isFlipped ||
    clickedCard.isMatched
  ) {
    return
  }

  const nextCards = cards.map((card) =>
    card.id === id
      ? { ...card, isFlipped: true }
      : card
  )

  setCards(nextCards)

  if (!firstCard) {
    setFirstCard(clickedCard)
    return
  }

  setSecondCard(clickedCard)

  setMoves((currentMoves) => currentMoves + 1)

  checkForMatch(firstCard, clickedCard)
}

function checkForMatch(first, second) {
  setIsChecking(true)

  if (first.value === second.value) {
    handleMatch(first, second)
  } else {
    handleMismatch(first, second)
  }

}

function handleMatch(first, second) {
  setCards((currentCards) =>
    currentCards.map((card) => {
      if (
        card.id === first.id ||
        card.id === second.id
      ) {
        return {
          ...card,
          isMatched: true,
          isFlipped: true,
        }
      }

      return card
    })
  )

  resetSelection()
}


function handleMismatch(first, second) {
  setTimeout(() => {
    setCards((currentCards) =>
      currentCards.map((card) => {
        if (
          card.id === first.id ||
          card.id === second.id
        ) {
          return {
            ...card,
            isFlipped: false,
          }
        }

        return card
      })
    )

    resetSelection()
  }, 800)
}


function resetSelection() {
  setFirstCard(null)
  setSecondCard(null)
  setIsChecking(false)
}

function handleNewGame() {
  setCards(createShuffledCards())

  setFirstCard(null)
  setSecondCard(null)

  setIsChecking(false)

  setMoves(0)
}


  return (
    <>
    <main className="game">
      <h1> React Memory Game</h1>

      <div className="game-info">
        <div className="stats">
          <span>Moves: {moves}</span>
          <span>Pairs: {matchedPairs} / 6</span>
        </div>

        <p className={`instructions ${gameWon ? 'winner-message' : ''}`}>
          {gameWon
            ? `You won in ${moves} moves!`
            : 'Flip the cards and find the matching pairs.'}
        </p>
      </div>


      <div className="memory-board">
        {cards.map((card) => (
        <Card key={card.id} card={card} onCardClick={handleCardClick} />
      ))}
      </div>

      <button
        className="new-game-button"
        onClick={handleNewGame}
      >
        {gameWon ? 'Play Again' : 'New Game'}
      </button>

    </main>
     
    </>
  )
}

export default App
