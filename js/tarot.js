let number = "";
let cards = [];
let data;
let spread = 3;
let controlback = false;

function spreadSetting(value){
    spread = value;
}

$(document).ready(function(){
        $("#menu").load("components/menu.html");
        $("#warning").load("components/warning.html");    
});

// Opening screen
/* function fadeOut() {
$('#first-screen').fadeOut(5000);
setTimeout(function() {
$('#second-screen').removeClass('display');
$('#first-screen').addClass('display');    
}, 5000);    
} */

// Reading starts here
function thirdScreen(arg) {
window.scrollTo(0, 0);    
if (arg === "newq"){
number = "";    
}    
document.getElementById("div-content").innerHTML='<div class="instruction-title">First Instructions</div><div class="first-instructions"><p class="item1">Think about what you wanna ask and formulate a clear question.</p><p class="item2">While focusing on your question, choose a number between 1 and 9.</p><p class="item3">In the next step you must choose three or five cards, whatever cards you want because there aren\'t wrong choices.</p><p style="text-align:center; margin-top: 20px;">Let\'s start? Choose a number.</p><p style="text-align:center;margin-top: -20px;"><br><button id="1" type="button" class="btn btn-outline-info btn-lg" onclick="getId(this.id)">1</button><button id="2" type="button" class="btn btn-outline-info btn-lg" onclick="getId(this.id)">2</button><button id="3" type="button" class="btn btn-outline-info btn-lg" onclick="getId(this.id)">3</button><button id="4" type="button" class="btn btn-outline-info btn-lg" onclick="getId(this.id)">4</button><button id="5" type="button" class="btn btn-outline-info btn-lg" onclick="getId(this.id)">5</button><button id="6" type="button" class="btn btn-outline-info btn-lg" onclick="getId(this.id)">6</button><button id="7" type="button" class="btn btn-outline-info btn-lg" onclick="getId(this.id)">7</button><button id="8" type="button" class="btn btn-outline-info btn-lg" onclick="getId(this.id)">8</button><button id="9" type="button" class="btn btn-outline-info btn-lg" onclick="getId(this.id)">9</button></p><div>';
}
function getId(id){
    number = id;
    $('#second-screen').removeClass('second-screen-main'); //remove margin-top to keep shuffle.gif centralized 
    $('#content').css('min-height', '100vh');   
    document.getElementById("div-content").innerHTML='<div id="shuffle"><img class="shuffling" src="images/shuffle.gif" /></div>';
    cards = [];
    getData();
    
}
function getData(){

    let changeN;
     $.ajax({
        url: "js/cardsinfo.json",
        dataType: "json",
        cache: false,
        success: function (json) {

          data = json;
          shuffleCards(); 
        setTimeout(function(){
            if (parseInt(spread, 10) === 3){
            changeN = "three";     
            }else {
              changeN = "five";  
            }   
        $('#second-screen').addClass('second-screen-main');  
        $('#content').css('min-height', '');     
        document.getElementById("div-content").innerHTML='<div id="show-cards"><div id="show-cards-top"><p style="font-size: calc(20px + 1.5vw);text-align:center;margin-top: 10px;margin-bottom: 10px">Choose ' + changeN + ' cards</p></div><div id="cards"></div><div><button type="button" class="btn btn-outline-primary" style="margin-top: 10px;color:#ffffff" id="newq" onclick="thirdScreen(this.id);">Ask another question</button></div></div>';   
        showCards();
    }, number + [100 + 10]);    
        }
});
}
function shuffleAlgorithm(array) {
  for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

  return array;

    
}

function shuffleCards () {
data = shuffleAlgorithm(data);
    if (number > number - [number - 1] ){
        number--;
        window.setTimeout(shuffleCards, 1000);
        
    }
    
}

// Show reading results
function showCards() {
    for (let i = 0; i < 22; i++) {
        let images = '<img class="img-responsive img back-image" src="images/back.png" id="' + data[i]['id'] + '" onclick="result(this.id)"/>';
        $('#cards').append(images);
    }
}
function result(id){
let showImg;    
if(cards.indexOf(id) == -1){ // The cards variable can't have duplicate ids
  cards.push(id);
} 
$('#' + id).addClass('selected');   
if (cards.length === parseInt(spread, 10)){ 
for (let j = 0; j < parseInt(spread, 10); j++) { 
if (parseInt(spread, 10) === 3){ // Check which spread is being used  
showImg = '<img class="spread" src="images/' + cards[j] + '.jpg" id="' + cards[j] + '1"  onclick="showModal(this.id)">';     
}else {
showImg = '<img class="spread2" src="images/' + cards[j] + '.jpg" id="' + cards[j] + '1" onclick="showModal(this.id)">';         
}
    $('#cards').append(showImg);
    
}
let three = '<p class="item1" style="font-size:calc(15px + 0.5vw);margin-top: 30px;">This is your three cards spread containing the answers to your question. The card on the left represents the past, the card in the middle the present situation, and the one on the right represents a possible future.</p><p class="item2" style="font-size:calc(15px + 0.5vw);">Click on each card to know their meaning.</p>';

let five = '<p class="item1" style="font-size:calc(15px + 0.5vw);margin-top: 30px;">This is your five cards spread containing the answers to your question. The cards one to five from left to right represent the past, recent past, present, near future, and future, respectively.</p><p class="item2" style="font-size:calc(15px + 0.5vw);">Click on each card to know their meaning.</p>';
    
    $('.back-image').addClass('display'); // Hide all the 22 back.png images
    
    // Check which spread is being used
    if (parseInt(spread, 10) === 3){ 
    $('#show-cards-top').html(three);
    }else {
    $('#show-cards-top').html(five);    
    }
    window.scrollTo(0, 0);
    
    // Generate modals for card explanations
    for (let i = 0; i < 22; i++) {
        let text = '<div class="modal fade modal2" id="' + data[i]['id'] + '12" tabindex="-1" role="dialog" aria-labelledby="warningModalCenterTitle" aria-hidden="true"><div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-content modal-content2" style="font-family: "Stylish", sans-serif;"><div class="modal-header"><h5 class="modal-title" style="color:#000000;" id="warningModalLongTitle">' + data[i]['name'] + '</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="hideModal()"><span aria-hidden="true">&times;</span></button></div><div class="modal-body modal-body2" style="text-align:justify;font-size:calc(12px + 0.5vw);color: #000000;">' + data[i]['meaning'] + '<div style="text-align:right;font-size:calc(12px + 0.5vw);color: #000000;margin: 0px 10px 10px 0px">Source: biddytarot.com</div></div></div></div></div>';
        $('#div-content').append(text);
        
        
    }   
} 
    
}

// Show modals for cards explanation
function showModal(id){
$('#' + id + '2').modal({backdrop: 'static', keyboard: false});  
$('body').addClass("no-scroll");    
}
function hideModal() {
$('body').removeClass("no-scroll");    
}
// Help section
function showHelp(arg) {
    if (arg === 'help'){
window.scrollTo(0, 0);        
controlback = true;        
$('#content').addClass('display');
$('#help').addClass('display');        
$('#div-help').removeClass('display').load("components/help.html");    
        }
 if (arg === "outhelp"){     
$('#content').removeClass('display');
$('#help').removeClass('display');      
$('#div-help').addClass('display');     
 }    
}

//Android back button handler methods
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){
    document.addEventListener("backbutton", backKeyDown, false);
}
function backKeyDown(answer) { 
    if (controlback === false){
    $('#warning').removeClass("display");    
    $('#warningModal').modal({backdrop: 'static', keyboard: false});
    $('body').addClass("no-scroll");      
    }
    if (controlback === true){
    window.scrollTo(0, 0);    
    $('#content').removeClass('display');
    $('#help').removeClass('display');    
    $('#div-help').addClass('display');  
    controlback = false;    
    }
    if (answer === "no"){
    $( "#warningModal" ).modal( "toggle" );
    $('body').removeClass("no-scroll");      
    }
}
function exitApp() {
    navigator.app.exitApp();
}
