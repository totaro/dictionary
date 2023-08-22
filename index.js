const inputEl = document.getElementById("input");

const infoTextEl = document.getElementById("info-text");

const meaningContainerEl = document.getElementById("meaning-container");

const titleEl =  document.getElementById("title");
const meaningEl =  document.getElementById("meaning");
const audioEl =  document.getElementById("audio");



async function fetchAPI(word){
    console.log("fetsApi func:", word);


    try {

        infoTextEl.style.display = "block";
        audioEl.style.display = "inline-flex";
        meaningContainerEl.style.display = "none";
        
        infoTextEl.innerText = `Searching the meaning of "${word}"`;
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

        const result = await fetch(url).then((res)=>res.json());
        console.log("resultti: ", result);

        //no word json result
        if(result.title){
            infoTextEl.style.display = "none";
            meaningContainerEl.style.display = "block";
            titleEl.innerText = word;
            meaningEl.innerText = "N/A"
            audioEl.style.display = "none";
        } else {

            infoTextEl.style.display = "none";
            meaningContainerEl.style.display = "block";
            audioEl.style.display = "inline-flex";

            titleEl.innerText = result[0].word;
            meaningEl.innerText = result[0].meanings[0].definitions[0].definition;
        
            let audioAvailable = result[0].phonetics[1].audio;

            console.log("audioo",audioAvailable);

                if (audioAvailable){
                    audioEl.src = result[0].phonetics[1].audio;
                } else {
                    audioEl.style.display = "none";
                }


        }

        
        

        
    } catch (error) {

        infoTextEl.innerText = `An error called "${error.message}" happend, try again later`;
        console.log(error);
        
    }


    

}




inputEl.addEventListener("keyup", (e)=>{
    console.log("keyuppia: ", e.key + " " + e.target.value);

        if (e.target.value && e.key === "Enter"){

            fetchAPI(e.target.value)
        }
})


/* Header */
const toggleBtn = document.querySelector('.toggle_btn');
const toggleBtnIcon = document.querySelector('.toggle_btn i');
const dropDownMenu = document.querySelector('.dropdown_menu');

toggleBtn.onclick = function(){

    dropDownMenu.classList.toggle('open');
    const isOpen = dropDownMenu.classList.contains('open');

    toggleBtnIcon.classList = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'
}

window.onscroll = function() {stickyHeader()};

var header = document.getElementById("header");
var sticky = header.offsetTop;

function stickyHeader() {
  if (window.scrollY >= sticky) {
    header.classList.add("sticky")
  } else {
    header.classList.remove("sticky");
  }
}

