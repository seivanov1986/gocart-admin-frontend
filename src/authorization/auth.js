function setToken(userToken) {
    localStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
}

function cleanToken() {
    localStorage.removeItem('token')
}

export {setToken, getToken, cleanToken}
