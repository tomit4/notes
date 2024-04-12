-- This file can be loaded by calling `lua require('plugins')` from your init.vim

-- Only required if you have packer configured as `opt`
vim.cmd([[packadd packer.nvim]])

return require("packer").startup(function(use)
	-- Packer can manage itself
	use("wbthomason/packer.nvim")
	use({ "nvim-treesitter/nvim-treesitter", run = ":TSUpdate" })
	use({ "nvim-treesitter/playground" })
	use({
		"shaunsingh/nord.nvim",
		config = function()
			vim.cmd("colorscheme nord")
		end,
	})
	use({ "preservim/nerdcommenter" })
	use({ "nvim-lualine/lualine.nvim", requires = { "kyazdani42/nvim-web-devicons", opt = true } })
	use({ "kyazdani42/nvim-web-devicons" })
	use({ "kyazdani42/nvim-tree.lua" })
	use({ "psliwka/vim-smoothie" })
	use({ "mg979/vim-visual-multi" })
	-- use({ "Yggdroot/indentLine" })
	use({ "lukas-reineke/indent-blankline.nvim" })
	use({ "lewis6991/impatient.nvim" })
	use({ "airblade/vim-gitgutter" })
	use({ "f-person/git-blame.nvim" })
	use({ "kkoomen/vim-doge", run = ":call doge#install()" })
	-- use({ "norcalli/nvim-colorizer.lua" })
	use({ "windwp/nvim-autopairs" })
	use({ "simeji/winresizer" })
	use({ "sbdchd/neoformat" })
	use({ "rhysd/vim-clang-format" })
	use({ "sangdol/mintabline.vim" })
	use({ "ThePrimeagen/harpoon" })
	use({
		"nvim-telescope/telescope.nvim",
		tag = "0.1.0",
		-- or                            , branch = '0.1.x',
		requires = { { "nvim-lua/plenary.nvim" } },
	})
	use({ "tpope/vim-fugitive" })
	use({ "tpope/vim-surround" })
	use({ "lambdalisue/suda.vim" })
	use({
		"iamcco/markdown-preview.nvim",
		run = function()
			vim.fn["mkdp#util#install"]()
		end,
	})
	-- use({ "iamcco/markdown-preview.nvim", run = "cd app && npm install", setup = function() vim.g.mkdp_filetypes = { "markdown" } end, ft = { "markdown" }, })
	use({ "junegunn/fzf.vim" })
	use({ "junegunn/gv.vim" })
	use({ "kien/ctrlp.vim" })
	use({ "rinx/nvim-ripgrep" })
	use({ "mbbill/undotree" })
	use({
		"VonHeikemen/lsp-zero.nvim",
		requires = {
			-- LSP Support
			{ "neovim/nvim-lspconfig" },
			{ "williamboman/mason.nvim" },
			{ "williamboman/mason-lspconfig.nvim" },

			-- Autocompletion
			{ "hrsh7th/nvim-cmp" },
			{ "hrsh7th/cmp-buffer" },
			{ "hrsh7th/cmp-path" },
			{ "saadparwaiz1/cmp_luasnip" },
			{ "hrsh7th/cmp-nvim-lsp" },
			{ "hrsh7th/cmp-nvim-lua" },

			-- Snippets
			{ "L3MON4D3/LuaSnip" },
			{ "rafamadriz/friendly-snippets" },
		},
	})
	use("jose-elias-alvarez/null-ls.nvim")
	use({ "rcarriga/nvim-dap-ui", requires = { "mfussenegger/nvim-dap" } })
	use({
		"mfussenegger/nvim-dap",
		opt = true,
		module = { "dap" },
		requires = {
			"theHamsta/nvim-dap-virtual-text",
			"mfussenegger/nvim-dap-python",
			"nvim-telescope/telescope-dap.nvim",
			{ "leoluz/nvim-dap-go", module = "dap-go" },
			{ "jbyuki/one-small-step-for-vimkind", module = "osv" },
			{ "mxsdev/nvim-dap-vscode-js" },
			{
				"microsoft/vscode-js-debug",
				opt = true,
				-- NOTE: didn't compile on install for some reason,
				-- navigate to ~/.local/share/nvim/site/pack/packer/opt/vscode-js-debug
				-- and npm run compile by hand...
				run = "npm install --legacy-peer-deps && npm run compile",
			},
		},
	})
	-- codeium AI
	use("Exafunction/codeium.vim")
	-- golang
	use("ray-x/go.nvim")
	use("ray-x/guihua.lua")
	-- rustlang
	use("rust-lang/rust.vim")
	use("mrcjkb/rustaceanvim")
	use("saecki/crates.nvim")
	-- code snippet screenshots
	-- capture code snippets using :Silicon,
	-- in Visual mode highlight then enter command
	use({
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
	})
end)
