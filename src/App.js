// 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
import React from 'react';
import './App.css';
import twitter50 from './twitter50.png';

class App extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      quotes: [],
      activeQuote: {},
      color: '',
    }
  }

  componentDidMount() {
    const urlQuotes = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
    fetch(urlQuotes).then((res) => res.json()).then(data => {
      this.setState({
        quotes: data.quotes, 
        activeQuote: {...data.quotes[Math.floor(Math.random()*data.quotes.length)]},
      })
    });
    this.changeBodyColor();
  }

  changeActiveQuote = () => {
    this.setState({activeQuote: { ...this.state.quotes[Math.floor(Math.random()*this.state.quotes.length)]}})
  }

  changeBodyColor = () => {
    const randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
    document.body.style.backgroundColor = randomColor;
    this.setState({color: randomColor});
  }

  newQuoteClick = () => {
    this.changeActiveQuote();
    this.changeBodyColor();
  }

  render() {
    console.log(this.state);
    return (
      <div id="quote-box">
        <h1 id="text" style={{ color: this.state.color }}>{`${this.state.activeQuote.quote || ''}`}</h1>
        <h2 id="author" style={{ color: this.state.color }}>- {`${this.state.activeQuote.author || ''}`}</h2>
        <div id="options">
          <a type="button "id="tweet-quote" title="Tweet this quote!" target="_top" style={{ backgroundColor: this.state.color }} href={`https://twitter.com/intent/tweet?hashtags=quotes&amp;related=freecodecamp&amp;text="${this.state.activeQuote.quote}"-${this.state.activeQuote.author}.`}>
            <img src={twitter50} alt="button to post on twitter"style={{size: '40px'}}/>
          </a>
          <button id="new-quote" style={{ backgroundColor: this.state.color }} onClick={this.newQuoteClick}>New quote</button>
        </div>
      </div>
    );
  }
}

export default App;
