
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const box = 20;
const rows = 20;

let snake;
let dx, dy;
let food;
let score;
let running = false;
let loop;

const scoreEl = document.getElementById("score");

function init(){
 snake = [{x:10, y:10}];
 dx = 1;
 dy = 0;
 food = randomFood();
 score = 0;
 updateUI();
 draw();
}

function randomFood(){
 return {
  x: Math.floor(Math.random()*rows),
  y: Math.floor(Math.random()*rows)
 };
}

function updateUI(){
 scoreEl.textContent = score;
}

document.getElementById("startBtn").onclick = () => {
 if(running) return;
 running = true;
 loop = setInterval(gameLoop,250);
};

document.getElementById("resetBtn").onclick = () => {
 clearInterval(loop);
 running = false;
 init();
};

document.addEventListener("keydown", e => {
 if(!running) return;

 if(e.key === "ArrowUp" && dy === 0){
   dx = 0; dy = -1;
 }

 if(e.key === "ArrowDown" && dy === 0){
   dx = 0; dy = 1;
 }

 if(e.key === "ArrowLeft" && dx === 0){
   dx = -1; dy = 0;
 }

 if(e.key === "ArrowRight" && dx === 0){
   dx = 1; dy = 0;
 }
});

function gameLoop(){
 const head = {
  x: snake[0].x + dx,
  y: snake[0].y + dy
 };

 if(hitWall(head) || hitSelf(head)){
  alert("Game Over! Score: " + score);
  clearInterval(loop);
  running=false;
  return;
 }

 snake.unshift(head);

 if(head.x === food.x && head.y === food.y){
  score++;
  food = randomFood();
  updateUI();
 }else{
  snake.pop();
 }

 draw();
}

function hitWall(h){
 return h.x<0 || h.y<0 || h.x>=rows || h.y>=rows;
}

function hitSelf(h){
 return snake.slice(1).some(s => s.x===h.x && s.y===h.y);
}

function draw(){
 ctx.clearRect(0,0,400,400);

 ctx.fillStyle="gold";
 ctx.fillRect(food.x*box, food.y*box, box, box);

 ctx.fillStyle="#22c55e";
 snake.forEach(s=>{
  ctx.fillRect(s.x*box, s.y*box, box, box);
 });
}

function up(){
 if(dy === 0){
  dx = 0;
  dy = -1;
 }
}

function down(){
 if(dy === 0){
  dx = 0;
  dy = 1;
 }
}

function left(){
 if(dx === 0){
  dx = -1;
  dy = 0;
 }
}

function right(){
 if(dx === 0){
  dx = 1;
  dy = 0;
 }
}
init();