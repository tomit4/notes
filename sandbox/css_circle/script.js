const delay = (ms) =>
    new Promise(res => setTimeout(res, ms))

const finalCircle = document.getElementsByClassName("finalcircle")
const halfClip = document.getElementById("halfclip")
const clipped = document.getElementById("clipped")
const fixed = document.getElementById("fixed")
const halfCircle = document.getElementsByClassName("halfcircle")

window.addEventListener('load', async () => {
    await delay(1000)
    halfClip.style.visibility = "hidden"
    clipped.style.visibility = "hidden"
    fixed.style.visibility = "hidden"
    halfCircle[0].style.visibility = "hidden"
    finalCircle[0].style.visibility = "visible"
})
