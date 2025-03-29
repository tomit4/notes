function ColorMyPencils(color)
	color = color or "nord"
	vim.cmd.colorscheme(color)

	-- vim.api.nvim_set_hl(0, "@attribute", { fg = "#B48EAD", italic = true }) -- For Tree-sitter
	-- vim.api.nvim_set_hl(0, "@decorator", { fg = "#B48EAD", italic = true }) -- Some setups may use this

	vim.api.nvim_set_hl(0, "TabLine", { bg = "none", fg = "#81A1C1" }) -- Inactive tabs
	vim.api.nvim_set_hl(0, "TabLineSel", { bg = "none", fg = "#D8DEE9" }) -- Active tab
	vim.api.nvim_set_hl(0, "TabLineFill", { bg = "none" }) -- Background area behind tabs

	-- vim.api.nvim_set_hl(0, "DiagnosticVirtualTextError", { fg = "#BF616A", bg = "none" }) -- Nord red
	-- vim.api.nvim_set_hl(0, "DiagnosticVirtualTextWarn", { fg = "#EBCB8B", bg = "none" }) -- Nord yellow
	-- vim.api.nvim_set_hl(0, "DiagnosticVirtualTextInfo", { fg = "#B48EAD", bg = "none" }) -- Nord purple
	-- vim.api.nvim_set_hl(0, "DiagnosticVirtualTextHint", { fg = "#81A1C1", bg = "none" }) -- Nord blue

	vim.api.nvim_set_hl(0, "Normal", { bg = "none" })
	vim.api.nvim_set_hl(0, "NormalFloat", { bg = "none" })
end

ColorMyPencils()
