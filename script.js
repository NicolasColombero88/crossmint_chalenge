const candidateId = '2e2f13a4-1ec3-4506-82bd-e1b58f81a31b';
const urlAPI = 'https://challenge.crossmint.io/api'
let data;

const getGoal = async (url, id) => {
    const response = await fetch(url + '/map/' + id + '/goal')
    const data = await response.json()
    console.log(data)
    return data
}


const polyanets = async (url, rowValue, colValue, action) => {
    const response = await fetch(url, {
        method: action,
        body: JSON.stringify({
            row : rowValue,
            columb : colValue,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })

    const data = await response.json()

    return data
}

getGoal(urlAPI, candidateId);
polyanets(urlAPI, 1,1, 'POST');
