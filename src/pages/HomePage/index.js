import React, { Component, Fragment } from 'react';
import Cabecalho from '../../components/Cabecalho'
import NavMenu from '../../components/NavMenu'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
import Tweet from '../../components/Tweet'

class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      novoTweet: '',
      tweets: []
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('TOKEN');
    fetch(`https://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${token}`)
      .then(response => response.json())
      .then(tweets => {
        this.setState({ tweets })
      })
  }

  adicionaTweet = (infosDoEvento) => {
    infosDoEvento.preventDefault();
    if(this.state.novoTweet.length > 0) {
      const token = localStorage.getItem('TOKEN');

      fetch(`https://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          conteudo: this.state.novoTweet,
          login: 'omariosouto'
        })
      })
      .then(respostaDoServer => {
        return respostaDoServer.json()
      })
      .then((tweetDoServidor) => {
        this.setState({
          tweets: [tweetDoServidor, ...this.state.tweets],
          novoTweet: ''
        });
      })
    }
  }

  render() {
    const {novoTweet} = this.state;
    
    return (
      <Fragment>
        <Cabecalho>
          <NavMenu usuario="@omariosouto" />
        </Cabecalho>
        <div className="container">
          <Dashboard>
            <Widget>
              <form className="novoTweet">
                <div className="novoTweet__editorArea">
                <span className={
                    `novoTweet__status
                    ${
                            this.state.novoTweet.length	>	140
                            ?	'novoTweet__status--invalido'
                            :	''
                    }
                    `
                }>{novoTweet.length}/140</span>
                <textarea 
                  className="novoTweet__editor" 
                  placeholder="O que está acontecendo?"
                  value={this.state.novoTweet}
                  onChange={ event => this.setState({novoTweet: event.target.value}) }></textarea>
              </div>
              <button 
                type="submit" 
                className="novoTweet__envia"
                onClick={this.adicionaTweet}
                disabled={novoTweet.length === 0 || novoTweet.length > 140}>Tweetar</button>
              </form>
            </Widget>
            <Widget>
                <TrendsArea />
            </Widget>
          </Dashboard>
          <Dashboard posicao="centro">
            <Widget>
              <div className="tweetsArea">
                {this.state.tweets.map((tweetInfo, index) => {
                  return (
                    <Tweet
                      key={tweetInfo + index}
                      texto={tweetInfo.conteudo}
                      usuario={tweetInfo.usuario}
                    />
                  )
                })}
              </div>
            </Widget>
          </Dashboard>
        </div>
      </Fragment>
    );
  }
}

export default HomePage;