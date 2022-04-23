-- remap Nvim_Tree toggle to CTRL+B
keymap('n', '<c-b>', '<c-w>:NvimTreeToggle<CR>', {})

-- Tab Shortcuts
keymap('n', '<c-t>', '<c-w>:tabnew<CR>', {})
keymap('n', '<a-left>', '<c-w>:tabprevious<CR>', {})
keymap('n', '<a-right>', '<c-w>:tabnext<CR>', {})

-- Use ctrl- [hl] to select the active split!
keymap('n', '<c-h>', '<c-w>:wincmd h<CR>', {})
keymap('n', '<c-l>', '<c-w>:wincmd l<CR>', {})

-- Toggle NERDCommenter with Ctrl + c
vim.cmd[[:map <C-c> <Plug>NERDCommenterToggle]]

-- <Ctrl-x> redraws the screen and removes any search highlighting
keymap('n', '<c-x>', '<c-w>:nohl<CR>', {silent = true})

-- Can't quite get working yet
-- keybind map Ctrl + m to :MarkdownPreview
-- vim.cmd[[nnoremap M <Plug>MarkdownPreviewToggle]]
-- keymap('n', '<c-m>', '<c-w>:MarkdownPreviewToggle<CR>', {noremap = true})
--
-- Toggle Multi-Cursor with j or k
vim.cmd[[nmap <C-j> <C-Down>]]
vim.cmd[[nmap <C-k> <C-Up>]]
