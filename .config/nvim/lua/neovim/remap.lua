vim.g.mapleader = " "
vim.keymap.set("n", "<leader>pv", vim.cmd.Ex)

vim.keymap.set("n", "J", "mzJ`z")

-- remap for vim-smoothie
vim.cmd([[nnoremap <C-D> <cmd>call smoothie#do("\<C-D>zz")<CR>]])
vim.cmd([[nnoremap <C-U> <cmd>call smoothie#do("\<C-U>zz")<CR>]])
vim.cmd([[nnoremap gg <cmd>call smoothie#do("gg")<CR>]])
vim.cmd([[nnoremap <S-g> <cmd>call smoothie#do("\<S-g>zz")<CR>]])

-- recenter on next/previous search
vim.keymap.set("n", "n", "nzzzv")
vim.keymap.set("n", "N", "Nzzzv")

--Toggle NERDCommenter with Ctrl + c
vim.keymap.set("n", "<C-c>", "<Plug>NERDCommenterToggle")

vim.keymap.set("n", "Q", "<nop>")
-- reformats
--vim.keymap.set("n", "<leader>f", vim.lsp.buf.format)

-- global search and replace
vim.keymap.set("n", "<S-s>", ":%s///gI<Left><Left><Left><Left>")
-- single line search and replace
vim.keymap.set("n", "<S-y>", ":.,.s///g<Left><Left><Left>")

-- toggle english spellcheck
vim.keymap.set("n", "<F11>", ":set spell!<cr>", { silent = true })

-- make current file executable
vim.keymap.set("n", "<leader>x", "<cmd>!chmod +x %<CR>", { silent = true })
-- Vimium Like Keybindings
vim.keymap.set("n", "<S-t>", "<c-w>:tabnew<CR>", {})

vim.keymap.set("n", "<S-tab>", "<c-w>:tabprevious<CR>", {})
vim.keymap.set("n", "<A-j>", "<c-w>:tabprevious<CR>", {})
vim.keymap.set("n", "<A-left>", "<c-w>:tabprevious<CR>", {})

vim.keymap.set("n", "<A-tab>", "<c-w>:tabnext<CR>", {})
vim.keymap.set("n", "<A-k>", "<c-w>:tabnext<CR>", {})
vim.keymap.set("n", "<A-right>", "<c-w>:tabnext<CR>", {})
-- Use ctrl- [hl] to select the active split!
vim.keymap.set("n", "<C-h>", "<c-w>:wincmd h<CR>", {})
vim.keymap.set("n", "<C-l>", "<c-w>:wincmd l<CR>", {})

-- remap Nvim_Tree toggle to leader+'
vim.keymap.set("n", "<leader>'", "<c-w>:NvimTreeToggle<CR>", {})

-- Use ctrl - [hl] to select the active split
vim.keymap.set("n", "<C-h>", "<c-w>:wincmd h<CR>", {})
vim.keymap.set("n", "<C-l>", "<c-w>:wincmd l<CR>", {})

-- nv creates new vertical split
vim.keymap.set("n", "nv", ":vnew", { silent = true })

-- shift + p invokes PackerSync
vim.keymap.set("n", "<S-p>", "<c-w>:PackerSync<CR>", {})

-- control + t enable transparency
vim.keymap.set("n", "<C-t>", "<c-w>:lua ColorMyPencils()<CR>", {})

-- open :Mason using msn
vim.keymap.set("n", "msn", ":Mason", { silent = true })

-- toggle relative line number with shift + x
vim.keymap.set("n", "<S-x>", ":set relativenumber! number<cr>", {})

-- toggle multi-corsor with control + j/k
vim.cmd([[nmap <C-j> <C-Down>]])
vim.cmd([[nmap <C-k> <C-Up>]])

-- enable gitblame with ctrl + g
vim.keymap.set("n", "<C-g>", "<c-w>:GitBlameToggle<CR>", { silent = true })

-- shift + m brings up markdown previewer
vim.keymap.set("n", "<S-m>", "<c-w>:MarkdownPreview<CR>", {})

-- invoke neoformat with nf
vim.keymap.set("n", "nf", ":Neoformat<cr>", { silent = true })

-- format C and C++ Code with cp
vim.keymap.set("n", "cp", ":ClangFormat<cr>", { silent = true })

-- open fzf with ctrl + p
vim.cmd([[nnoremap fzf :silent :FZFExplore]])
vim.keymap.set("n", "<leader>f", ":FZFExplore")
-- vim.keymap.set("n", "<C-p>", "<c-w>:FZFExplore<CR>", {})

-- CtrlP: similar to fzf, but with a more simple interface
vim.keymap.set("n", "<C-p>", "<c-w>:CtrlPMixed<cr>")

-- open ripgrep
vim.cmd([[nnoremap rg :silent :Rg]])
vim.keymap.set("n", "<leader>r", ":silent :Rg")

--toggle autocompletion
vim.cmd([[nnoremap cmp :silent lua SetAutoCmp(Mode)]])

--toggle undotree
vim.keymap.set("n", "<leader>u", ":UndotreeToggle<cr>")

-- runs npm tests without having to leave vim
vim.keymap.set("n", "<leader>t", ":w|!npm test<cr>")

-- dap Keybindings
vim.keymap.set("n", "<leader>dbp", ":lua require'dap'.toggle_breakpoint()")
vim.keymap.set("n", "<leader>dco", ":lua require'dap'.continue()")
vim.keymap.set("n", "<leader>dov", ":lua require'dap'.step_over()")
vim.keymap.set("n", "<leader>dso", ":lua require'dap'.step_out()")
vim.keymap.set("n", "<leader>dsi", ":lua require'dap'.step_into()")
vim.keymap.set("n", "<leader>dcl", ":lua require'dap'.close()")
-- vim.keymap.set("n", "<leader>dui", ":lua require('dapui').toggle()")
