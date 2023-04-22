const sse = new EventSource("http://localhost:8080/stream")
const streamSection = document.querySelector('.stream-section')

sse.onmessage = (e) => {
    const node = document.createElement('li')
    node.textContent = e.data
    streamSection.appendChild(node)
}

// stops stream after 30 seconds
setTimeout(() => sse.close(), 30000)
