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
    qimage.setAttribute("alt", `${quote.author}`);
    
    
    if (`${quote.photo}` === "") {
        qimage.src = `./assets/svg/profile.svg`;
    } else {
        qimage.src = `${quote.photo}`;
    }

    quoter.appendChild(haha); 
    element.appendChild(qimage);
    element.appendChild(quotation);
    element.appendChild(quoter);
    main.appendChild(element);
}

let loader = document.getElementById("loader");

async function loadQuote(){
    loader.style.display = "flex"; 
   try{
    main.innerHTML = "";
    let quoteWanted = await fetch('https://thatsthespir.it/api');
    let quoteGotten = await quoteWanted.json();
    let name = quoteGotten.author.split(" ")[0];
    guessAge(name);
    generateQuote(quoteGotten);
    loader.style.display = "none";

   }
   catch (e){
    console.log("It didn't work");
    loader.innerHTML = "Rien à afficher =(";
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
