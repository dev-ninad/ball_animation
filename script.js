const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ball = {
  x: Math.random() * canvas.width, // Start at a random x position
  y: Math.random() * canvas.height, // Start at a random y position
  radius: 15,
  dx: 7, //initial velocity
  dy: 7,
  color: getRandomColor(),
};

let animationFrameId;
let isPaused = false;

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {   //Get the random code for color "#f0f0f0"
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = ball.color;
  ctx.fill();
  ctx.closePath();
}

function updateBallPosition() {
    // Bounce the ball off the right edge by reversing its velocity
  if (ball.x + ball.radius + ball.dx > canvas.width || ball.x - ball.radius + ball.dx < 0) {
    ball.dx = -ball.dx; //reverse its velocity
    ball.color = getRandomColor();
  }
  //// Bounce the ball off the left edge by reversing its velocity
  if (ball.y + ball.radius + ball.dy > canvas.height || ball.y - ball.radius + ball.dy < 0) {
    ball.dy = -ball.dy;//reverse its velocity
    ball.color = getRandomColor();
  }

  ball.x += ball.dx;
  ball.y += ball.dy;
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function animate() {
  if (!isPaused) {
    clearCanvas();
    drawBall();
    updateBallPosition();
  }
  animationFrameId = requestAnimationFrame(animate);
}

function startAnimation() {
  animate();
}

canvas.addEventListener("click", () => {
  isPaused = !isPaused;
  document.getElementById('note').style.display = 'none';  //hide the note
});

document.getElementById("resetButton").addEventListener("click", () => { //using event listener to update the animation 
  document.getElementById('note').style.display = 'block';   //show the note
  cancelAnimationFrame(animationFrameId);
  isPaused = true;
  clearCanvas();
  ball.x = Math.random() * canvas.width;
  ball.y = Math.random() * canvas.height;
  ball.color = getRandomColor();
  startAnimation(); // Restart the animation
});

startAnimation();
