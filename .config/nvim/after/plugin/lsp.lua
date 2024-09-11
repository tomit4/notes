local lsp = require("lsp-zero")
local lspconfig = require("lspconfig")
local cmp = require("cmp")
lsp.preset("recommended")
require("mason").setup()

lsp.ensure_installed({
	"bashls",
	"biome",
	"clangd",
	"cssls",
	"dockerls",
	"emmet_ls",
	"eslint",
	"html",
	"lua_ls",
	"quick_lint_js",
	"rust_analyzer",
	"svelte",
	"ts_ls",
	"volar",
})

cmp.setup({
	window = {
		completion = cmp.config.window.bordered(),
		documentation = cmp.config.window.bordered(),
	},
})

lsp.set_preferences({
	suggest_lsp_servers = false,
	sign_icons = {
		error = "E",
		warn = "W",
		hint = "H",
		info = "I",
	},
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
-- Volar TypeScript Config (turn off for Vue with Vanilla JS)
require("mason-lspconfig").setup_handlers({
	function(server_name)
		local server_config = {}
		if server_name == "volar" then
			server_config.filetypes = { "vue", "ts_ls", "javascript" }
			lspconfig.volar.setup({
				settings = {
					["volar.takeOverMode.enabled"] = true,
				},
			})
		end
		lspconfig.rust_analyzer.setup({
			settings = {
				["rust-analyzer"] = {
					procMacro = {
						ignored = {
							leptos_macro = {
								"server",
							},
						},
					},
					rustfmt = {
						overrideCommand = {
							"leptosfmt",
							"--stdin",
							"--rustfmt",
						},
						edition = { "2021" },
					},
					cargo = {
						allFeatures = true,
					},
				},
			},
		})
		lspconfig[server_name].setup(server_config)
	end,
})
