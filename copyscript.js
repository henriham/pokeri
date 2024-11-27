
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

let hand = [];
let allCards = [];

async function initCards() {    
    const response = await fetch('cards.php');
    allCards = await response.json();
    
    while(hand.length < 5){
        let random = Math.floor(Math.random() * allCards.length);
        let pickedCard = allCards.splice(random, 1)[0];
        if(pickedCard){
            hand.push(pickedCard);
        }        
    }
}

document.querySelector('.dealBtn').addEventListener('click', firstDeal);

async function firstDeal() {
    if(!firstDealCompleted){   
        if(allCards.length === 0){
            await initCards();
        }
        let displayedCards = document.querySelectorAll('.card');
        let h1El = document.querySelector('h1');
        displayedCards.forEach((card, index) => {
            if(h1El){
                h1El.remove();
            }
        card.querySelector('img').src = `./media/cards/${hand[index]}.svg`;
        })
        console.log(allCards);
        console.log(hand);
        firstDealCompleted = true;
    }
}

const displayedCards = document.querySelectorAll('.card');
let firstDealCompleted = false;
let selectedCards = []; // holds selected cards

function cardSelector(event){
    
    const card = event.currentTarget;
    const index = Array.from(displayedCards).indexOf(card);
    let h1El = card.querySelector('h1');
    if(!firstDealCompleted){
        console.log("cards have not been delt yet !");
        return;
    }    
    if(!h1El){
        const h1 = document.createElement('h1');
        h1.textContent = 'LUKITTU';
        h1.className = 'selected';
        card.appendChild(h1); 
        selectedCards.push({ index, value: hand[index]});
        console.log(`Selected: ${JSON.stringify(selectedCards)}`);
    }else{
        h1El.remove();
        const cardRemove = selectedCards.find(card => card.index === index);
        selectedCards.splice(selectedCards.indexOf(cardRemove), 1);
        console.log(`card removed, Remaining; ${JSON.stringify(selectedCards)}`);
        
    } 
    
}
displayedCards.forEach((card) => {
    card.addEventListener('click', cardSelector)
});


document.querySelector('.dealBtn').addEventListener('click', secondDeal);
async function secondDeal(){
    if(firstDealCompleted){       
        // hand is transformed into obj, with indexes to swap them at their places
        /* const handIndexes = hand.map((card, index) => ({ index, card}));
        console.log(JSON.stringify(handIndexes)); */
        console.log(allCards)
        console.log("2deal " + JSON.stringify(selectedCards))
        console.log(selectedCards)

        if(selectedCards.length < 5){
            selectedCards = Array.from({ length: 5}, (_, i) =>{
                const existingCard = selectedCards.find(card => card.index === i);
                return existingCard || {index: i, value: null};
            })
        }
        
        

        
        console.log("selesC: "+ JSON.stringify(selectedCards))

        firstDealCompleted = false;
        allCards = [];
        hand = [];
        
    }
}