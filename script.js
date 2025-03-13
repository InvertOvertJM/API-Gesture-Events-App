const gestureBox = document.getElementById("gestureBox");
const output = document.getElementById("output");

let foodList = [];
let index = -1;
let startX, startY, endX, endY;

function getFood(){
    fetch('https://foodish-api.com/api/')
    .then(response => response.json()) 
    .then(data => {
       console.log(data.image);
       foodList.push(data.image);
        gestureBox.src = foodList[index];
    })
    .catch(error => console.error('Error:', error));
}

gestureBox.addEventListener("touchstart", function(event) {
    gestureBox.style.backgroundColor = "red";
    output.textContent = "Touch started";
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
});

gestureBox.addEventListener("touchmove", function(event) {
    gestureBox.textContent = "YOU ARE MOVING!!!";
    output.textContent = "MOVING AGAUGHAEUHGA";
});


gestureBox.addEventListener("touchend", function(event) {
    gestureBox.style.backgroundColor = "yellow"; 
    gestureBox.textContent = "swipe me pls";
    output.textContent = "Touch ended";
});

gestureBox.addEventListener("touchend", function(event) {
    endX = event.changedTouches[0].clientX;
    endY = event.changedTouches[0].clientY;
    
    let diffX = endX - startX;
    let diffY = endY - startY;
    
    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0) {
            index++;
            getFood()
            console.log(index);
            output.textContent = "You swiped right!";
        } else if(index > 0) {
            index--;
            console.log(index);
            gestureBox.src = foodList[index]
            output.textContent = "You to the previous image,";
        } else{
            output.textContent = "This is the last image";
        }
    }
});



