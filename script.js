const gestureBox = document.getElementById("gestureBox");
const output = document.getElementById("output");

let startX, startY, endX, endY;

function getFood(){
    fetch('https://foodish-api.com/api/')
    .then(response => response.json()) 
    .then(data => {
       console.log(data.image);
       gestureBox.src = data.image;
    })
    .catch(error => console.error('Error:', error));
}

// Task 1: Change the background color of the box when the user touches it
gestureBox.addEventListener("touchstart", function(event) {
    gestureBox.style.backgroundColor = "red"; // Modify this color to test
    output.textContent = "Touch started";
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
});

// Task 2: Make the text inside the box change when the user moves their finger
gestureBox.addEventListener("touchmove", function(event) {
    gestureBox.textContent = "YOU ARE MOVING!!!"; // Modify this message to test
    output.textContent = "MOVING AGAUGHAEUHGA";
});

// Task 3: Reset the box when the user lifts their finger
gestureBox.addEventListener("touchend", function(event) {
    gestureBox.style.backgroundColor = "yellow"; // Modify this reset behavior
    gestureBox.textContent = "swipe me pls"; // Modify this message
    output.textContent = "Touch ended";
});

// Task 4: Change what happens when a swipe is detected
gestureBox.addEventListener("touchend", function(event) {
    endX = event.changedTouches[0].clientX;
    endY = event.changedTouches[0].clientY;
    
    let diffX = endX - startX;
    let diffY = endY - startY;
    
    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0) {
            getFood()
            output.textContent = "You swiped right!"; // Modify this action
        } 
    }
});


