const gestureBox = document.getElementById("gestureBox");
const output = document.getElementById("output");
const counter = document.getElementById("counter");

let foodList = [];
let index = -1; //start at -1 so the first fetch becomes index 0
let startX, startY, endX, endY;

function getFood() {
    return new Promise((resolve) => {
        fetch('https://foodish-api.com/api/')
            .then(response => response.json())
            .then(data => {
                console.log(data.image);
                foodList.push(data.image);
                resolve(data.image);
                gestureBox.src = foodList[index];
            })
            .catch(error => console.error('Error:', error));
    });
}

//counter display
function updateCounter() {
    counter.textContent = `Image ${index + 1} of ${foodList.length}`;
}

gestureBox.addEventListener("touchstart", function(event) {
    gestureBox.style.borderColor = "#FF7D00";
    output.textContent = "Touch started...";
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
});

gestureBox.addEventListener("touchmove", function(event) {
    output.textContent = "Moving...";
});

gestureBox.addEventListener("touchend", function(event) {
    gestureBox.style.borderColor = "#15616D";
    output.textContent = "Touch ended";

    endX = event.changedTouches[0].clientX;
    endY = event.changedTouches[0].clientY;

    let diffX = endX - startX;
    let diffY = endY - startY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
        //swipe right
        if (diffX > 0) { 
            index++;
            if (index >= foodList.length) {
                getFood().then((image) => { //gets image from fetch, sets src to image
                    gestureBox.src = image;
                    updateCounter();
                });
            } else {
                gestureBox.src = foodList[index];
                updateCounter();
            }
            console.log(index);
            output.textContent = "You swiped right!";
            //swipe left
        } else if (index > 0) { 
            index--;
            gestureBox.src = foodList[index];
            updateCounter();
            console.log(index);
            output.textContent = "You went to the previous image.";
        } else {
            output.textContent = "This is the first image.";
        }
    }
});
