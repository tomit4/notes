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
	use({ "Yggdroot/indentLine" })
	use({ "airblade/vim-gitgutter" })
	use({ "f-person/git-blame.nvim" })
	use({ "norcalli/nvim-colorizer.lua" })
	use({ "mattn/emmet-vim" })
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
	use({ "ethanholz/nvim-lastplace" })
	use({
		"iamcco/markdown-preview.nvim",
		run = function()
			vim.fn["mkdp#util#install"]()
		end,
	})
	-- use({ "iamcco/markdown-preview.nvim", run = "cd app && npm install", setup = function() vim.g.mkdp_filetypes = { "markdown" } end, ft = { "markdown" }, })
	use({ "junegunn/fzf.vim" })
	use(" rinx/nvim-ripgrep" )
	use({ "mbbill/undotree" })
	use({
		"debugloop/telescope-undo.nvim",
		requires = { "nvim-telescope/telescope.nvim" },
		config = function()
			require("telescope").load_extension("undo")
		end,
	})
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
end)
