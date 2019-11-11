const TWEETS_URL = 'https://twitelum-api.herokuapp.com/tweets';

export const TweetsService = {
    like(id) {
        const token = localStorage.getItem('TOKEN');
        return fetch(`${TWEETS_URL}/${id}/like?X-AUTH-TOKEN=${token}`, {
            method: 'POST'
        })
        .then(response => response.json())
    },
    carrega() {
        const token = localStorage.getItem('TOKEN');
        return fetch(`${TWEETS_URL}?X-AUTH-TOKEN=${token}`)
          .then(response => response.json())
    },
    adiciona(novoTweet) {
        const token = localStorage.getItem('TOKEN');
        return fetch(`${TWEETS_URL}?X-AUTH-TOKEN=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
                body: JSON.stringify({
                conteudo: novoTweet,
                login: 'omariosouto'
            })
        })
        .then(respostaDoServer => {
            return respostaDoServer.json()
        })
    },
    remove(id) {
        const token = localStorage.getItem('TOKEN');
        return fetch(`${TWEETS_URL}/${id}?X-AUTH-TOKEN=${token}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
    }

}