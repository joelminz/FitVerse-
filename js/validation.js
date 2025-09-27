const myForm = document.getElementById('my-form');
const nameInput = document.querySelector('input[name="name"]');
const contactInput = document.querySelector('input[name="contact"]');
const emailInput = document.querySelector('input[name="email"]');
const messageInput = document.querySelector('textarea[name="textarea"]');

myForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate name input
    if (nameInput.value === '') {
        alert('Please enter your name.');
        return;
    } else if (/\d/.test(nameInput.value)) {
        alert('Name should not contain digits.');
        return;
    }

    // Validate contact input
    if (contactInput.value === '') {
        alert('Please enter your contact.');
        return;
    } else if (contactInput.value.length !== 10 || !/^\d+$/.test(contactInput.value)) {
        alert('Contact should be of 10 digits only.');
        return;
    }

    // Validate email input
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(emailInput.value)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Validate message input
    if (messageInput.value === '') {
        alert('Please enter your message.');
        return;
    }

    // Submit the form
    myForm.submit();
    myForm.reset();
});
