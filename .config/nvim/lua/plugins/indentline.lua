return {
	"lukas-reineke/indent-blankline.nvim",
	event = "BufRead",
	config = function()
		require("ibl").setup({
			indent = { char = "¦" },
		})
	end,
}
