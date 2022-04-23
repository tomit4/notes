-- This file is to help in converting over your init.vim to init.lua, thusly it has extra notation to explain how certain configurations made in vimscript (.vim files), can be converted to lua (.lua files)

-- Taken from:
-- https://www.youtube.com/watch?v=ppMX4LHIuy4

-- set .vim style:

-- set expandtab
-- set shiftwidth=2
-- setsofttabstop=2

-- .lua style:

-- vim.bo.expandtab = true
-- vim.bo.shiftwidth = 2
-- vim.bo.softtabstop = 2
--
-- vim.g.something is equivalent to let g:something=
--
-- keybindings .vim style:

-- Ctrl-s to save
-- nmap <c-s> :w<CR>
-- imap <c-s> <Esc>:w<CR>a
-- Ctrl-jhkl to navigate splits
-- nnoremap <c-j> <c-w>j
-- nnoremap <c-h> <c-w>h
-- nnoremap <c-k> <c-w>k
-- nnoremap <c-l> <c-w>l

-- nvim provides a nice api that essentially can be accessed using the following syntax:
--
-- vim.api.nvim_set_keymap({mode}, {keymap}, {mapped to}, {options})

-- Now Converted to keybindings .lua style:
--
-- local keymap = vim.api.nvim_set_keymap
-- keymap('n', '<c-s>', ':w<CR>', {})
-- keymap('i', '<c-s>', '<Esc>:w<CR>a', {})
-- local opts = { noremap = true }
-- keymap('n', '<c-j>', '<c-w>j', opts)'
-- keymap('n', '<c-h>', '<c-w>h', opts)'
-- keymap('n', '<c-k>', '<c-w>k', opts)'
-- keymap('n', '<c-l>', '<c-w>l', opts)'

-- Package management

-- In this tutorial, we use packer:
-- https://github.com/wbthomason/packer.nvim
-- paru -S nvim-packer-git
-- And the syntax within your init.lua:

-- require('packer').startup(function()
--    use 'wbthomason/packer.nvim'
--    and other use ... for other packages
-- end)

-- And then we can run :PackerSync which will download/install them
-- Reorganizing your lua files
-- Create a lua folder in ~/.config/nvim/test_init.lua
-- Put lua config stuff in that lua folder and just call:
--
-- require("foo") -- includes ~/.config/nvim/lua/foo.lua
-- require("bar/blah") -- includes ~/.config/nvim/lua/bar/blah.lua
--
-- In practical practice this would look more like this:
--
-- require('keybindings')
-- require('packages')
-- require('config')
--
-- And now part 2 for treesiter and LSP completion setup:
--
-- https://www.youtube.com/watch?v=Ku-m7eEbWas
--
-- Treesitter is pretty much required. Think of it as a nvim parser
-- Within your require('packer') function:

-- use 'nvim-treesitter/nvim-treesitter'

-- Copy/Paste the configuration syntax from the github page:
-- starts with:
-- local configs = require'nvim-treesitter.configs'
--
-- https://github.com/nvim-treesitter/nvim-treesitter

-- To enable basic vim folding methods/expressions:
--
-- vim.opt.foldmethod = "expr"
-- vim.opt.foldexpr = "nvim_treesitter#foldexpr()"

-- LSP setup:
--
-- One of the major reasons we are doing this transfer is due to nvim integrating its own language server protocol, which renders the old CoC way of integrating language completion obsolete.
--
-- within our packer function, place:
--
-- use 'neovim/nvim-lspconfig'
-- use 'williamboman/nvim-lsp-installer'
--
-- remember to invoke :PackerSync
--
-- Copy the standard configuration from the github page:
--
-- https://github.com/williamboman/nvim-lsp-installer
--
-- starts with:
-- local lsp_installer = require("nvim-lsp-installer")
--
-- Think of this as another installer/package manager in a way, for language completion support, this can be invoked using:
--
-- :LspInstall
--
-- So for example, if we wanted to install language support for lua:
-- :LspInstall lua
--
-- You can then look onto the github page as there will be multiple options available for the language selected
--
-- note that some lsp (language server protocols) will provide you with custom keymappings that will display various helpful controls/information regarding syntax. Here's an example:
--
-- nkeymap('gd', ':lua vim.lsp.buf.definition()<cr>')
--
-- which will remap a LEADER KEY keymapping to 'leader + g + d' to invoke a definition buffer from the lua lsp
--
-- NeoVim Completion
--
-- This isthe final piece of the puzzle that can replace Coc in Nvim. Taken from:
--
-- https://github.com/hrsh7th/nvim-cmp
-- in your packer function:
--
-- use 'hrsh7th/cmp-nvim-lsp
-- use 'hrsh7th/cmp-buffer
-- use 'hrsh7th/cmp-path
-- use 'hrsh7th/cmp-cmdline
-- use 'hrsh7th/nvim-cmp'
--
-- remember :PackerSync
--
-- And of course, within our configuration file, we will also copy from the github page the set up, starting at:
--
-- -- Setup nvim-cmp.
-- local cmp = require'cmp'
-- to the end of file (do not include EOF)
--
-- Note that at the require('lspconfig')[<YOUR_LSP_SERVER>] is a placeholder where YOUR_LSP_SERVER is meant to be replaced with the server of your choice, the example in the video is:
--
-- 'sumneko_lua'
--
-- Other resources:
--
-- https://vonheikemen.github.io/devlog/tools/configuring-neovim-using-lua/
-- https://dev.to/arunanshub/making-a-proper-initlua-for-real-this-time-4k44
