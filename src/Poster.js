import React, { Component } from 'react';
// import debounce from '../shared_utils/debounce.js';

class PosterImage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // query: '',
      query: this.props.keyword
    }

    this.handle_input = this.handle_input.bind(this);
  }

  handle_input(e) {
    const rawInput = e.target.value;
    const query = rawInput.split(' ').join(',');

    this.setState({ query: query });
    // debounce(() => this.setState({ query: query }), 5000)();
  }

  render() {
    // const unsplash_url = `https://source.unsplash.com/400x225/?${this.props.keyworzds[0]}`;
    console.log(this.state.query);
    // const unsplash_url = `https://source.unsplash.com/200x300/?${this.state.query}`;
    const unsplash_url = `https://source.unsplash.com/collection/190727`;

    return (
      <div className="PosterImage" style={{border: '1px dotted'}}>
        <h5>PosterImage</h5>
        <p><input type='text' onChange={this.handle_input} /></p>

        <img src={unsplash_url} alt='posterimage' />
      </div>
    );
  }
}

export default PosterImage;
