let session = {
    cookie: undefined
};

const httpGet = (url) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.timeout = 15000;
        
        xhr.onreadystatechange = (e) => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(xhr.response);
                } else {
                    reject(xhr.status);
                }
            }
        }
        xhr.ontimeout = () => reject("timeout");

        xhr.send();
    });
};

function forEachKeyValue(table, func) {
    Object.keys(table).forEach(key => func(key, table[key]));
}

function buildQueryString(parameters) {
    let strings = [];
    forEachKeyValue(parameters, (k, v) => {
        strings.push(k + "=" + v);
    });

    return "?" + strings.join("&", strings);
}

function retrieveTheme(url) {
    return new Promise((resolve, reject) => {
        httpGet(url)
            .then(JSON.parse)
            .then(setStyleFromTheme)
            .then(resolve)
            .catch(reject);
    });
}

function setTheme(url, themeId) {
    let queryString = buildQueryString({
        "themeId": themeId,
    });

    return new Promise((resolve, reject) => {
        httpGet(url + queryString)
            .then(resolve)
            .then(reject);
    });
}

function setStyleFromTheme(theme) {
    let existingStyle = document.head.querySelector('#dynamic-css');
    if (existingStyle) {
        document.head.removeChild(existingStyle);
    }

    let style = document.createElement('style');
    style.id = "dynamic-css";
    style.innerHTML = theme.css;
    document.head.appendChild(style);
}

function login(url, session, userName, password) {
    let queryString = buildQueryString({
        "userName": userName,
        "password": password
    });

    return new Promise((resolve, reject) => {
        httpGet(url + queryString)
            .then(JSON.parse)
            .then(phpsessid => {
                setSessionCookie(session, phpsessid);
                resolve();
            })
            .catch(reject);
    })
}

function logout(url) {
    return new Promise((resolve, reject) => {
        httpGet(url)
            .then(resolve)
            .catch(reject);
    });
}

function setSessionCookie(session, phpsessid) {
    session.cookie = phpsessid;
}

function isUserLoggedIn(session) {
    return session.cookie !== undefined;
}