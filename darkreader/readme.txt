This darkreader.min.js file was downloaded as so:

wget https://cdnjs.cloudflare.com/ajax/libs/darkreader/4.9.58/darkreader.min.js

When used within an html project:

<script src="darkreader.min.js">

You can then enable it in your front end js files like so:

DarkReader.enable({
    brightness: 100,
    contrast: 90,
    sepia: 10
})

You can also disable it like so:

DarkReader.disable()

The main use I have found for this, however, is not to src this file, but rather to utilize it to generate
dark mode versions of personal sites using its exportGeneratedCSS() function:

const CSS = await DarkReader.exportGeneratedCSS()
console.log(CSS)

copying this from the console into a ./styles/darkreader.css file and then href from a link tag in your main css file allows you to have a baseline dark mode from which to further work on:

// grab the head element
const head = document.getElementByTagName('HEAD')

// start off in light mode
let hasDarkCSS = false

function toggleLight() {
    if (!hasDarkCSS) return
    head[0].removeChild(head[0].lastChild)
    hasDarkCSS = !hasDarkCSS
}

function toggleDark() {
    if (hasDarkCSS) return
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.type = 'text/css'
    link.href = 'styles/darkreader.css'
    head[0].appendChild(link)
    hasDarkCSS = !hasDarkCSS
}

Please note that the generated CSS file should be used as a TEMPLATE, unless the site's color scheme is very simple, but it is very handy as it can generate dark versions of your project websites that are a great baseline to work off of.
