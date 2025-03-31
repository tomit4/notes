return {
	"svban/YankAssassin.nvim",
	config = function()
		require("YankAssassin").setup({
			auto_normal = true, -- if true, autocmds are used. Whenever y is used in normal mode, the cursor doesn't move to start
			auto_visual = true, -- if true, autocmds are used. Whenever y is used in visual mode, the cursor doesn't move to start
		})
		-- Optional Mappings
		vim.keymap.set({ "x", "n" }, "gy", "<Plug>(YADefault)", { silent = true })
		vim.keymap.set({ "x", "n" }, "<leader>y", "<Plug>(YANoMove)", { silent = true })
	end,
}
