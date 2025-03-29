-- https://github.com/savq/paq-nvim
require("paq")({
	{ "savq/paq-nvim" }, -- Let Paq manage itself

	{ "nvim-treesitter/nvim-treesitter", build = ":TSUpdate" },
	{ "nvim-treesitter/playground" },
	{
		"shaunsingh/nord.nvim",
		config = function()
			vim.cmd("colorscheme nord")
		end,
	},
	{ "preservim/nerdcommenter" },
	{ "nvim-lualine/lualine.nvim" },
	{ "kyazdani42/nvim-web-devicons", opt = true },
	{ "kyazdani42/nvim-web-devicons" },
	{ "kyazdani42/nvim-tree.lua" },
	{ "psliwka/vim-smoothie" },
	{ "mg979/vim-visual-multi" },
	{ "lukas-reineke/indent-blankline.nvim" },
	{ "airblade/vim-gitgutter" },
	{ "f-person/git-blame.nvim" },
	{ "kkoomen/vim-doge", build = ":call doge#install()" },
	{ "norcalli/nvim-colorizer.lua" },
	{ "windwp/nvim-autopairs" },
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
	{ "tpope/vim-surround" },
	{ "lambdalisue/suda.vim" },
	{
		"iamcco/markdown-preview.nvim",
		build = function()
			vim.fn["mkdp#util#install"]()
		end,
	},
	{ "junegunn/fzf.vim" },
	{ "junegunn/gv.vim" },
	{ "kien/ctrlp.vim" },
	{ "rinx/nvim-ripgrep" },
	{ "mbbill/undotree" },
	{ "williamboman/mason.nvim" },
	{ "williamboman/mason-lspconfig.nvim" },
	{ "neovim/nvim-lspconfig" },

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
})
