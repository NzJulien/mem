import GameHeader from './components/Gameheader.jsx'
import { Card } from './components/Card.jsx'
import { useEffect,useState } from 'react'
import { WinMessage } from './components/WinMessage.jsx'
const cardValues = [
  "🍎",
  "🍌",
  "🍇",
  "🍊",
  "🍓",
  "🥝",
  "🍑",
  "🍒",
  "🍎",
  "🍌",
  "🍇",
  "🍊",
  "🍓",
  "🥝",
  "🍑",
  "🍒"
]

function App() {
  const  [cards, setCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])
  const [matchCards, setMatchCards] = useState([])
  const [score, setScore] = useState(0)
    const [moves, setMoves] = useState(0)
    const [isLocked,setIsLocked] = useState(false)
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))

    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

  const initialiseGame = () => {

    const shuffled = shuffleArray(cardValues)
    const finalCards = shuffled.map((value,index) => (
      {
        id: index,
        value,
        isFlipped: false,
        isMatched: false,
      }
    ))
    setCards(finalCards)
    setMoves(0)
    setScore(0)
    setIsLocked(false)
    setMatchCards([])
    setFlippedCards([])
  }
  useEffect(() => {
    initialiseGame()
  }, [])

  const handleCardClick =(card) => {
    if(card.isFlipped || card.isMatched || isLocked ||
      flippedCards.length === 2
    ){
      return;
    }
    const newCards =cards.map((c) => {
      if(c.id === card.id){
        return {...c, isFlipped: true};
      }else{
        return c;
      }
    })
    setCards(newCards);
    const newFlippedCards = [...flippedCards,card.id]
    setFlippedCards(newFlippedCards);

    if(flippedCards.length=== 1){
      setIsLocked(true)
      const firstCard = cards[flippedCards[0]]

      if(firstCard.value === card.value){
        setTimeout(() => {
        setMatchCards((prev) => [...prev, firstCard.id, card.id])
    // const newMatchedCards =cards.map((c) => {
    //   if(c.id === card.id || c.id ===firstCard.id){
    //     return {...c, isMatched: true};
    //   }else{
    //     return c;
    //   }
    // })
    setScore(prev => prev+1)
    setCards((prev) => 
      prev.map((c) => {
      if(c.id === card.id || c.id ===firstCard.id){
        return {...c, isMatched: true};
      }else{
        return c;
      }
    }))
    setFlippedCards([])
    setIsLocked(false)
      }, 500)
      }else{
        setTimeout(() => {
        const flippedBackCard = newCards.map((c) => {
          if(newFlippedCards.includes(c.id) || c.id === card.id){
            return{...c, isFlipped: false};
          }else{
            return c;
          }
        })
        setCards(flippedBackCard)
        setFlippedCards([]);
        setIsLocked(false)
        }, 1000)

      }
      setMoves((prev) => prev + 1)
    }
  }

  const isGameComplete = matchCards.length === cardValues.length;
  return (
  <div className='app'>
    <GameHeader score={score} moves={moves} onReset={initialiseGame}/>

    { isGameComplete && <WinMessage moves = {moves}/>}
    <div className='cards-grid'>
      {cards.map((card) => (
        <Card card ={card} onClick={handleCardClick}/>
      ))}

    </div>
  </div>
  )

}
export default App
