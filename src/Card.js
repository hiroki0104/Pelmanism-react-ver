import React, { Component } from 'react';
import imgSrc from './back-card.jpg';

class Card extends Component {
  static defaultProps = {
    name: 'back-card',
  };
  render() {
    return (
      <div className='Card'>
        <img src={imgSrc} alt={this.props.name} />
      </div>
    );
  }
}

export default Card;
