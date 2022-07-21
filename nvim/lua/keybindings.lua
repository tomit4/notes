-- remap leader key
vim.g.mapleader = ","

-- remap Nvim_Tree toggle to CTRL+B
keymap('n', '<c-b>', '<c-w>:NvimTreeToggle<CR>', {})

-- Tab Shortcuts
keymap('n', '<c-t>', '<c-w>:tabnew<CR>', {})
keymap('n', '<s-tab>', '<c-w>:tabprevious<CR>', {})
keymap('n', '<a-tab>', '<c-w>:tabnext<CR>', {})
keymap('n', '<a-left>', '<c-w>:tabprevious<CR>', {})
keymap('n', '<a-right>', '<c-w>:tabnext<CR>', {})

-- Use ctrl- [hl] to select the active split!
keymap('n', '<c-h>', '<c-w>:wincmd h<CR>', {}) keymap('n', '<c-l>', '<c-w>:wincmd l<CR>', {})

-- Toggle NERDCommenter with Ctrl + c
vim.cmd[[:map <C-c> <Plug>NERDCommenterToggle]]

-- <Ctrl-x> redraws the screen and removes any search highlighting
keymap('n', '<c-x>', '<c-w>:nohl<CR>', {silent = true})

-- Can't quite get working yet
-- keybind map Ctrl + m to :MarkdownPreview
-- vim.cmd[[nmap <C-m> <Plug>MarkdownPreviewToggle]]
keymap('n', '<s-m>', '<c-w>:MarkdownPreview<CR>', {})
--
-- Toggle Multi-Cursor with j or k
vim.cmd[[nmap <C-j> <C-Down>]]
vim.cmd[[nmap <C-k> <C-Up>]]

-- Escape Insert Mode with ii
keymap('i', 'ii', '<Esc>', {})

-- Insert a console.log()
vim.cmd[[ inoremap cll console.log()<esc>i]]

-- Alias replace all to shift + S
vim.cmd[[nnoremap S :%s///gI<Left><Left><Left><Left>]]

-- Alias jest unit testing for current file
vim.cmd[[nnoremap T :lua require"jester".run_file()]]
-- Other jest commands you may need in the future:
-- :lua require"jester".run()
-- :lua require"jester".run_last()
-- :lua require"jester".debug()
-- :lua require"jester".debug_file()
-- :lua require"jester".debug_last()

-- Prettify using shortcut gp (careful, only use on files that have a parser)
-- vim.cmd[[nnoremap gp :silent %!prettier --stdin-filepath %<CR>]]

-- Format C and C++ Code using cp alias
vim.cmd[[nnoremap cp :silent :ClangFormat]]

-- j/k will move virtual lines (lines that wrap)
vim.cmd[[noremap <silent> <expr> j (v:count == 0 ? 'gj' : 'j')]]
vim.cmd[[noremap <silent> <expr> k (v:count == 0 ? 'gk' : 'k')]]
