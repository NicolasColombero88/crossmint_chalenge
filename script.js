const candidateId = '2e2f13a4-1ec3-4506-82bd-e1b58f81a31b';

const urlAPI = 'https://challenge.crossmint.io/api';
const urlGoal = `${urlAPI}/map/${candidateId}/goal`;
const urlMyMap = `${urlAPI}/map/${candidateId}`;

const myMegaverseCoord = [];

const goalPolyCoords = [];
const goalComethCoords = [];
const goalSoloonCoords = [];

//scanning the goal map and saving the data
const MegaverScan = async() => {
    try {
        const scanRes = await fetch(urlGoal);
        const scanJson = await scanRes.json();
        const scanGroup = scanJson.goal;

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
                        
                } else if(scanGroup[y][x].endsWith('_SOLOON')) {

                    switch (scanGroup[y][x]){
                        case 'BLUE_SOLOON':
                            goalSoloonCoords.push({row: y, column: x, color: 'blue'});
                        break;
                        case 'RED_SOLOON':
                            goalSoloonCoords.push({row: y, column: x, color: 'red'});
                        break;
                        case 'PURPLE_SOLOON':
                            goalSoloonCoords.push({row: y, column: x, color: 'purple'});
                        break;
                        case 'WHITE_SOLOON':
                            goalSoloonCoords.push({row: y, column: x, color: 'white'});
                        break;
                        default:
                            console.log('error')

                    }
                }
            };
        }

       return goalPolyCoords

    } catch (error) {
        console.log(error);
    }
}

//order to put the Polyanets
const doPolyanets = async () => {
    for (const { row, column } of goalPolyCoords) {
        await new Promise(resolve => setTimeout(resolve, 800));
      await addPolyanet(urlAPI, candidateId, row, column);
    }
}

//order to put the Comeths
const doComeths = async () => {
    for (const { row, column, direction } of goalComethCoords) {
        await new Promise(resolve => setTimeout(resolve, 800));
      await addCometh(urlAPI, candidateId, row, column, direction);
    }
}

//order to put the Soloons
const doSoloons = async () => {
    for (const { row, column, color } of goalSoloonCoords) {
        await new Promise(resolve => setTimeout(resolve, 800));
      await addSoloon(urlAPI, candidateId, row, column, color);
    }
}


//function
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
        console.log('Cometh added:', await response.text());
    } catch (error) {
        console.log('Error adding Cometh:', error);
    }
}

const addSoloon = async(url, id, rowValue, colValue, color) =>{
    try {
        const response = await fetch(`${url}/soloons`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "candidateId": id,
                "row": rowValue,
                "column": colValue,
                "color" : color
            }),
        });
        console.log('Soloon added:', await response.text());
    } catch (error) {
        console.log('Error adding Soloon:', error);
    }
}



const myMegaverse = async() => {
    try {
        const megaverse = await fetch(urlMyMap);
        const  megaJson = await megaverse.json();
        const myMegaverse = megaJson.map.content;

        for (let y = 0; y < myMegaverse.length; y++) {
            for (let x = 0; x < myMegaverse[y].length; x++){        
                myMegaverseCoord.push({row: y, column: x});
            };
        }

         return myMegaverseCoord

    } catch (error) {
        console.log(error);
    }
}

const kill = async () => {
    for (const { row, column } of myMegaverseCoord) {
       await new Promise(resolve => setTimeout(resolve, 50));
         await deathStar(urlAPI, candidateId, row, column, target);
   }
}

const deathStar = async(url, id, rowValue, colValue, target) =>{
    try {
        const response = await fetch(`${url}/polyanet`, {
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
        console.log(`${target} killed:`, await response.text());
    } catch (error) {
        console.log(`Error killing ${target}:`, error);
    }
}


