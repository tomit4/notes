-- Packages installed using 'packer', install using :PackerSync

-- call Plug for MarkDownPreview
-- vim.cmd[[call plug#begin('~/.vim/plugged') Plug 'iamcco/markdown-preview.nvim', {'do': { -> mkdp#util#install()  }}]]

require('packer').startup(function()
    use 'wbthomason/packer.nvim'
    use 'kyazdani42/nvim-web-devicons' -- for file icons
    use 'kyazdani42/nvim-tree.lua'
    use {'nvim-lualine/lualine.nvim', requires = { 'kyazdani42/nvim-web-devicons', opt = true }}
    use 'shaunsingh/nord.nvim'
    use 'psliwka/vim-smoothie'
    -- use 'mattn/emmet-vim'
    -- use 'ap/vim-css-color'
    -- use 'airblade/vim-gitgutter'
    use 'ctrlpvim/ctrlp.vim' -- fuzzy find files
    -- use {'junegunn/fzf', run = ':call fzf#installo()'}--{ 'do': { -> fzf#install() } }
    use 'preservim/nerdcommenter'
    use 'Yggdroot/indentLine'
    use 'mg979/vim-visual-multi'-- {'branch': 'master'}
    use {'iamcco/markdown-preview.nvim', run = ':call mkdp#util#install'} -- {'do': { -> mkdp#util#install()  }}
    use 'luochen1990/rainbow'
    use 'simeji/winresizer'
    use '907th/vim-auto-save'
    use 'jremmen/vim-ripgrep'
end)
