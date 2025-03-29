local lsp = require("lsp-zero")
local lspconfig = require("lspconfig")
local cmp = require("cmp")
require("mason").setup()

-- https://github.com/neovim/nvim-lspconfig/blob/master/doc/configs.md
local servers = {
	"bashls",
	"biome",
	"clangd",
	"cssls",
	"dockerls",
	"emmet_ls",
	"eslint",
	"gopls",
	"jqls",
	"lua_ls",
	"pyright",
	"quick_lint_js",
	"rust_analyzer",
	"stylelint_lsp",
	"svelte",
	"ts_ls",
	"zls",
}

for _, server in ipairs(servers) do
	lspconfig[server].setup({})
end

require("mason-lspconfig").setup({
	ensure_installed = servers,
})

cmp.setup({
	window = {
		completion = cmp.config.window.bordered(),
		documentation = cmp.config.window.bordered(),
	},
	sources = cmp.config.sources({
		{ name = "nvim_lsp" },
		{ name = "luasnip" },
		{ name = "buffer" },
		{ name = "path" },
		{ name = "vsnip" },
	}),
	mapping = cmp.mapping.preset.insert({
		["<Up>"] = cmp.mapping.select_prev_item(),
		["<Down>"] = cmp.mapping.select_next_item(),
		["<C-b>"] = cmp.mapping.scroll_docs(-4),
		["<C-f>"] = cmp.mapping.scroll_docs(4),
		["<C-Space>"] = cmp.mapping.complete(),
		["<C-e>"] = cmp.mapping.abort(),
		["<CR>"] = cmp.mapping.confirm({ select = true }), -- Accept currently selected item. Set `select` to `false` to only confirm explicitly selected items.
	}),
})

-- function that is used with keybinding cm to toggle autocompletion
Mode = require("cmp.types").cmp.TriggerEvent.TextChanged
function SetAutoCmp(mode)
	if mode then
		cmp.setup({
			completion = {
				autocomplete = { Mode },
			},
		})
		Mode = false
	else
		cmp.setup({
			completion = {
				autocomplete = Mode,
			},
		})
		Mode = require("cmp.types").cmp.TriggerEvent.TextChanged
	end
end

SetAutoCmp(Mode)
lsp.setup()

-- configure diagnostic lsp err msgs
vim.diagnostic.config({
	underline = true,
	virtual_text = true,
	float = {
		source = "always",
		focusable = false,
	},
})

-- toggles floating error messages
vim.keymap.set("n", "<space>e", "<cmd>lua vim.diagnostic.open_float()<CR>")

-- LSP Specific Settings
-- require("mason-lspconfig").setup_handlers({}

-- Vue TypeScript Setup
-- https://lsp-zero.netlify.app/blog/configure-volar-v2.html
-- NOTE: Don't install volar through Mason, this is done manually:
-- npm install -g @vue/language-server
-- npm install -g @vue/typescript-plugin
local vue_typescript_plugin = "/usr/lib/node_modules"
	.. "/usr/lib/node_modules/@vue/language-server"
	.. "/usr/lib/node_modules/@vue/typescript-plugin"

lspconfig.ts_ls.setup({
	init_options = {
		plugins = {
			{
				name = "@vue/typescript-plugin",
				location = vue_typescript_plugin,
				languages = { "javascript", "typescript", "vue" },
			},
		},
	},
	filetypes = {
		"javascript",
		"javascriptreact",
		"javascript.jsx",
		"typescript",
		"typescriptreact",
		"typescript.tsx",
		"vue",
	},
})
