local function show_codeium_status()
	return "{…}" .. vim.fn["codeium#GetStatusString"]()
end

require("lualine").setup({
	options = { theme = "nord" },
	sections = {
		lualine_x = {
			{
				show_codeium_status,
				cond = function()
					return vim.bo.filetype ~= "TelescopePrompt"
				end,
			},
		},
	},
})
