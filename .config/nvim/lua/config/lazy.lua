local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not (vim.uv or vim.loop).fs_stat(lazypath) then
	local lazyrepo = "https://github.com/folke/lazy.nvim.git"
	local out = vim.fn.system({ "git", "clone", "--filter=blob:none", "--branch=stable", lazyrepo, lazypath })
	if vim.v.shell_error ~= 0 then
		vim.api.nvim_echo({
			{ "Failed to clone lazy.nvim:\n", "ErrorMsg" },
			{ out, "WarningMsg" },
			{ "\nPress any key to exit..." },
		}, true, {})
		vim.fn.getchar()
		os.exit(1)
	end
end
vim.opt.rtp:prepend(lazypath)

require("config.keymaps")
require("config.options")

require("lazy").setup({
	spec = {
		{ import = "plugins" },
		{ "nvim-treesitter/nvim-treesitter", build = ":TSUpdate", event = "BufReadPost" },
		{ "nvim-treesitter/playground" },
		{
			"shaunsingh/nord.nvim",
			config = function()
				vim.cmd("colorscheme nord")
			end,
		},
		{ "preservim/nerdcommenter", event = "VeryLazy" },
		{ "kyazdani42/nvim-web-devicons", opt = true, event = "VeryLazy" },
		{ "psliwka/vim-smoothie", event = "VeryLazy" },
		{ "mg979/vim-visual-multi" },
		{ "airblade/vim-gitgutter", event = "BufReadPre" },
		{ "kkoomen/vim-doge", build = ":call doge#install()" },
		{ "simeji/winresizer" },
		{ "rhysd/vim-clang-format" },
		{ "sangdol/mintabline.vim" },
		{ "nvim-lua/plenary.nvim" },
		{ "tpope/vim-fugitive" },
		{ "tpope/vim-surround", keys = { "cs", "ds", "ys" } },
		{ "lambdalisue/suda.vim" },
		{ "junegunn/fzf" },
		{ "junegunn/fzf.vim" },
		{ "junegunn/gv.vim" },
		{ "kien/ctrlp.vim" },
		{ "mbbill/undotree", cmd = { "UndotreeToggle" } },
		{ "williamboman/mason.nvim", event = "VeryLazy", opts = { ui = { border = "rounded" } } },
		{ "williamboman/mason-lspconfig.nvim", event = "VeryLazy" },
		{ "neovim/nvim-lspconfig", event = { "BufReadPre", "BufNewFile" } },
		{
			"iamcco/markdown-preview.nvim",
			cmd = { "MarkdownPreviewToggle", "MarkdownPreview", "MarkdownPreviewStop" },
			build = "cd app && npm install && git restore .",
			-- or if you use yarn: (I have not checked this, I use npm)
			-- build = "cd app && yarn install && git restore .",
			init = function()
				vim.g.mkdp_filetypes = { "markdown" }
			end,
			ft = { "markdown" },
		},
		-- Autocompletion/Snippets
		{ "hrsh7th/nvim-cmp" },
		{ "hrsh7th/cmp-buffer" },
		{ "hrsh7th/cmp-path" },
		{ "hrsh7th/cmp-nvim-lsp" },
		{ "hrsh7th/cmp-nvim-lua" },
		{ "saadparwaiz1/cmp_luasnip" },
		{ "hrsh7th/cmp-vsnip" },

		{ "VonHeikemen/lsp-zero.nvim" },
		-- codeium AI
		-- { "Exafunction/codeium.vim" },
		-- golang
		{ "ray-x/go.nvim" },
		{ "ray-x/guihua.lua" },
		-- rustlang
		{ "rust-lang/rust.vim" },
		-- code snippet screenshots
		-- capture code snippets using :Silicon,
		-- in Visual mode highlight then enter command
		{
			"michaelrommel/nvim-silicon",
			config = function()
				require("silicon").setup({
					command = "silicon",
					font = "mononoki NF=34",
					theme = "Nord",
					no_round_corner = true,
					no_line_number = true,
					no_window_controls = true,
					background = "#20201e",
				})
			end,
		},
		{
			"chomosuke/typst-preview.nvim",
			lazy = false, -- or ft = 'typst'
			version = "1.*",
			opts = {}, -- lazy.nvim will implicitly calls `setup {}`
		},
	},
	defaults = {
		lazy = false,
		version = false,
	},
	change_detection = {
		notify = false,
	},
	checker = {
		enabled = true,
		concurrency = 1,
		frequency = 86400,
		notify = false,
	},
	ui = {
		border = "rounded",
		size = {
			width = 0.8,
			height = 0.8,
		},
	},
	performance = {
		rtp = {
			disabled_plugins = {
				"2html_plugin",
				"tohtml",
				"getscript",
				"getscriptPlugin",
				"gzip",
				"logipat",
				"netrw",
				"netrwPlugin",
				"netrwSettings",
				"netrwFileHandlers",
				"matchit",
				"tar",
				"tarPlugin",
				"rrhelper",
				"spellfile_plugin",
				"vimball",
				"vimballPlugin",
				"zip",
				"zipPlugin",
				"tutor",
				"rplugin",
				"syntax",
				"synmenu",
				"optwin",
				"compiler",
				"bugreport",
			},
		},
	},
})
