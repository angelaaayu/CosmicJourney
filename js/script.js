document.addEventListener("DOMContentLoaded", function() {

    // Initialize the canvas
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    // Star positions
    var stars = [];

    // Initialize stars
    function initializeStars() {
        for (let i = 0; i < 20; i++) {
            var x = Math.random() * canvas.width; 
            var y = Math.random() * canvas.height;
            var starSize = Math.random() * 3 + 1; 
            stars.push({ x: x, y: y, size: starSize });
        }
    }

    // Draw stars
    function drawStars() {
        ctx.fillStyle = 'yellow';
        for (let i = 0; i < stars.length; i++) {
            ctx.beginPath();
            ctx.arc(stars[i].x, stars[i].y, stars[i].size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Planet data 
    var planets = [
        { name: 'Sun', imageSrc: '../img/Sun.png', x: 380, y: 100, size: 230 },
        { name: 'Mercury', imageSrc: '../img/Mercury.png', x: 650, y: 180, size: 80 },
        { name: 'Venus', imageSrc: '../img/Venus.png', x: 800, y: 180, size: 80 },
        { name: 'Earth', imageSrc: '../img/Earth.png', x: 950, y: 160, size: 120 },
        { name: 'Mars', imageSrc: '../img/Mars.png', x: 1150, y: 180, size: 80 },
        { name: 'Jupiter', imageSrc: '../img/Jupiter.png', x: 1300, y: 150, size: 150 },
        { name: 'Saturn', imageSrc: '../img/Saturn.png', x: 1500, y: 120, size: 200 },
        { name: 'Uranus', imageSrc: '../img/Uranus.png', x: 1750, y: 180, size: 80 },
        { name: 'Neptune', imageSrc: '../img/Neptune.png', x: 1900, y: 180, size: 80 },
    ];

    // Load planet images
    var loadedImages = 0;

    function checkAllImagesLoaded() {
        if (loadedImages === planets.length) {
            frame();
        }
    }
    
    function loadImage(planet) {
        var img = new Image();
        img.src = planet.imageSrc;
        img.onload = () => {
            planet.image = img;
            loadedImages++;
            checkAllImagesLoaded();
            };
    }

    // Define the threshold for displaying planet names
    var planetThreshold = 300; 
    
    // Draw planet images and names
    function drawPlanets() {
        planets.forEach((planet) => {
            var x = planet.x - spaceship.x + 150;
            var y = planet.y;

            // Draw the planet image with its individual size
            ctx.drawImage(planet.image, x, y, planet.size, planet.size);
        
            // Calculate the distance between the spaceship and the planet
            var distance = calculateDistance(
                canvas.width / 2,
                spaceship.y + spaceship.height,
                x + planet.size,
                y + planet.size
            );
        
            // Display the name of the planet if the spaceship is close enough 
            if (distance < planetThreshold) {
                ctx.fillStyle = "antiquewhite";
                ctx.font = "30px Josefin Slab";
                ctx.textAlign = "center";
        
                ctx.fillText(planet.name, x + planet.size / 2, y + planet.size + 40);
            }
        });
    }
  

    // Add a title of this canvas
    function title() {
        ctx.fillStyle = 'antiquewhite';
        ctx.font = '45px Josefin Slab';
        ctx.textAlign = 'left';

        var titleY = 250;
        var titleX = 150 - spaceship.x ; 
        ctx.fillText('Cosmic Journey', titleX, titleY);
    }

    // Spaceship properties
    var spaceship = {
        x: 120, 
        y: 400,
        width: 150,
        height: 30,
    };
    
    // Track any key pressed
    var pressedKeys = {};
    window.onkeyup = function(e) { 
        pressedKeys[e.keyCode] = false; 
        fire = false; 
    }
    window.onkeydown = function(e) { 
        pressedKeys[e.keyCode] = true; 
        fire = true;
    }

    // Spaceship movement with keyboard
    function updateSpaceshipPosition() {
        if (pressedKeys[37] == true) 
            spaceship.x -= 3;
        if (pressedKeys[39] == true) 
            spaceship.x += 3;
    }

    // Draw the spaceship and fire
    function drawSpaceship() {
        // Draw the fire and appear while specific keys are pressed 
        if (pressedKeys[37] || pressedKeys[39]) {
        ctx.strokeStyle = "orange"; 
        ctx.lineWidth = 2;

        for (let i = 0; i < 4; i++) {
            var lineLength = spaceship.width / 3 + Math.random() * spaceship.width / 2; 
            var startX = spaceship.x - lineLength / 2 - spaceship.width; 
            ctx.beginPath();
            ctx.moveTo(
              startX + Math.random() * spaceship.width,
              spaceship.y + spaceship.height / 2 - 2 + i * 2
            );
            ctx.lineTo(
              startX,
              spaceship.y + spaceship.height / 2 - 2 + i * 2
            );
            ctx.stroke();
        }}

        // Draw spaceship
        ctx.fillStyle = "#B2C7C3"; 
        ctx.beginPath();
        ctx.ellipse(
            spaceship.x, 
            spaceship.y + spaceship.height / 2, 
            spaceship.width / 1.5, 
            spaceship.height / 1.5, 
            0,
            0, 
            2 * Math.PI 
        );
        ctx.fill();
    };

    function calculateDistance(x1, y1, x2, y2) {
        return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    }


    // Reset the positions of planets and title
    function resetPositions() {
        planets.forEach((planet) => {
        planet.x == canvas.width; 
        });

        // Move the spaceship back to its starting position
        spaceship.x = 120;

        // Move the title back to its starting position
        title.x = 150 - spaceship.x;
    }
    
   // Animation loop
   function frame() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Make stars flicker
        for (let i = 0; i < stars.length; i++) {
            if (Math.random() < 0.03) {
                stars[i].x = Math.random() * canvas.width;
                stars[i].y = Math.random() * canvas.height;
            }
        }
        updateSpaceshipPosition(); 

        drawStars(); 
        drawPlanets();
        title();
        drawSpaceship();

        // Check if the spaceship has reached the right boundary
        if (spaceship.x >= canvas.width + 200) {
            resetPositions();
        }

        requestAnimationFrame(frame);
    }

    // Initialize stars and load planet images
    initializeStars();
    planets.forEach((planet) => loadImage(planet));

    // Start the animation loop
    frame();
});





