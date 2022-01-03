const apiKey = 'e4db3ced';
const alertBox = document.getElementsByClassName('alert')[0];
const outputBlock = document.getElementsByClassName('output-block')[0];
let formDisabled = false;
document.getElementsByTagName("form")[0].addEventListener("submit",evt=>{
    evt.preventDefault();
    if(formDisabled) return;
    formDisabled = true;
    search();
})
function search(){
    let inputText = document.getElementById('search-text').value;

    outputBlock.setAttribute('hidden',"");
    alertBox.setAttribute('hidden',"");

    let request = new XMLHttpRequest();
    request.onload = function(){
        formDisabled = false;
        let response = JSON.parse(request.responseText);
        if (response.Error == undefined){
            outputBlock.removeAttribute('hidden');
            outputBlock.querySelector(".movie-image img").src = response.Poster == 'N/A' ? "css/image_placeholder.png" : response.Poster;
            outputBlock.querySelector(".movie-info h5").innerHTML = response.Title;
            outputBlock.querySelector(".director").innerHTML = response.Director;
            outputBlock.querySelector(".duration").innerHTML = response.Runtime;
            outputBlock.querySelector(".actors").innerHTML = response.Actors;
            outputBlock.querySelector(".rating").innerHTML = response.imdbRating;
        }else{
            alertBox.removeAttribute('hidden');
        }
    };
    request.open("GET", `https://www.omdbapi.com/?apikey=${apiKey}&t=${inputText}`);
    request.send();
}
