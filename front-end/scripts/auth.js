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
    console.log(theme);
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

/* EXAMPLE
    login("http://localhost:8000/class/cms/back-end/login.php/", session, "admin", "admin")
        .then(e => {
            console.log("Admin logged in:", isUserLoggedIn(session));
        })
        .catch(console.log);

    logout("http://localhost:8000/class/cms/back-end/logout.php/")
        .then(e => {
            setSessionCookie(session, undefined);
            console.log("User is logged in:", isUserLoggedIn(session));
        })
        .catch(console.log);
*/
