const candidateId = '2e2f13a4-1ec3-4506-82bd-e1b58f81a31b';
const urlAPI = 'https://challenge.crossmint.io/api';
const urlGoal = `https://challenge.crossmint.io/api/map/${candidateId}/goal`;

// const Universo = async() => {
//     let resultado = await fetch (urlGoal);

//     let data = await resultado.json()
//     console.log(data)
// }

// Universo();

const polyanet = async(id, url, rowValue, colValue) => {
    try{
        const toDo = await fetch(`${url}/polyanets`, {
            method: 'POST',
            body: JSON.stringify({
                candidateId: id,
                row : rowValue,
                columb : colValue,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            mode: "no-cors",
        })

        let data = await toDo.json()
        console.log(data)
    } catch (error){
       console.log(error)
}
    
}

polyanet(candidateId, urlAPI, 4, 4)