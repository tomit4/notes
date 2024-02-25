local lsp = require("lsp-zero")
local lspconfig = require("lspconfig")
local cmp = require("cmp")
lsp.preset("recommended")
require("mason").setup()

lsp.ensure_installed({
	"tsserver",
	"eslint",
	"rust_analyzer",
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
			server_config.filetypes = { "vue", "typescript", "javascript" }
			lspconfig.tsserver.setup({
				["disabled"] = true,
			})
			lspconfig.volar.setup({
				settings = {
					["volar.takeOverMode.enabled"] = true,
				},
			})
		end
		lspconfig[server_name].setup(server_config)
	end,
})
