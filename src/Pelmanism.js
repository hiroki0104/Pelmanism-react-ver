import React, { Component } from 'react';
import axios from 'axios';
import Card from './Card';
import './Pelmanism.css';
import { shaffle } from './util/helper';

const BASE_API_URL = 'https://deckofcardsapi.com/api/deck';

class Pelmanism extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: '',
      cards: [],
      initialCard: '',
      isFliped: false,
    };
    this.handleFliep = this.handleFliep.bind(this);
    this.handleRestart = this.handleRestart.bind(this);
  }
  componentDidMount() {
    this.getCards();
  }

  // 神経衰弱に使うカードの取得
  async getCards() {
    const res_deck = await axios.get(`${BASE_API_URL}/new/shuffle/`);
    this.setState({ deck: res_deck.data });
    const res_cards = await axios.get(
      `${BASE_API_URL}/${this.state.deck.deck_id}/draw/?count=10`
    );
    // カードのペアを作成
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
    const randomCards = shaffle(initialCards);

    this.setState({ cards: randomCards });
  }

  // カードを裏返す
  handleFliep(id) {
    let selectedCard = this.state.cards.find((c) => c.id === id);
    this.setState((st) => ({
      cards: st.cards.map((c) => {
        if (c.id === id) {
          return { ...c, isOpen: true };
        }
        return c;
      }),
    }));

    if (!this.state.initialCard) {
      this.setState({ initialCard: selectedCard });
      return;
    }

    // ペアの判定 -
    // 外れ
    if (this.state.initialCard.code !== selectedCard.code) {
      this.setState({ isFliped: true });
      setTimeout(() => {
        this.setState((st) => ({
          cards: st.cards.map((c) => {
            if (c.id === id || c.id === this.state.initialCard.id) {
              return { ...c, isOpen: false };
            }
            return c;
          }),
          initialCard: '',
          isFliped: false,
        }));
      }, 1500);
    }
    // 当たり
    else {
      this.setState({ initialCard: '' });
    }
  }

  handleRestart() {
    this.getCards();
  }

  render() {
    const isWinning = this.state.cards.every((c) => c.isOpen);
    const cards = this.state.cards.map((c) =>
      c.isOpen ? (
        <Card key={c.id} imgSrc={c.image} alt={c.code} />
      ) : (
        <Card
          key={c.id}
          isOpen={
            !this.state.isFliped
              ? () => this.handleFliep(c.id)
              : () => alert('取り込み中です')
          }
        />
      )
    );

    return (
      <div className='Pelmanism'>
        <div className='Pelmanism-txt'>
          <h1>神経衰弱</h1>
          {isWinning && (
            <div className='Pelmanism-result'>
              <span>おめでとうございます！すべてそろいました</span>
              <div>
                <button className='btn' onClick={this.handleRestart}>
                  Restart
                </button>
              </div>
            </div>
          )}
        </div>
        <div className='Pelmanism-list'>{cards}</div>
      </div>
    );
  }
}

export default Pelmanism;
