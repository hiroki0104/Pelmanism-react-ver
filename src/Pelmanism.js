import React, { Component } from 'react';
import axios from 'axios';
import Card from './Card';

const BASE_API_URL = 'https://deckofcardsapi.com/api/deck';

class Pelmanism extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: '',
      cards: [],
    };
    this.getCards = this.getCards.bind(this);
  }
  componentDidMount() {
    this.getCards();
  }

  async getCards() {
    const res_deck = await axios.get(`${BASE_API_URL}/new/shuffle/`);
    this.setState({ deck: res_deck.data });
    const res_cards = await axios.get(
      `${BASE_API_URL}/${this.state.deck.deck_id}/draw/?count=10`
    );
    let initialCards = [];
    for (let i = 0; i < 2; ++i) {
      res_cards.data.cards.forEach((card) => {
        initialCards.push({
          id: `${i}-${card.code}`,
          code: card.code,
          image: card.image,
          isOpen: false,
        });
      });
    }
    this.setState({ cards: initialCards });
  }

  render() {

    const cards = this.state.cards.map(c => (
      <Card imgSrc={c.image} alt={c.code} />
    ))

    return (
      <div className='Pelmanism'>
        <h1>Pelmanism</h1>
        <div className="Pelmanism-list">
          {cards}
        </div>
      </div>
    );
  }
}

export default Pelmanism;
