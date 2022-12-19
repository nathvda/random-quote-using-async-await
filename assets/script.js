document.getElementById("oneMore").addEventListener('click', loadQuote);
window.addEventListener('load', loadQuote);

let main = document.querySelector("main");

function generateQuote(quote){
    let element = document.createElement("blockquote");
    let quotation = document.createTextNode(`${quote.quote}`);
    let quoter = document.createElement("b");
    quoter.classList.add("quoter");
    let haha = document.createTextNode(`${quote.author}`);
    let qimage = document.createElement("img");
    
    
    if (`${quote.photo}` === "") {
        qimage.src = `https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/SGI-2016-South_Georgia_%28Fortuna_Bay%29%E2%80%93King_penguin_%28Aptenodytes_patagonicus%29_04.jpg/1200px-SGI-2016-South_Georgia_%28Fortuna_Bay%29%E2%80%93King_penguin_%28Aptenodytes_patagonicus%29_04.jpg`;
    } else {
        qimage.src = `${quote.photo}`;
    }

    quoter.appendChild(haha); 
    element.appendChild(qimage);
    element.appendChild(quotation);
    element.appendChild(quoter);
    main.appendChild(element);
}

async function loadQuote(){
   try{
    main.innerHTML = "";
    let quoteWanted = await fetch('https://thatsthespir.it/api');
    let quoteGotten = await quoteWanted.json();
    let name = quoteGotten.author.split(" ")[0];
    guessAge(name);
    generateQuote(quoteGotten);
   }
   catch (e){
    console.log("It didn't work");
   }
}

async function guessAge(pollux){

    try {
        let name = await fetch(`https://api.agify.io/?name=${pollux}`);
    let result = await name.json();

    if (`result.age` == "null"){
        return;
    } else {
    let element = document.createElement("p");
    element.classList.add("age");
    element.innerHTML = `Âge approximatif : <b>${result.age}</b>`;

    main.appendChild(element);
    }
    }

    catch (e) {
       return "no age retrieved";
    }
}
