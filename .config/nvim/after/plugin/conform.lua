require("conform").setup({
	formatters_by_ft = {
		python = { "isort", "black" },
		lua = { "stylua" },
		css = { "stylelint" },
		javascript = { "prettierd", "prettier", stop_after_first = true },
		typescript = { "prettierd", "prettier", stop_after_first = true },
		html = { "prettierd", "prettier", stop_after_first = true },
		pug = { "prettierd", "prettier", stop_after_first = true },
		sql = { "sql_formatter" },
		rust = { "rustfmt" },
		golang = { "gofmt" },
		sh = { "shfmt" },
		json = { "jq" },
		toml = { "taplo" },
		yaml = { "yq" },
	},
	format_on_save = {
		-- These options will be passed to conform.format()
		timeout_ms = 500,
		lsp_format = "fallback",
	},
})
