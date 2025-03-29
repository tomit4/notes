return {
	"nvim-telescope/telescope.nvim",
	tag = "0.1.0",
	config = function()
		require("telescope").setup({
			extensions = {
				undo = {
					layout_strategy = "vertical",
					layout_config = {
						preview_height = 0.8,
					},
				},
			},
		})
	end,
}
