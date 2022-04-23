-- packer.nvim requires nvim-packer-git package
-- paru -S nvim-packer-git

-- Packages installed using 'packer', install using :PackerSync
-- Remove packages by deleting (or commenting out) use line below and running :PackerClean

require('packer').startup(function()
    use 'wbthomason/packer.nvim'
    use {'nvim-treesitter/nvim-treesitter', run = ':TSUpdate'}
    -- :TSInstall <language_to_install>
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
    use 'hrsh7th/nvim-cmp'

    use 'kyazdani42/nvim-web-devicons' -- for file icons
    use 'kyazdani42/nvim-tree.lua'
    use {'nvim-lualine/lualine.nvim', requires = { 'kyazdani42/nvim-web-devicons', opt = true }}
    use 'shaunsingh/nord.nvim'
    use 'psliwka/vim-smoothie'
    -- use 'mattn/emmet-vim'
    -- use 'airblade/vim-gitgutter'
    use 'ctrlpvim/ctrlp.vim' -- fuzzy find files
    use 'preservim/nerdcommenter'
    use 'Yggdroot/indentLine'
    use 'mg979/vim-visual-multi'-- {'branch': 'master'}
    use {'iamcco/markdown-preview.nvim', run = ':call mkdp#util#install'} -- {'do': { -> mkdp#util#install()  }}
    use 'luochen1990/rainbow'
    use 'simeji/winresizer'
    use '907th/vim-auto-save'
    use 'jremmen/vim-ripgrep'
end)
