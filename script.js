
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
    console.log(allCards)
    console.log(hand)
    
}

const displayedCards = document.querySelectorAll('.card');
function cardSelector(event){
    console.log("card clicked ", event.currentTarget);
    const card = event.currentTarget;
    let h1El = card.querySelector('h1');
    if(!h1El){
        const h1 = document.createElement('h1');
        h1.textContent = 'LUKITTU';
        h1.className = 'selected';
        card.appendChild(h1); 
    }else{
        h1El.remove();
    }
    
    
}
displayedCards.forEach((card) => {
    card.addEventListener('click', cardSelector)
})

















// Bet and wintable component  end



// Cards start
/* let allCards = [];
let hand = [];
let selectedCards = [];

async function initCards(){
    const response = await fetch('cards.php');
    allCards = await response.json();
    hand = [];
    selectedCards = [];
    
}

async function displayHand(){
    if(allCards.length === 0){
        await initCards();
    }    
    if(hand.length === 0){
        hand = getRandomCards(5);
        
    
    }else{
        let newCardsNeeded = 5 - selectedCards.length;
        let newCards = getRandomCards(newCardsNeeded);

        hand = hand.map((card, index) => {
            return selectedCards.includes(index) ? card : newCards.shift();
        });
    }

    let displayedCards = document.querySelectorAll('.card');
    displayedCards.forEach((card, index) => {
        const h1El = document.querySelector('h1');
        if(h1El){
            h1El.remove();
        }
        card.querySelector('img').src = `./media/cards/${hand[index]}.svg`;
    });
    cardSelectHandler();
    

}

function getRandomCards(num){
    const newCards = [];
    while(newCards.length < num){
        let random = Math.floor(Math.random() * allCards.length);
        let pickedCard = allCards.splice(random, 1)[0];
        if(pickedCard){
            newCards.push(pickedCard);
        }
    }
    console.log("newCards "+ newCards)
    return newCards;
}

function cardSelectHandler(){
    const displayedCards = document.querySelectorAll('.card');
    displayedCards.forEach((card, index) => {
        const h1El = document.querySelector('h1');
        if(h1El){
            h1El.remove();    
        }
            const h1 = document.createElement('h1');
            h1.textContent = 'LUKITTU';
            h1.className = '.selected';
            card.appendChild(h1);
            selectedCards.push(index);
        
        console.log(`Selected Cards: ${selectedCards}`);
    })
}



document.querySelector('.dealBtn').addEventListener('click', displayHand)
initCards()






 */
// Cards end
