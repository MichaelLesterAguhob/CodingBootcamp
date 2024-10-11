const txtFirstName = document.querySelector('#txt-first-name');
const spanFullName = document.querySelector('#span-full-name');

console.log(txtFirstName);

txtFirstName.addEventListener('keyup', (event) => {

    console.log(event.target);
    console.log(event.target.value);
    spanFullName.innerHTML = txtFirstName.value;
})
