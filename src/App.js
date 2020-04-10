import React, { Component } from 'react';
import './App.css';

let initBackground = 'https://images.unsplash.com/photo-1535200011543-21d1d3247768?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80';


const initState = {
  isLoading: false,
  currentBackground: initBackground,
  backgrounds: [initBackground],
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
    });
  }

  fetchRandomPic = () => {
    const { currentBackground, isLoading } = this.state;

    this.isLoading(true);

    let req = new XMLHttpRequest();

    req.onreadystatechange = () => {
      if (req.readyState === 4 && req.status === 200) {
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
    } = this.state;

    return (
      <div className="App">
        <div className="slanted-bg" />
        <div className="corner-overlay" />

        <a className="social-icon" href='https://github.com/fmbf' target="_blank">
          <ion-icon name="logo-github" />
        </a>

        <div className="main-container">
          <div className="phone-box">
            <div className={"bkg-pic-container" + (isLoading ? ' loading' : '')}>
              <img alt="content" className="bkg-pic" src={isLoading ? backgrounds[backgrounds.length - 1] : currentBackground} />
            </div>
            <img alt="content" className="phone" src={require("../assets/phone_overlay_light.png")} />
            <img alt="loading-indicator" src={require('../assets/loading_indicator.svg')} style={{ display: isLoading ? 'block' : '' }} />
          </div>

          <div className="sidebar">
            <div className="controls-container">
              <div className="button" onClick={() => !isLoading ? this.fetchRandomPic() : null}>
                <ion-icon name="shuffle"></ion-icon>
              </div>
              <a className="button" href={currentBackground} target="_blank">
                <ion-icon name="download"></ion-icon>
              </a>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default App;
