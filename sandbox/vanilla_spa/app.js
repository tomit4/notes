/* https://medium.com/altcampus/implementing-simple-spa-routing-using-vanilla-javascript-53abe399bf3c */

const about = '<h1>I am About Page</h1>'
const contact = '<h1>I am Contact Page</h1>'
const home = '<h1>I am Home Page</h1>'

const routes = {
    '/' : home,
    '/contact' : contact,
    '/about' : about
}

const rootDiv = document.getElementById('root')
console.log(window.location.pathname)
rootDiv.innerHTML = routes[window.location.pathname]

const onNavigate = (pathname) => {
    window.history.pushState(
        {},
        pathname,
        window.location.origin + pathname
    )
    rootDiv.innerHTML = routes[pathname]
}

window.popstate = () => {
    rootDiv.innerHTML = routes[window.location.pathname]
}
