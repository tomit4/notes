return {
	"rinx/nvim-ripgrep",
	config = function()
		require("nvim-ripgrep").setup({
			runner = require("nvim-ripgrep.run").ripgrep, -- grep command
			prompt = "❯ ", -- prompt
			window = {
				width = 0.8,
				border = "rounded",
			},
			open_qf_fn = function()
				return vim.api.nvim_command("copen")
			end,
		})
	end,
}
