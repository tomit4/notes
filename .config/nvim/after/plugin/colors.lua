require("nord").setup({
	-- your configuration comes here
	-- or leave it empty to use the default settings
	transparent = true, -- Enable this to disable setting the background color
	terminal_colors = true, -- Configure the colors used when opening a `:terminal` in Neovim
	diff = { mode = "bg" }, -- enables/disables colorful backgrounds when used in diff mode. values : [bg|fg]
	borders = true, -- Enable the border between verticaly split windows visible
	errors = { mode = "bg" }, -- Display mode for errors and diagnostics
	-- values : [bg|fg|none]
	search = { theme = "vim" }, -- theme for highlighting search results
	-- values : [vim|vscode]
	styles = {
		-- Style to be applied to different syntax groups
		-- Value is any valid attr-list value for `:help nvim_set_hl`
		comments = { italic = true },
		keywords = { italic = true },
		functions = { bold = true, italic = true },
		variables = { bold = true },
		-- To customize lualine/bufferline
		bufferline = {
			current = {},
			modified = { italic = true },
		},
	},

	-- colorblind mode
	-- see https://github.com/EdenEast/nightfox.nvim#colorblind
	-- simulation mode has not been implemented yet.
	colorblind = {
		enable = false,
		preserve_background = false,
		severity = {
			protan = 0.0,
			deutan = 0.0,
			tritan = 0.0,
		},
	},
	-- Override the default colors
	on_colors = function(colors) end,

	--- You can override specific highlights to use other groups or a hex color
	--- function will be called with all highlights and the colorScheme table
	on_highlights = function(highlights, colors) end,
})

function ColorMyPencils(color)
	color = color or "nord"
	vim.cmd.colorscheme(color)

	vim.api.nvim_set_hl(0, "@attribute", { fg = "#B48EAD", italic = true }) -- For Tree-sitter
	vim.api.nvim_set_hl(0, "@decorator", { fg = "#B48EAD", italic = true }) -- Some setups may use this

	vim.api.nvim_set_hl(0, "TabLine", { bg = "none", fg = "#81A1C1" }) -- Inactive tabs
	vim.api.nvim_set_hl(0, "TabLineSel", { bg = "none", fg = "#D8DEE9" }) -- Active tab
	vim.api.nvim_set_hl(0, "TabLineFill", { bg = "none" }) -- Background area behind tabs

	vim.api.nvim_set_hl(0, "DiagnosticVirtualTextError", { fg = "#BF616A", bg = "none" }) -- Nord red
	vim.api.nvim_set_hl(0, "DiagnosticVirtualTextWarn", { fg = "#EBCB8B", bg = "none" }) -- Nord yellow
	vim.api.nvim_set_hl(0, "DiagnosticVirtualTextInfo", { fg = "#B48EAD", bg = "none" }) -- Nord purple
	vim.api.nvim_set_hl(0, "DiagnosticVirtualTextHint", { fg = "#81A1C1", bg = "none" }) -- Nord blue

	vim.api.nvim_set_hl(0, "Normal", { bg = "none" })
	vim.api.nvim_set_hl(0, "NormalFloat", { bg = "none" })
end

ColorMyPencils()
