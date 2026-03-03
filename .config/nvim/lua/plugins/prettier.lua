return {
	"MunifTanjim/prettier.nvim",
	config = function()
		require("prettier").setup({
			bin = "prettierd", -- or `'prettierd'` (v0.23.3+)
			filetypes = {
				"css",
				"graphql",
				--"html",
				"javascript",
				"javascriptreact",
				"json",
				"less",
				-- "markdown",
				"scss",
				"typescript",
				"typescriptreact",
				"yaml",
			},
			cli_options = {
				trailingComma = "all",
				tabWidth = 4,
				printWidth = 80,
				semi = false,
				jsxSingleQuote = true,
				singleQuote = true,
				bracketSpacing = true,
				bracketSameLine = true,
				arrowParens = "avoid",
			},
		})
	end,
}
