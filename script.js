




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
})

fiftySent.addEventListener('click', ()=>{
    if (fiftySent.disabled) return;    
    fiftySent.disabled = true;
    saldo += 0.5;
    saldoElement.textContent = "Saldo: " + saldo.toFixed(1) + "€";
    setTimeout(()=>{
        fiftySent.disabled = false;        
    }, 150);
})

oneEuro.addEventListener('click', ()=>{
    if (oneEuro.disabled) return;    
    oneEuro.disabled = true;
    saldo += 1;
    saldoElement.textContent = "Saldo: " + saldo.toFixed(1) + "€";
    setTimeout(()=>{
        oneEuro.disabled = false;        
    }, 150);
})

twoEuro.addEventListener('click', ()=>{
    if (twoEuro.disabled) return;    
    twoEuro.disabled = true;
    saldo += 2;
    saldoElement.textContent = "Saldo: " + saldo.toFixed(1) + "€";
    setTimeout(()=>{
        twoEuro.disabled = false;        
    }, 150);
})
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
// Bet and wintable component  end

// Cards start
let allCards = [];

async function getHand(){      
    const response = await fetch('cards.php');
    allCards = await response.json();
    const hand = [];
    while(hand.length < 5){
        let random = Math.round(Math.random()*allCards.length)    
            let pickedCard = allCards.splice(random, 1)[0];
            if(pickedCard){            
            hand.push(pickedCard);
            }   
    }    
    return hand;
};

async function displayHand(){
    let hand = await getHand();
    console.log(hand);
    console.log(allCards)

    let cardOne = document.querySelector('#card0');
    let cardTwo = document.querySelector('#card1');
    let cardThree = document.querySelector('#card2');
    let cardFour = document.querySelector('#card3');
    let cardFive = document.querySelector('#card4');

    cardOne.src = `media/cards/${hand[0]}.svg`
    cardTwo.src = `media/cards/${hand[1]}.svg`
    cardThree.src = `media/cards/${hand[2]}.svg`
    cardFour.src = `media/cards/${hand[3]}.svg`
    cardFive.src = `media/cards/${hand[4]}.svg`






    console.log("diipa")

}
displayHand();




// Cards end
