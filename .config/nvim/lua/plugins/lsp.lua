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
	"tinymist",
	"ts_ls",
	"zls",
}

return {
	"neovim/nvim-lspconfig",
	dependencies = {
		"mason-org/mason.nvim",
		"mason-org/mason-lspconfig.nvim",
		"hrsh7th/nvim-cmp",
		"hrsh7th/cmp-nvim-lsp",
		"VonHeikemen/lsp-zero.nvim",
	},
	event = { "BufReadPre", "BufNewFile" }, -- Load on opening files
	config = function()
		local lsp = require("lsp-zero")
		-- local lspconfig = require("lspconfig")
		local cmp = require("cmp")

		require("mason").setup()
		require("mason-lspconfig").setup({
			ensure_installed = servers,
		})

		for _, server in ipairs(servers) do
			-- lspconfig[server].setup({})
			vim.lsp.enable(server)
		end

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
				["<CR>"] = cmp.mapping.confirm({ select = true }),
			}),
		})

		-- Floating error messages
		vim.diagnostic.config({
			underline = true,
			virtual_text = true,
			float = {
				source = "always",
				focusable = false,
			},
		})

		-- Keybinding for diagnostics
		vim.keymap.set("n", "<space>e", "<cmd>lua vim.diagnostic.open_float()<CR>")

		-- Vue TypeScript Setup
		local vue_typescript_plugin = "/usr/lib/node_modules/@vue/language-server"
			.. "/usr/lib/node_modules/@vue/typescript-plugin"

		-- lspconfig.ts_ls.setup({
		vim.lsp.config["ts_ls"] = {
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
		}
		lsp.setup()
	end,
}
