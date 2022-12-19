local lsp = require("lsp-zero")

lsp.preset("recommended")

lsp.ensure_installed({
	"tsserver",
	"eslint",
	"sumneko_lua",
	"rust_analyzer",
})

-- Fix Undefined global 'vim'
lsp.configure("sumneko_lua", {
	settings = {
		Lua = {
			diagnostics = {
				globals = { "vim" },
			},
		},
	},
})

local cmp = require("cmp")

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

vim.diagnostic.config({
	virtual_text = true,
})
