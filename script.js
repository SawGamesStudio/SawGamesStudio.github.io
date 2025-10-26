const validCodes = {
    'код1': pashalka1,
    'код2': pashalka1,
    'код3': pashalka1,
    'расследование' : sendtoboard,
};
function sendtoboard() {
    window.location.href = './detective.html';
}
function pashalka1(){
    canvas.style.display = 'block';
}

function handleSearch(event) { // пасхалко-поисковик
    event.preventDefault(); // Предотвращаем отправку формы
    
    
    const inputElements = document.querySelectorAll('.pashalka');
    const messageElements = document.querySelectorAll('.message');
    
    let inputValue = '';
    for (const element of inputElements) {
        // Проверяем, какой из элементов ввода виден на экране
        if (element.offsetParent !== null) {
            inputValue = element.value.trim();
            break;
        }
    }

    if (validCodes[inputValue]) {
        validCodes[inputValue](); 
        
        messageElements.forEach(element => {
            element.textContent = '';
        });
    } else {
        messageElements.forEach(element => {
            element.textContent = 'Ошибка';
        });
    }

   
    return false; // Необходимое возвращаемое значение для предотвращения отправки формы
}
// фонарик
$(window).mousemove(function(e){
    let w = $('.spotlight').innerWidth(),
    h = $('.spotlight').innerHeight(),
    t = e.pageY - $('.spotlight').offset().top,
    l = e.pageX - $('.spotlight').offset().left;
$('.spotlight').css('background-image', 'radial-gradient(circle at '+ (l / w * 100) +'% '+ (t / h * 100) +'%, transparent 80px, rgba(0, 0, 0, 0.8) 120px)');
});   
// *партиклы
function pop (e) {
    if(e.target.dataset.type){
    let amount = 10;
    switch (e.target.dataset.type) {
        case 'shadow':
        case 'line':
        amount = 60;
        break;
    }
    if (e.clientX === 0 && e.clientY === 0) {
        const bbox = e.target.getBoundingClientRect();
        const x = bbox.left + bbox.width / 2;
        const y = bbox.top + bbox.height / 2;
        for (let i = 0; i < 10; i++) {
            createParticle(x, y, e.target.dataset.type);
        }
        } else {
        for (let i = 0; i < amount; i++) {
            createParticle(e.clientX, e.clientY, e.target.dataset.type);
        }
    }
}
}
function createParticle (x, y, type) {
    const particle = document.createElement('particle');
    document.body.appendChild(particle);
    let width = Math.floor(Math.random() * 30 + 8);
    let height = width;
    let destinationX = (Math.random() - 0.5) * 300;
    let destinationY = (Math.random() - 0.5) * 300;
    let rotation = Math.random() * 520;
    let delay = Math.random() * 200;
    switch (type) {
        case 'square':
        particle.style.background = `hsl(${Math.random() * 50 + 200}, 70%, 60%)`; // Цвет квадратов
        particle.style.border = '1px solid white'; // Бордюр квадратов
        break;
        case 'symbol':
        particle.innerHTML = ['&#9884;','&#9731;','&#10084;','&#10052;','&#10054;','&#9733;','&#9787;'][Math.floor(Math.random() * 7)]; // Символы
        particle.style.color = `hsl(${Math.random() * 50 + 200}, 70%, 60%)`; // Цвет символов
        particle.style.fontSize = `${Math.random() * 24 + 10}px`; // Размер символов
        width = height = 'auto';
        break;
        case 'logo':
        particle.style.backgroundImage = 'url(./images/pumpkin.png)'; // Ссылка на картинку
        break;
        case 'shadow':
        var color = `hsl(${Math.random() * 50 + 200}, 70%, 50%)`; // Цвет 
        particle.style.boxShadow = `0 0 ${Math.floor(Math.random() * 10 + 10)}px ${color}`; // Тень
        particle.style.background = color;
        particle.style.borderRadius = '50%'; // Радиус
        width = height = Math.random() * 5 + 4; // Размеры
        break;
        case 'line':
        particle.style.background = `hsl(${Math.random() * 50 + 200}, 70%, 50%)`; // Цвет линий
        height = 1; // Размер
        rotation += 1000;
        delay = Math.random() * 1000;
        break;
    }
    particle.style.width = `${width}px`;
    particle.style.height = `${height}px`;
    const animation = particle.animate([
        {
            transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(0deg)`,
            opacity: 1
        },
        {
            transform: `translate(-50%, -50%) translate(${x + destinationX}px, ${y + destinationY}px) rotate(${rotation}deg)`,
            opacity: 0
        }
        ], {
        duration: Math.random() * 1000 + 5000, // Продолжительность всех эффектов
        easing: 'cubic-bezier(0, .9, .57, 1)',
        delay: delay
    });
    animation.onfinish = removeParticle;
}
function removeParticle (e) {
    e.srcElement.effect.target.remove();
}
if (document.body.animate) {
    document.querySelectorAll('a').forEach(button => button.addEventListener('click', pop));
}
// *Игра
const canvas = document.getElementById('canvas1');
if(canvas.style.display != 'none'){
class Player{
    constructor(game){
        this.game = game;
        this.x = 0;
        this.y = 0;
        this.width = 64;
        this.height = 64;
        this.color = 'blue';
        this.speedY = 0;
        this.speedX = 0;
        this.maxSpeed = 0.5;
        
    }
    update(deltatime){
        this.move();
        this.checkborder();
        this.x += this.speedX * deltatime;        
        this.y += this.speedY * deltatime;    
    }
    draw(){
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);    
    }
    checkborder() {
        if (this.y > this.game.height - this.height * 0.5) this.y = this.game.height - this.height * 0.5;
        else if (this.y < -this.height * 0.5) this.y = -this.height * 0.5;
        else if (this.x > this.game.width - this.width * 0.5) this.x = this.game.width - this.width * 0.5;
        else if (this.x < -this.width * 0.5) this.x = -this.width * 0.5;
    }
    move(){
        if (this.game.keys.includes('ArrowUp')) this.speedY = -this.maxSpeed
        else if (this.game.keys.includes('ArrowDown')) this.speedY = this.maxSpeed
        else if (this.game.keys.includes('ArrowLeft')) this.speedX = -this.maxSpeed
        else if (this.game.keys.includes('ArrowRight')) this.speedX = this.maxSpeed
        else {this.speedY = 0; this.speedX = 0;}
    }
}
class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.player = new Player(this);
        this.input = new InputHandler(this);
        this.keys = [];
    }

    update(deltatime) {
        this.player.update(deltatime);
    }

    draw(context) {
        this.player.draw(context);
    }
}
class InputHandler{
    constructor(game){
        this.game = game;
        window.addEventListener('keydown', (e) => {
            if (((e.key === 'ArrowUp') || (e.key === 'ArrowDown') || (e.key === 'ArrowLeft') || (e.key === 'ArrowRight')) && this.game.keys.indexOf(e.key) === -1) {
                this.game.keys.push(e.key);
            }
        });
        window.addEventListener('keyup', (e) => {
            if (this.game.keys.indexOf(e.key) > -1) {
                this.game.keys.splice(this.game.keys.indexOf(e.key), 1);
            }
        });
    }
}
let lasttime = 0;
const context = canvas.getContext('2d');
canvas.height = 500; 
canvas.width = 500;
const game = new Game(canvas.height, canvas.width);
function gameLoop(currenttime) {
    const deltatime = currenttime - lasttime;
    context.clearRect(0, 0, canvas.width, canvas.height);
    game.draw(context);
    game.update(deltatime);
    lasttime = currenttime;
    requestAnimationFrame(gameLoop);
}
gameLoop(0);
}
document.querySelector('.burger').addEventListener('click', function(){
    this.classList.toggle('active');
    document.querySelector('.dropdowncontent').classList.toggle('open');
})

const swiper_wrapper = document.querySelector('.swiper-wrapper');
const prev = document.querySelector('.swiper-button-prev');
const next = document.querySelector('.swiper-button-next');
next.addEventListener("click", () => {
    const slides = document.querySelectorAll('.swiper-slide');
    swiper_wrapper.style.animation = "slideright 1000ms ease";
    setTimeout(() =>{
        swiper_wrapper.style.animation = "none";
        swiper_wrapper.appendChild(slides[0])
    }, 550)
})
prev.addEventListener("click", () => {
    const slides = document.querySelectorAll('.swiper-slide');
    swiper_wrapper.style.animation = "slideleft 1000ms ease";
    setTimeout(() =>{
        swiper_wrapper.style.animation = "none";
        swiper_wrapper.prepend(slides[slides.length - 1])
    }, 550)
})