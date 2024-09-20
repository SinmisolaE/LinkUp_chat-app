document.getElementById('SignUp').addEventListener('submit', async function(event) {
    event.preventDefault();
    const email = document.querySelector('input[name="email"]').value;
    const username = document.querySelector('input[name="username"]').value;
    const password = document.querySelector('input[name="password"]').value;
    const err_msg = document.getElementById('err_msg');

    console.log(username);

    const response = await fetch('https://linkup-chat-app.onrender.com/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, username, password})
    });

    data = await response.json();

    if (response.status === 201) {
        localStorage.setItem('username', username);
        window.location.href = '../chat_interface/chat_interface.html'
    } else {
        err_msg.textContent = data.error;
    }
});