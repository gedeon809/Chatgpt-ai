import bot from './assets/bot.svg';
import user from './assets/user.svg';

const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container');
// create a variable loadInterval
let loadInterval;
// function to load text content
function loader(el) {
  el.textContent = '';
  loadInterval = setInterval(() => {
    el.textContent += '.';
    if (el.textContent === '....') {
      el.textContent = '';
    }
  }, 300);
}
// function to type text content
function typeText(el, text) {
  let i = 0;
  let interval = setInterval(() => {
    if (i < text.length) {
      el.innerHTML += text.charAt(i);
      i++;
    } else {
      clearInterval(interval);
    }
  }, 20);
}
// function to generate unique identifier
function generateUniqueId() {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);

  return `id-${timestamp}-${hexadecimalString}`;
}
function chatStripe(isAi, value, uniqueId) {
  return `
    <div class='wrapper ${isAi && 'ai'}'>
    <div class="chat">
    <div class="profile">
    <img src="${isAi ? bot : user}" alt="${isAi ? 'bot' : 'user'}" />
    </div>
    <div class="message" id=${uniqueId}>${value}</div>
    </div>
    </div>
    `;
}

const handleSubmit = async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  // user's chatstripe token
  chatContainer.innerHTML += chatStripe(false, data.get('prompt'));
  form.reset();

  // bot's chatstripe token
  const uniqueId = generateUniqueId();
  chatContainer.innerHTML += chatStripe(true, '', uniqueId);
  chatContainer.scrollTop = chatContainer.scrollHeight;
  const messageDiv = document.getElementById(uniqueId);
  loader(messageDiv);
};

form.addEventListener('submit', handleSubmit);
form.addEventListener('keyup', (e) => {
  if (e.keycode === 13) {
    handleSubmit(e);
  }
});
