// array that holds all of the cards
const cards = ['d-1', 'd-2', 'd-3', 'd-4', 'd-5', 'd-6', 'd-7', 'd-8', 'd-9', 'd-10', 'd-11', 'd-12', 'd-13', 'h-1', 'h-2', 'h-3', 'h-4', 'h-5', 'h-6', 'h-7', 'h-8', 'h-9', 'h-10', 'h-11', 'h-12', 'h-13', 'c-1', 'c-2', 'c-3', 'c-4', 'c-5', 'c-6', 'c-7', 'c-8', 'c-9', 'c-10', 'c-11', 'c-12', 'c-13', 's-1', 's-2', 's-3', 's-4', 's-5', 's-6', 's-7', 's-8', 's-9', 's-10', 's-11', 's-12', 's-13'];

// element that the output is printed to
const result = document.getElementById('result')
const result2 = document.getElementById('result2');

// element that the winner is printed to
const winner = document.getElementById('winner');

// function that will return one random card
function getRandomCard(){
    return Math.floor(Math.random() * cards.length)
}

// array that holds the user's and the dealer's cards, respectively
var userCards = [];
var dealersCards = [];

// starts the game, deals cards to the user and then the dealer
async function deal() {
    userCards = []
    // gets two random cards, checks if they have been used already, and then adds them to the user's deck
    for(let i = 0; i < 2; i){
        let index = getRandomCard();
        if(!userCards.includes(cards[index])){
            userCards.push(cards[index])
            i++
        }
    }
    // sets the html element to the user's deck
    result.textContent = userCards.join(', ')
    console.log(userCards)

    dealersCards = []
    // gets two random cards, checks if they have been used already, and then adds them to the dealers's deck
    for(let i = 0; i < 2; i){
        let index = getRandomCard();
        if(!userCards.includes(cards[index]) && !dealersCards.includes(cards[index])){
            dealersCards.push(cards[index])
            i++
        }
    }
    // sets the html element to the dealer's deck
    result2.textContent = `${dealersCards[0]}, face down card`
    console.log(dealersCards)
}


// deal();

async function hit(){
     for(let i = 0; i < 1; i){
        let index = getRandomCard();
        if(!userCards.includes(cards[index])){
            userCards.push(cards[index])
            i++
        }
    }
    result.textContent = userCards.join(', ')
    console.log(userCards)
}
// hit()

// game end function, tallies up the numbers and decides a winner
async function stand(){
    let userAce = false;
    let userFinal = 0;

    // iterates through the user's cards, sees if their is an ace, and makes any face card worth 10 points
    for(let i = 0; i < userCards.length; i++){
        let value = Number(userCards[i].split('-')[1])
        if(value == 1){
            userAce=true;
            value = 11
        }else if(value >= 10){
            value = 10
        }
        userFinal+=value
        
    }
    // if their is an ace and the final is greater than 21, it will make the ace worth 1 point
    if(userFinal >21 && userAce){
        userFinal -= 10;
    }
    // prints the user's score to the page
    result.textContent = `User's Score: ${userFinal}`;
    console.log(userFinal)

    // Dealer section
    let dealerAce = false;
    let dealerFinal = 0;

    // iterates through the dealer's cards, sees if their is an ace, and makes any face card worth 10 points
    for(let i = 0; i < dealersCards.length; i++){
        let value = Number(dealersCards[i].split('-')[1])
        if(value == 1){
            dealerAce=true;
            value = 11
        }else if(value >= 10){
            value = 10
        }
        dealerFinal+=value
        
    }
    // if their is an ace and the final is greater than 21, it will make the ace worth 1 point
    if(dealerFinal >21 && dealerAce){
        dealerFinal -= 10;
    }
    // prints the dealer's score to the page
    result2.textContent = `Dealer's Score: ${dealerFinal}`;
    console.log(dealerFinal)
    
    var gameResult = "";

    // Checks the scores to see who wins the game
    if(dealerFinal > 21 && userFinal > 21 || userFinal == dealerFinal){
        gameResult = 'tie'
    }else if(dealerFinal > 21 && userFinal <= 21){
        gameResult = "user wins"
    }else if(userFinal > 21 && dealerFinal <= 21){
        gameResult = 'dealer wins'
    }else if(userFinal <= 21 && dealerFinal <= 21){
        if(userFinal > dealerFinal){
            gameResult = 'user wins'
        }else{
            gameResult = 'dealer wins'
        }
    }

    // prints the winner result to the page
    winner.textContent = gameResult
}

// stand()

