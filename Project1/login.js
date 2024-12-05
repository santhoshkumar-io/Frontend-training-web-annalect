document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');

  loginForm.addEventListener('submit', event => {
    event.preventDefault(); 
    const username = document.getElementById('uname').value;
    const password = document.getElementById('password').value;

    if (username === 'santhosh' && password === 'santa') {
      sessionStorage.setItem('loggedIn', 'true');
      document.location = './dashboard/dashboard.html'; 
    } else {
      document.getElementById('error').innerText =
        'Invalid username or password.';
    }
  });
});
