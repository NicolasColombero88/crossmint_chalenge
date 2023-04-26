const candidateId = '2e2f13a4-1ec3-4506-82bd-e1b58f81a31b';

const urlAPI = 'https://challenge.crossmint.io/api';
const urlGoal = `${urlAPI}/map/${candidateId}/goal`;
const urlMyMap = `${urlAPI}/map/${candidateId}`;

const goalPolyCoords = [];
const goalComethCoords = [];
const goalSoloonCoords = [];

const myPolyCoords = [];
const myComethCoords = [];
const mySoloonCoords = [];

const MegaverScan = async() => {
    try {
        const scanRes = await fetch(urlGoal);
        const scanJson = await scanRes.json();
        const scanGroup = scanJson.goal;

        console.log(scanGroup)

        for (let y = 0; y < scanGroup.length; y++) {
            for (let x = 0; x < scanGroup[y].length; x++){
                
                if (scanGroup[y][x] == 'POLYANET') {
                        goalPolyCoords.push({row: y, column: x});
                } else if(scanGroup[y][x].endsWith('_COMETH')) {
                        switch (scanGroup[y][x]){
                            case 'UP_COMETH':
                                goalComethCoords.push({row: y, column: x, direction: 'up'});
                            break;
                            case 'DOWN_COMETH':
                                goalComethCoords.push({row: y, column: x, direction: 'down'});
                            break;
                            case 'LEFT_COMETH':
                                goalComethCoords.push({row: y, column: x, direction: 'left'});
                            break;
                            case 'RIGHT_COMETH':
                                goalComethCoords.push({row: y, column: x, direction: 'right'});
                            break;
                            default:
                                console.log('error')
                        }
                        
                } else if (scanGroup[y][x].endsWith('_SOLOON')){
                        goalSoloonCoords.push({row: y, column: x});
                }

                if(scanGroup[y][x] == 'POLYANET') {
                    goalPolyCoords.push({row: y, column: x});
                }

            };
        }

       return goalPolyCoords

    } catch (error) {
        console.log(error);
    }
}

const myPolyanets = async() => {
    try {
        const res = await fetch(urlMyMap);
        const polysCountsJson = await res.json();
        const myPolyanets = polysCountsJson.map.content;

        console.log(myPolyanets)

        for (let y = 0; y < myPolyanets.length; y++) {
            for (let x = 0; x < myPolyanets[y].length; x++){
                
                if(myPolyanets[y][x]) {
                    myPolyCoords.push({row: y, column: x});
                }
            };
        }

         return myPolyCoords

    } catch (error) {
        console.log(error);
    }
}

const doPolyanets = async () => {
    for (const { row, column } of goalPolyCoords) {
        await new Promise(resolve => setTimeout(resolve, 800));
      await addPolyanet(urlAPI, candidateId, row, column);
    }
  }

  const doComeths = async () => {
    for (const { row, column, direction } of goalComethCoords) {
        await new Promise(resolve => setTimeout(resolve, 800));
      await addCometh(urlAPI, candidateId, row, column, direction);
    }
  }

  const deletePolyanets = async () => {
     for (const { row, column } of myPolyCoords) {
        await new Promise(resolve => setTimeout(resolve, 800));
          await killPolyanets(urlAPI, candidateId, row, column);
    }
  }

const addPolyanet = async(url, id, rowValue, colValue) =>{
    try {
        const response = await fetch(`${url}/polyanets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "candidateId": id,
                "row": rowValue,
                "column": colValue
            }),
        });
        console.log('Polyanet added:', await response.text());
    } catch (error) {
        console.log('Error adding Polyanet:', error);
    }
}

const addCometh = async(url, id, rowValue, colValue, direct) =>{
    try {
        const response = await fetch(`${url}/comeths`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "candidateId": id,
                "row": rowValue,
                "column": colValue,
                "direction" : direct
            }),
        });
        console.log('Polyanet added:', await response.text());
    } catch (error) {
        console.log('Error adding Polyanet:', error);
    }
}


const killPolyanets = async(url, id, rowValue, colValue) =>{
    try {
        const response = await fetch(`${url}/polyanets`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "candidateId": id,
                "row": rowValue,
                "column": colValue
            }),
        });
        console.log('Polyanet killed:', await response.text());
    } catch (error) {
        console.log('Error killing Polyanet:', error);
    }
}


