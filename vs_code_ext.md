# VS Codium Extensions

**Themes/Aesthetics:**

- [Borealis Theme](https://marketplace.visualstudio.com/items?itemName=eckertalex.borealis)
- [Cobalt2 Theme Official](https://marketplace.visualstudio.com/items?itemName=wesbos.theme-cobalt2)
- [Cursor Column Highlight](https://marketplace.visualstudio.com/items?itemName=IuriiBarlukov.cursor-column-highlight)
- [GlassIt Linux](https://marketplace.visualstudio.com/items?itemName=nowsci.glassit-linux)
- [Nord Deep](https://marketplace.visualstudio.com/items?itemName=marlosirapuan.nord-deep)
- [multi-command](https://marketplace.visualstudio.com/items?itemName=ryuta46.multi-command)
- [Render Line Endings](https://marketplace.visualstudio.com/items?itemName=medo64.render-crlf)

**Extensions:**

- [Beautify](https://marketplace.visualstudio.com/items?itemName=HookyQR.beautify)
- [Biome](https://marketplace.visualstudio.com/items?itemName=biomejs.biome)
- [EsLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Git Blame](https://marketplace.visualstudio.com/items?itemName=waderyan.gitblame)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Live Server](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Quick-Lint-Js](https://marketplace.visualstudio.com/items?itemName=quick-lint.quick-lint-js)
- [Import Cost](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost)
- [Markdown Preview Enhanced](https://marketplace.visualstudio.com/items?itemName=shd101wyy.markdown-preview-enhanced)
- [Vim](https://marketplace.visualstudio.com/items?itemName=vscodevim.vim)

**Language Servers:**

- [HTML CSS Support](https://marketplace.visualstudio.com/items?itemName=ecmel.vscode-html-css)
- [Python (ms-python)](https://marketplace.visualstudio.com/items?itemName=ms-python.python)
- [Python Debugger (ms-python)](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)
- [Pyright](https://marketplace.visualstudio.com/items?itemName=ms-pyright.pyright)
- [Go (golang)](https://marketplace.visualstudio.com/items?itemName=golang.Go)
- [React - Typescript snippets (XAcademy)](https://marketplace.visualstudio.com/items?itemName=Tomi.xasnippets)
- [Rust (rust-lang)](https://marketplace.visualstudio.com/items?itemName=1YiB.rust-bundle)
- [ShellCheck](https://marketplace.visualstudio.com/items?itemName=timonwong.shellcheck)
- [Svelte for VS Code (svelte)](https://marketplace.visualstudio.com/items?itemName=1YiB.svelte-bundle)
- [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)
- [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- [YAML (redhat)](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml)

## A Note on GlassIt Linux

You'll need to edit the extensions.js file for it to work with VSCodium:
If you are using VS Codium, you need to edit the extension.js file in the extension folder: ~/.vscode-oss(OR .vscode)/extensions/s-nlf-fh.glassit-{THE VERSION}-universal/, and change "code" on line 46 to "codium".

## How to Compile via vsce

clone the repo with the source code you want to use

```bash
git clone https://github.com/extension_name
```

Once in there, run npm install to make sure you have all dependencies:

```bash
npm install
```

Finally Use vsce to compile the .vsix file you'll need:

```bash
vsce package
```

And lastly use VSCode by hand to install from .vsix (found under the ... menu in the extensions submenu of vscode)
