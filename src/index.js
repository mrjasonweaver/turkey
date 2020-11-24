const randoButton = document.querySelector('#rando-button');
const feathers = document.querySelectorAll('#feathers path');
const scene = document.querySelector('body');
const themes = ['default', 'dark', 'colorful'];

let currentTheme = 'default';
let isMoving = false;
let moveIndex;
let lastMove;
let delay = 40;

const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));
const doFeatherAnimation = () => {
  staggerFeather();
  if (isMoving) {
    requestAnimationFrame(doFeatherAnimation);
  }
}
const staggerFeather = () => {
  let now = new Date();
  if ( now - lastMove < delay ) {
    return;
  }
  lastMove = now;
  let feather = feathers[moveIndex];
  if (feather) {
    feather.classList.toggle('animated');
    moveIndex++;
  } else {
    isMoving = false;
  }
};


const doRandom = () => {
  const pullThemes = themes.filter(theme => theme !== currentTheme);
  const theme = `theme-${pullThemes[getRandomInt(themes.length - 1)]}`;
  scene.classList.remove(`theme-${currentTheme}`);
  scene.classList.add(theme);
  currentTheme = theme.split('-')[1];
  feathers.forEach(f => f.classList.remove('animated'));
  isMoving = true;
  moveIndex = 0;
  lastMove =  new Date();
  doFeatherAnimation();
}

randoButton.addEventListener('click', doRandom);

doRandom();
