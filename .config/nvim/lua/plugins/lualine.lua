local function show_codeium_status()
	return "{…}" .. vim.fn["codeium#GetStatusString"]()
end

return {
	"nvim-lualine/lualine.nvim",
	event = "VeryLazy",
	opts = function()
		return {
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
		}
	end,
}
