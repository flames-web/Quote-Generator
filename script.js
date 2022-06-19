const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote');
const authorText = document.querySelector('#author');
const twitterBtn = document.querySelector('#twitter');
const newQuoteBtn = document.querySelector('#new-quote');
const loader = document.querySelector('#loader');


function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}
let data = [];
const newQuotes = () => {
    loading();
  let quotes = data[Math.floor(Math.random() * data.length)];
   !quotes.author ? authorText.textContent = 'Unknown' : authorText.textContent = quotes.author;
   quotes.text > 120 ? quoteText.classList.add('long-quote') : quoteText.classList.remove('long-quote')
   complete();
   quoteText.textContent = quotes.text;
}

const getQuotes = async () => {
    loading();
    try {
        const res =  await fetch('https://type.fit/api/quotes')
         data = await res.json();
         console.log(data)
         newQuotes();
    } catch (e) {
        console.log('Error',e)
    }
}

const tweetQuotes = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
    window.open(twitterUrl,'_blank');
}
//Add Event Listenener
newQuoteBtn.addEventListener('click',newQuotes);
twitterBtn.addEventListener('click',tweetQuotes);
getQuotes();

