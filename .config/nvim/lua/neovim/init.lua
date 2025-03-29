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

require("neovim.remap")
require("neovim.set")

require("lazy").setup({
	spec = {
		{ "nvim-treesitter/nvim-treesitter", build = ":TSUpdate", event = "BufReadPost" },
		{ "nvim-treesitter/playground" },
		{
			"shaunsingh/nord.nvim",
			config = function()
				vim.cmd("colorscheme nord")
			end,
		},
		{ "preservim/nerdcommenter", event = "VeryLazy" },
		{ "nvim-lualine/lualine.nvim", event = "VeryLazy" },
		{ "kyazdani42/nvim-web-devicons", opt = true, event = "VeryLazy" },
		{ "kyazdani42/nvim-tree.lua", cmd = { "NvimTreeToggle" } },
		{ "psliwka/vim-smoothie", event = "VeryLazy" },
		{ "mg979/vim-visual-multi", keys = { "<C-j>", "<C-k>" } },
		{ "lukas-reineke/indent-blankline.nvim", event = "BufRead" },
		{ "airblade/vim-gitgutter", event = "BufReadPre" },
		{ "f-person/git-blame.nvim", cmd = { "GitBlameToggle" } },
		{ "kkoomen/vim-doge", build = ":call doge#install()" },
		{ "norcalli/nvim-colorizer.lua", cmd = { "ColorizerToggle" } },
		{ "windwp/nvim-autopairs", event = "InsertEnter" },
		{ "simeji/winresizer" },
		{ "stevearc/conform.nvim" },
		{ "rhysd/vim-clang-format" },
		{ "sangdol/mintabline.vim" },
		{ "nvim-lua/plenary.nvim" },
		{ "ThePrimeagen/harpoon" },
		{
			"nvim-telescope/telescope.nvim",
			tag = "0.1.0",
		},
		{ "tpope/vim-fugitive" },
		{ "tpope/vim-surround", keys = { "cs", "ds", "ys" } },
		{ "lambdalisue/suda.vim" },
		{ "iamcco/markdown-preview.nvim", build = ":call mkdp#util#install()" },
		{ "junegunn/fzf.vim" },
		{ "junegunn/gv.vim" },
		{ "kien/ctrlp.vim" },
		{ "rinx/nvim-ripgrep" },
		{ "mbbill/undotree", cmd = { "UndotreeToggle" } },
		{ "williamboman/mason.nvim", event = "VeryLazy" },
		{ "williamboman/mason-lspconfig.nvim", event = "VeryLazy" },
		{ "neovim/nvim-lspconfig", event = { "BufReadPre", "BufNewFile" } },

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
		{ "Exafunction/codeium.vim" },
		-- golang
		{ "ray-x/go.nvim" },
		{ "ray-x/guihua.lua" },
		-- rustlang
		{ "rust-lang/rust.vim" },
		{ "saecki/crates.nvim" },
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
		defaults = {
			lazy = false,
			version = false,
		},
		checker = {
			enabled = true,
			concurrency = 1,
			frequency = 86400,
			notify = false,
		},
		performance = {
			rtp = {
				disabled_plugins = {
					"gzip",
					"tarPlugin",
					"tohtml",
					"tutor",
					"zipPlugin",
					"netrwPlugin", -- Only disable if not using netrw
				},
			},
		},
	},
	defaults = {
		lazy = false,
		version = false,
	},
	checker = {
		enabled = true,
		concurrency = 1,
		frequency = 86400,
		notify = false,
	},
	performance = {
		rtp = {
			disabled_plugins = {
				"gzip",
				"tarPlugin",
				"tohtml",
				"tutor",
				"zipPlugin",
				"netrwPlugin", -- Only disable if not using netrw
			},
		},
	},
})
