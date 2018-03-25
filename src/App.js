import React, { Component } from 'react';
import './bootstrap-4.0.0-dist/css/bootstrap.min.css';
import logo from './logo.svg';
import twitter from './assets/icons/Twitter_bird_logo_2012.svg.png';
import telegram from './assets/icons/200px-Telegram_logo.svg.png';
import instagram from './assets/icons/200px-Instagram_logo_2016.svg.png';
import './App.css';
import './shared-styles.css';
import './reset.css'

class App extends Component {
    render(){
        return (
            <div>
                <NavBar />
                <Footer />
            </div>
        );
    }
}

class NavBar extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Hello nicky</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

class Footer extends Component {
    render() {
        return (
            <div className="container-fluid footer position-absolute px-md-5">
                <footer className="row rtl">
                    <div className="col-12 col-sm-10 my-auto">
                        <div className="shabnam text-center text-sm-right pr-md-4">تمامی حقوق مادی و معنوی این وب‌سایت متعلق به نیکی و اردوان می‌باشد</div>
                    </div>
                    <div className="col-12 col-sm-2 social-list">
                        <img className="social-icon" src= {twitter} alt="twitter-icon" />
                        <img className="social-icon" src={telegram} alt="telegram-icon" />
                        <img className="social-icon" src={instagram} alt="instagram-icon" />
                    </div>
                </footer>
            </div>
        );
    }
}



export default App;
