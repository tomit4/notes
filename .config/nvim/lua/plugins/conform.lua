return {
	"stevearc/conform.nvim",
	config = function()
		require("conform").setup({
			formatters_by_ft = {
				python = { "isort", "black" },
				lua = { "stylua" },
				css = { "prettierd" },
				javascript = { "prettierd", "prettier", stop_after_first = true },
				typescript = { "prettierd", "prettier", stop_after_first = true },
				javascriptreact = { "prettierd", "prettier", stop_after_first = true },
				typescriptreact = { "prettierd", "prettier", stop_after_first = true },
				html = { "prettier", stop_after_first = true },
				pug = { "prettierd", "prettier", stop_after_first = true },
				vue = { "prettierd", "prettier", stop_after_first = true },
				sql = { "sql_formatter" },
				rust = { "rustfmt" },
				golang = { "gofmt" },
				sh = { "shfmt" },
				json = { "jq", "deno_fmt", stop_after_first = true },
				toml = { "taplo" },
				yaml = { "yq" },
				markdown = { "deno_fmt" },
			},
			format_on_save = {
				-- These options will be passed to conform.format()
				timeout_ms = 500,
				async = false,
				lsp_format = "fallback",
			},
		})
	end,
}
