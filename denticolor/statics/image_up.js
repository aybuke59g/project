const image_input = document.querySelector("#image_input");
var uploaded_image = "";

image_input.addEventListener("change", function(event) {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    uploaded_image = reader.result;
    document.querySelector("#display_image").style.backgroundImage = `url(${uploaded_image})`;
  });
  reader.readAsDataURL(this.files[0]);
});

const displayImage = document.querySelector("#display_image");
const hoveredColor = document.getElementById('hovered-color');
const hoveredColorSquare = document.getElementById('hovered-color-square');
const selectedColor = document.getElementById('selected-color');
const selectedColorSquare = document.getElementById('selected-color-square');

function sendRGBValuesToServer(red, green, blue) {
  fetch('/process_color', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      red: red,
      green: green,
      blue: blue,
    }),
  })
  .then(response => response.json())
  .then(data => {
    // Handle the response from the server if needed
    console.log(data.message);
  })
  .catch(error => {
    console.error('Error:', error);
  });
}


function sendRGBValuesToServer(red, green, blue) {
  fetch('/process_color', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      red: red,
      green: green,
      blue: blue,
    }),
  })
  .then(response => response.json())
  .then(data => {
    // Update the color match result in the DOM
    const resultElement = document.getElementById('color-match-result');
    resultElement.textContent = data.result;

    // Handle the response from the server if needed
    console.log(data.message);
  })
  .catch(error => {
    console.error('Error:', error);
  });
}



function pick(event, destination, squareDestination) {
  const bounding = displayImage.getBoundingClientRect();
  const x = event.clientX - bounding.left;
  const y = event.clientY - bounding.top;

  const canvas = document.createElement('canvas');
  canvas.width = displayImage.offsetWidth;
  canvas.height = displayImage.offsetHeight;
  const ctx = canvas.getContext('2d');
  const img = new Image();

  img.onload = () => {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const pixel = ctx.getImageData(x, y, 1, 1);

    let new_y = 0;
    let new_x = 0;
    let sum = 0;
    let red = 0;
    let blue = 0;
    let green = 0;

    for (let i = -2; i < 3; i++) {
      new_y = y + i;

      for (let j = -2; j < 3; j++) {
        new_x = x + j;
        new_data = ctx.getImageData(new_x, new_y, 1, 1);

        red += new_data.data[0];
        green += new_data.data[1];
        blue += new_data.data[2];
      }
    }

    const red_av = Math.round(red / 25);
    const green_av = Math.round(green / 25);
    const blue_av = Math.round(blue / 25);

    const alpha = pixel.data[3] / 255;
    const rgba = `rgba(${red_av}, ${green_av}, ${blue_av}, ${alpha})`;
    destination.style.background = rgba;
    destination.textContent = rgba;
    squareDestination.style.backgroundColor = rgba;

    // Send the RGB values to the server
    sendRGBValuesToServer(red_av, green_av, blue_av);
  };

  img.src = uploaded_image;
}

displayImage.addEventListener('mousemove', event => pick(event, hoveredColor, hoveredColorSquare));
displayImage.addEventListener('click', event => pick(event, selectedColor, selectedColorSquare));
