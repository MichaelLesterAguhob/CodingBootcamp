const txtFirstName = document.querySelector('#txt-first-name');

const txtLastName = document.querySelector('#txt-last-name');

const spanFullName = document.querySelector('#span-full-name');

console.log(txtFirstName);

txtLastName.addEventListener('keyup', (event) => {

    // console.log(event.target);
    // console.log(event.target.value);
    spanFullName.innerHTML = `${txtFirstName.value} ${txtLastName.value}`;
})
