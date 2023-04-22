<script setup>
import {ref, onMounted} from 'vue'

const headers = [
    'Section 1',
    'Section 2',
    'How this works',
    'Placeholder',
    'Section 5',
]

const currentSection = ref('')

onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry. intersectionRatio > 0) {
                currentSection.value  = entry.target.getAttribute('id')
            }
        })
    })
    document.querySelectorAll('article h2').forEach((section) => {
            observer.observe(section)
    })
})
</script>
<template>
    <main>
        <article>
            <h1>My Article</h1>
            <section v-for="(header, index) in headers" :key="header">
                <h2 :id="index">{{ header }}</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>

            </section>
        </article>
        <aside>
            <div>
                {{ currentSection }}
                <a v-for="(header, index) in headers" :key="header"
                :href="`#${index}`">
                    {{header}}
                </a>
            </div>
        </aside>
    </main>
</template>

<style scoped>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
    width: 80%;
    margin: 0 auto;
}

main {
    display: flex;
}

aside {
    width: 25%;
}

aside > div {
    position: sticky;
    top: 20px;
     padding-left: 2em;
}

aside > div > a {
    display: block;
    color: #2c3e50;
    text-decoration: none;
    border-left: 1px solid #ccc;
    padding-left: 2em;
}
</style>
