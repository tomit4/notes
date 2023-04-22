<script>
import { ref } from 'vue'
export default {
    props: {
        msg: String,
    },
    computed: {
        nodes() {
            const sse = new EventSource('http://localhost:8080/stream')
            const nodes = ref([])
            sse.onmessage = e => {
                console.log('e :=>', e)
                const node = e.data
                nodes.value.push(node)
            }
            setTimeout(() => sse.close(), 30000)
            return nodes
        },
    },
}
</script>
<template>
    <h2>{{ msg }}</h2>
    <ul class="stream" v-for="node in nodes.value">
        <li>{{ node }}</li>
    </ul>
</template>

<style scoped>
.stream {
    list-style: none;
}
</style>
