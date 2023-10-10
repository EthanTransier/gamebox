const cards = ['d-1', 'd-2', 'd-3', 'd-4', 'd-5', 'd-6', 'd-7', 'd-8', 'd-9', 'd-10', 'd-11', 'd-12', 'd-13', 'h-1', 'h-2', 'h-3', 'h-4', 'h-5', 'h-6', 'h-7', 'h-8', 'h-9', 'h-10', 'h-11', 'h-12', 'h-13', 'c-1', 'c-2', 'c-3', 'c-4', 'c-5', 'c-6', 'c-7', 'c-8', 'c-9', 'c-10', 'c-11', 'c-12', 'c-13', 's-1', 's-2', 's-3', 's-4', 's-5', 's-6', 's-7', 's-8', 's-9', 's-10', 's-11', 's-12', 's-13'];
function getRandomCard(){
    return Math.floor(Math.random() * cards.length)
}
var userCards = []
async function deal() {
    userCards = []
    // console.log(index)
    for(let i = 0; i < 2; i){
        let index = getRandomCard();
        if(!userCards.includes(cards[index])){
            userCards.push(cards[index])
            i++
        }
    }
    
    console.log(userCards)

}


deal();

async function hit(){
     for(let i = 0; i < 1; i){
        let index = getRandomCard();
        if(!userCards.includes(cards[index])){
            userCards.push(cards[index])
            i++
        }
    }
    
}
hit()
console.log(userCards)

async function stand(){
    
    let ace = false;
    let final = 0;
    for(let i = 0; i < userCards.length; i++){
        let value = Number(userCards[i].split('-')[1])
        if(value == 1){
            ace=true;
            value = 11
        }
        final+=value
        
    }
    if(final >21 && ace){
        final -= 10;
    }
    console.log(final)
}

stand()

