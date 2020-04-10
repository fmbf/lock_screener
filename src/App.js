import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

let initBackground = 'https://images.unsplash.com/photo-1535200011543-21d1d3247768?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80';

const phrases = [
  'looking freshh...',
  'your new lock screen...',
  'try this one...',
  'hmm...',
];

const initState = {
  isLoading: false,
  currentBackground: initBackground,
  backgrounds: [initBackground],
  phraseIdx: 0,
};




class App extends Component {
  constructor(props) {
    super(props)
    this.state = Object.assign({}, initState);
  }

  isLoading(bool) {
    this.setState({ isLoading: bool });
  }

  addNewPic = (url) => {
    this.setState({
      currentBackground: url,
      backgrounds: this.state.backgrounds.concat([url]),
      isLoading: false,
      phraseIdx: this.state.phraseIdx + 1,
    });

    console.log('state:', this.state);
  }

  fetchRandomPic = () => {
    const { currentBackground } = this.state;

    this.isLoading(true);

    let req = new XMLHttpRequest();

    req.onreadystatechange = () => {
      if (req.readyState === 4 && req.status === 200) {
        // console.log('responded with:', req.responseURL);

        currentBackground !== req.responseURL
          ? this.addNewPic(req.responseURL)
          : this.fetchRandomPic();
      }
    }

    req.open( "GET", 'https://source.unsplash.com/collection/1065412', true );
    req.send( null );
  }

  render() {
    const {
      isLoading,
      currentBackground,
      backgrounds,
      phraseIdx
    } = this.state;

    return (
      <div className="App">

        <div className="main-container">
          <div className="phone-box">
            <div className={"bkg-pic-container" + (isLoading ? ' loading' : '')}>
              <img alt="content" className="bkg-pic" src={isLoading ? backgrounds[backgrounds.length - 1] : currentBackground} />
            </div>


            <img alt="content" className="phone" src={require("../assets/phone_overlay_light 4.png")} />
          </div>





          <div className="sidebar">
            <a href='https://github.com/fmbf' target="_blank">
              <p style={{ fontSize: 48, marginBottom: '0.51rem', fontFamily: 'sans-serif', color: '#f4f4f4' }}>
                lock-screener
              </p>
            </a>

            <p className="header">
              {phrases[phraseIdx % phrases.length]}
            </p>


            <div className="controls-container">




              <div className="button" onClick={this.fetchRandomPic}>
                <ion-icon name="shuffle"></ion-icon>
              </div>

              <a className="button" href={currentBackground} target="_blank">
                <ion-icon name="download"></ion-icon>
              </a>


              {/*<div className="icon-box">

                <span className="icon-button">
                  <a href={currentBackground} target="_blank" download >
                    <ion-icon name="download"></ion-icon>
                  </a>
                </span>
                <span className="icon-button">
                  <a href={currentBackground} target="_blank" download >
                    <ion-icon name="eye"></ion-icon>
                  </a>
                </span>
              </div>*/}


              {/*<p style={{ fontSize: 98, fontFamily: 'serif' }}>
                {phrases[phraseIdx % phrases.length]}
              </p>*/}

            </div>


          </div>


        </div>


      </div>
    );
  }
}

export default App;
