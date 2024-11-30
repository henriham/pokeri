
// Coins and Saldo component start
const twentySent = document.querySelector('#twentySent');
const fiftySent = document.querySelector('#fiftySent');
const oneEuro = document.querySelector('#oneEuro');
const twoEuro = document.querySelector('#twoEuro');
const saldoElement = document.querySelector('#saldo');
let saldo = 0;
saldoElement.textContent = "Saldo: " + saldo + "€";

twentySent.addEventListener('click', ()=>{
    if (twentySent.disabled) return;    
    twentySent.disabled = true;
    saldo += 0.2;
    saldoElement.textContent = "Saldo: " + saldo.toFixed(1) + "€";
    setTimeout(()=>{
        twentySent.disabled = false;        
    }, 150);
});

fiftySent.addEventListener('click', ()=>{
    if (fiftySent.disabled) return;    
    fiftySent.disabled = true;
    saldo += 0.5;
    saldoElement.textContent = "Saldo: " + saldo.toFixed(1) + "€";
    setTimeout(()=>{
        fiftySent.disabled = false;        
    }, 150);
});

oneEuro.addEventListener('click', ()=>{
    if (oneEuro.disabled) return;    
    oneEuro.disabled = true;
    saldo += 1;
    saldoElement.textContent = "Saldo: " + saldo.toFixed(1) + "€";
    setTimeout(()=>{
        oneEuro.disabled = false;        
    }, 150);
});

twoEuro.addEventListener('click', ()=>{
    if (twoEuro.disabled) return;    
    twoEuro.disabled = true;
    saldo += 2;
    saldoElement.textContent = "Saldo: " + saldo.toFixed(1) + "€";
    setTimeout(()=>{
        twoEuro.disabled = false;        
    }, 150);
});
// Coins and Saldo component end
// Bet and wintable component start
const bet = [0.2, 0.4, 0.6, 0.8, 1];
let currentIndex = 0;
const betBtn = document.querySelector('.betBtn');
const betElement = document.querySelector('#bet');
betElement.textContent = `Panos: ${bet[currentIndex]}€`;

const updateBet = () => {
    if (betBtn.disabled) return;
    betBtn.disabled = true;
    currentIndex = (currentIndex + 1) % bet.length;
    betElement.textContent = `Panos: ${bet[currentIndex]}€`;
    setTimeout(()=>{
        betBtn.disabled = false;        
    }, 150);
};

let previousColumnIndex = -1;
const tableCol = () => {
    const table = document.querySelector('#table');
    const rows = table.rows;    
    for(let i = 0; i < rows[0].cells.length; i++){
        const cell = rows[0].cells[i];
        if(cell.textContent === `${bet[currentIndex]}€`){
            if(previousColumnIndex !== -1){
                for( let rowIndex = 1; rowIndex < rows.length; rowIndex++){
                    const row = rows[rowIndex];
                    const oldTargetCell = row.cells[previousColumnIndex];
                    if(oldTargetCell) {
                        oldTargetCell.style.backgroundColor = 'green';
                        
                    }
                }
            }         

            for(let rowIndex = 1; rowIndex < rows.length; rowIndex++){
                const row = rows[rowIndex];         
                const targetCell = row.cells[i];                
                if(targetCell){
                    targetCell.style.backgroundColor = 'red'
                    
                    }
                }
            previousColumnIndex = i;
            break;
        }
    }
};
tableCol();
betBtn.addEventListener('click', () =>{
    updateBet();
    tableCol();
});

// CARD DEALING FUNCTINALITY

// This function gets filenames aka "deck" from folder
let deckOfCards = [];
async function getDeckOfCards(){
    const response = await fetch('./cards.php');
    deckOfCards = await response.json();
    return deckOfCards;
}

// this function serves 5 random cards at the start and hopefully cardchange also...
let firstDealCompleted = false; 
let secondDealCompleted = false;
let hand = {};
async function getRandomCards(){
    if(Object.keys(hand).length === 0 && firstDealCompleted === false){        
        const deckOfCards = await getDeckOfCards();    
        let tempHand = [];  
        while(tempHand.length < 5){
            let random = Math.floor(Math.random() * deckOfCards.length);
            let pickedCard = deckOfCards.splice(random, 1)[0];
            tempHand.push(pickedCard);            
        }
        hand = tempHand.reduce((acc, value, index) =>{
            acc[index] = value;
            return acc;
        }, {});    
        console.log(hand);
        console.log(deckOfCards);
        return hand;
    }
    // this part serves second card deal
    if(firstDealCompleted === true){
        console.log("second cards inc!")

        Object.entries(selectedCards).forEach(([key, card]) =>{
            hand[key] = card;
            console.log(key, card);
        })

        Object.entries(hand).forEach(([key, card]) =>{
            if(card === null){
                let random = Math.floor(Math.random() * deckOfCards.length);
                let pickedCard = deckOfCards.splice(random, 1)[0];    
                hand[key] = pickedCard;
            }
        })
        console.log(hand);
        console.log(deckOfCards)   
        return hand;
    }
}

// this function displays cards to the dom...
document.querySelector('.dealBtn').addEventListener('click', displayCards);

async function displayCards(){
    await getRandomCards();
    if(Object.keys(hand).length === 5 && firstDealCompleted === false){
        /* console.log("getrandomcfunc")
        console.log(hand)
        console.log(deckOfCards)  */       
        let cardData = []; 
        Object.entries(hand).forEach(([key, card])=>{
            //console.log(`key ${key}, card: ${card}`);
            let cardDiv = document.querySelector(`#card${key}`);            
            const img = cardDiv.querySelector('img');                
            img.src = `./media/cards/${card}.svg`;
            cardData.push({cardDiv, key})
        });
    firstDealCompleted = true;    
    return cardData
    }
    if(firstDealCompleted === true){
        //await getRandomCards();

        
    }
}


let selectedCards = {0: null, 1: null, 2: null, 3: null, 4: null};
function selectCards(card, index){
    const h1 = document.createElement('h1');
    const h1Element = card.querySelector('h1');    
    if(!firstDealCompleted){
        console.log("not served yet!")
    }    
    if(firstDealCompleted && !h1Element){
        /* console.log(card)
        console.log(index)
        console.log(hand) */
        h1.textContent = `LUKITTU`;
        h1.className = 'selected';
        card.appendChild(h1);
        selectedCards[index] = hand[index];        
        //console.log(hand[index]);
        console.log(selectedCards);
        console.log(hand)
    }
    if(firstDealCompleted && h1Element){
        h1Element.remove();
        selectedCards[index] = null;        
        //console.log(`${hand[index]} removed!`);
        console.log(selectedCards);
        console.log(hand)
    }
}
const cardDivs = document.querySelectorAll('.card');
cardDivs.forEach((card, index)=>{
    card.addEventListener('click', ()=>{
        selectCards(card, index)
    });
});

