function Card({card, onCardClick}) {
return (
    <button 
    className={`memory-card ${card.isFlipped ? 'flipped' : ''} ${card.isMatched ? 'matched' : ''}`} 
    onClick={() => onCardClick(card.id)} 
    disabled={card.isMatched}>
     
      <div className="card-inner">
        <div className="card-front">?</div>
        <div className="card-back">{card.value}</div>
      </div>
    </button>
  )
}

export default Card;