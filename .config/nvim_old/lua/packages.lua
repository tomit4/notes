-- packer.nvim requires nvim-packer-git package
-- paru -S nvim-packer-git
-- Packages installed using 'packer', install using :PackerSync
-- Remove packages by deleting (or commenting out) use line below and running :PackerClean

require('packer').startup(function()
    use 'wbthomason/packer.nvim'
    use {'nvim-treesitter/nvim-treesitter', run = ':TSUpdate'} -- :TSInstall <language_to_install>
    -- :TSUpdate all
    use 'neovim/nvim-lspconfig'
    use 'williamboman/nvim-lsp-installer'
    -- :LspInstallInfo (use i to install, u to upgrade, r to uninstall)
    -- :LspUninstall [--sync] <server> ...
    -- NVim Completion packages
    use 'hrsh7th/cmp-nvim-lsp'
    use 'hrsh7th/cmp-buffer'
    use 'hrsh7th/cmp-path'
    use 'hrsh7th/cmp-cmdline'
    use 'SirVer/ultisnips'
    use 'honza/vim-snippets'
    use 'quangnguyen30192/cmp-nvim-ultisnips'
    use({"hrsh7th/nvim-cmp",
        requires = {"quangnguyen30192/cmp-nvim-ultisnips",
        config = function()
      -- optional call to setup (see customization section)
            require("cmp_nvim_ultisnips").setup{}
    end,
    -- If you want to enable filetype detection based on treesitter:
        requires = { "nvim-treesitter/nvim-treesitter" },
        }
    })
    use 'kyazdani42/nvim-web-devicons' -- for file icons
    use 'kyazdani42/nvim-tree.lua'
    use {'nvim-lualine/lualine.nvim', requires = { 'kyazdani42/nvim-web-devicons', opt = true }}
    use 'shaunsingh/nord.nvim'
    use { "ellisonleao/gruvbox.nvim" }
    use 'psliwka/vim-smoothie'
    use 'mattn/emmet-vim'
    use 'norcalli/nvim-colorizer.lua'
    use 'airblade/vim-gitgutter'
    use 'f-person/git-blame.nvim'
    use 'junegunn/fzf.vim' -- better fuzzy find files
    use 'preservim/nerdcommenter'
    use {'lewis6991/gitsigns.nvim'}
    use 'Yggdroot/indentLine'
    use 'mg979/vim-visual-multi'-- {'branch': 'master'}
    use {'iamcco/markdown-preview.nvim'} -- call mkdp#util#install()
    use 'luochen1990/rainbow'
    use 'windwp/nvim-autopairs'
    use 'simeji/winresizer'
    -- use '907th/vim-auto-save'
    use 'rinx/nvim-ripgrep'
    use 'sbdchd/neoformat' -- general formatter for various languages
    use 'rhysd/vim-clang-format' -- formatter for c and c++
    use { '0x100101/lab.nvim', run = 'cd js && npm ci', requires = { 'nvim-lua/plenary.nvim' } }
    use 'sangdol/mintabline.vim'
end)
