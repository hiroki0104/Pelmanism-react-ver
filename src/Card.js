import React, { Component } from 'react';
import imgSrc from './back-card.jpg';
import "./Card.css"

class Card extends Component {
  static defaultProps = {
    imgSrc: imgSrc,
    name: 'back-card',
  };
  render() {
    return (
      <div className='Card'>
        <img onClick={this.props.isOpen} src={this.props.imgSrc} alt={this.props.name} />
      </div>
    );
  }
}

export default Card;
