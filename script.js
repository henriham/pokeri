




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
tableCol()
betBtn.addEventListener('click', () =>{
    updateBet();
    tableCol();
});
// Bet and wintable component  end

// Cards start
const allCards = [];
fetch('cards.php')
.then(response => response.json())
.then(files =>{
    files.forEach(file =>{
        const filePath = `${file}`;
        allCards.push(filePath)
        
    })
})
.catch(error => console.error('error: ', error))


// Cards end
console.log(allCards)