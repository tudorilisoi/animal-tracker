
function apiLoginPromise(emailAddress, password) {
    return $.ajax({
        url: LOGIN_URL,
        type: 'POST',
        data: JSON.stringify({ emailAddress, password }),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
    }).then(loginResponse => {
        // debugger
        JWT_TOKEN = loginResponse.authToken
        saveToken()
        return JWT_TOKEN
    })
}


function saveToken() {
    Cookies.set('APP_LOGIN_TOKEN', JWT_TOKEN);
}
function getToken() {
    return Cookies.set('APP_LOGIN_TOKEN');
}

function isLoggedIn() {
    return !!JWT_TOKEN
}

function restoreLogin() {
    const existingToken = getToken()
    if (existingToken) {
        JWT_TOKEN = existingToken
        routeTo(TRACKERS_DIV_ID)
        return displayTrackerList()
    }
}

function logout() {
    Cookies.remove('APP_LOGIN_TOKEN')
    JWT_TOKEN = null
}

const setupLogoutButton = () => {

    $('body').on('click', '.js-route-logout', ev => {
        ev.preventDefault()
        logout()
        routeTo(LOGIN_DIV_ID)
    })
}

const setupLoginButton = () => {
    $(`#${LOGIN_FORM_ID}`).on('submit', ev => {
        // debugger
        ev.preventDefault()
        const formData = {
            emailAddress: $('input[name="emailAddress"]').val(),
            password: $('input[name="password"]').val(),
        }
        apiLoginPromise(formData.emailAddress, formData.password)
            .then(
                () => {
                    routeTo(TRACKERS_DIV_ID)
                    return displayTrackerList()
                })
            .catch(err => {

                //TODO display a nice message div
                console.error('LOGIN FAILED')
            })

    })
}

//TODO 6/7 create a new user with email address and password
function apiSignupPromise(emailAddress, password) {
    return $.ajax({
        url: SIGNUP_URL,
        type: 'POST',
        data: JSON.stringify({ emailAddress, password }),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
    }).then(signupResponse => {
        // debugger
        JWT_TOKEN = signupResponse.authToken
        return JWT_TOKEN
    })
}

const setupRouteHandlers = () => {
    $('.js-route-signup').on('click', ev => {
        ev.preventDefault()
        routeTo(SIGNUP_DIV_ID)
    })
    $('.js-route-login').on('click', ev => {
        ev.preventDefault()
        routeTo(LOGIN_DIV_ID)
    })

    //TODO 6/11 make sure user is logged in
    $('.js-route-profile').on('click', ev => {
        ev.preventDefault()
        routeTo(PROFILE_DIV_ID)
    })
}

const setupSignUpButton = () => {
    $(`#${SIGNUP_FORM_ID}`).on('submit', ev => {
        ev.preventDefault()
        const formData = {
            emailAddress: $('input[name="emailAddress"]').val(),
            password: $('input[name="password"]').val(),
        }
        apiSignupPromise(formData.emailAddress, formData.password)
            .then(
                () => {
                    routeTo(TRACKERS_DIV_ID)
                    return displayTrackerList()
                })
            .catch(err => {

                //TODO display a nice message div
                console.error('Sign up FAILED')
            })

    })
}

