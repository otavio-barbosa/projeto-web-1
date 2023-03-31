function onChangeEmail() {
    const email = form.email().value;
    // form.emailError().style.display = email ? "none" : "block"
    email ? form.emailError().style.display = "none" : form.emailError().style.display = "block"
}

function onChangePassword() {
    const password = form.password().value;
    password ? form.passwordError().style.display = "none" : form.passwordError().style.display = "block"
}

const form = {
    email: () => document.getElementById('email'),
    password: () => document.getElementById('password'),
    emailError: () => document.getElementById('email-error'),
    passwordError: () => document.getElementById('password-error')
}