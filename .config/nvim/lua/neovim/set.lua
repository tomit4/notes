-- fat cursor no matter what
vim.opt.guicursor = ""
--
vim.opt.nu = true
vim.opt.relativenumber = true
vim.opt.softtabstop = 0
vim.opt.shiftwidth = 4
-- vim.opt.shiftwidth = 2

vim.opt.expandtab = true

vim.opt.smartindent = true

vim.opt.swapfile = false
vim.opt.backup = false
vim.opt.undodir = os.getenv("HOME") .. "/.vim/undodir"
vim.opt.undofile = true

vim.opt.hlsearch = false
vim.opt.incsearch = true

vim.opt.termguicolors = true

vim.opt.scrolloff = 18
vim.opt.signcolumn = "yes"
-- vim.opt.isfname:append("@-@")

vim.opt.updatetime = 50

vim.opt.mouse = "a"
vim.opt.autoindent = true
vim.opt.smarttab = true
vim.opt.ignorecase = true
vim.opt.cindent = true
vim.opt.tabstop = 4
vim.opt.cursorcolumn = true
-- Disable folds
-- vim.g.nofoldenable = true
-- Fix Splitting
vim.opt.splitbelow = true
vim.opt.splitright = true

-- Removes trailing spaces
vim.api.nvim_create_autocmd({ "BufWritePre" }, {
	pattern = { "*" },
	command = [[%s/\s\+$//e]],
})

-- Marks end of line, space, and trailing space characters
vim.opt.listchars:append({ eol = "↵", trail = "·", space = "·" })
vim.opt.list = true

-- return quotation marks to json files
vim.cmd([[autocmd Filetype json let g:indentLine_setConceal = 0]])

-- vertically center document when entering Insert mode (breaks shift+A)
-- vim.cmd([[autocmd InsertEnter * norm zz]])

-- enable clipboard
vim.cmd([[set clipboard+=unnamedplus]])

-- disable intro screen
vim.cmd([[set shortmess+=I]])

-- enable folds
vim.cmd([[set foldmethod=manual]])

-- enable hard/soft wrap
-- vim.cmd([[set wrap linebreak textwidth=80]])
-- vim.opt.textwidth = 80
-- vim.opt.wrap = true
-- vim.opt.linebreak = true
vim.cmd([[au BufRead,BufNewFile *.md setlocal textwidth=80]])

-- max tab characters
vim.cmd([[let g:mintabline_tab_max_chars=10]])

-- Search pattern across repository files using fzf
vim.cmd([[
function! FzfExplore(...)
let inpath = substitute(a:1, "'", '', 'g')
if inpath == "" || matchend(inpath, '/') == strlen(inpath)
    execute "cd" getcwd() . '/' . inpath
    let cwpath = getcwd() . '/'
    call fzf#run(fzf#wrap(fzf#vim#with_preview({'source': 'ls -1ap', 'dir': cwpath, 'sink': 'FZFExplore', 'options': ['--prompt', cwpath]})))
else
    let file = getcwd() . '/' . inpath
    execute "e" file
endif
endfunction]])

vim.cmd([[command! -nargs=* FZFExplore call FzfExplore(shellescape(<q-args>))]])

-- CtrlP will ignore .git and node_modules directories
vim.cmd([[set wildignore+=*/node_modules/*,*/.git/*]])
vim.cmd([[let g:ctrlp_custom_ignore = '\v[\/]\.(git|node_modules)']])

-- fzf is on bottom of screen
-- vim.cmd([[let g:fzf_layout = { 'down': '~30%' }]])

--lastplace ignores fzf
--vim.cmd([[let g:lastplace_ignore_buftype = "quickfix, nofile, help, FZF"]])

-- jump to last place visited in file
vim.api.nvim_create_autocmd("BufReadPost", {
	callback = function()
		local mark = vim.api.nvim_buf_get_mark(0, '"')
		local lcount = vim.api.nvim_buf_line_count(0)
		if mark[1] > 0 and mark[1] <= lcount then
			pcall(vim.api.nvim_win_set_cursor, 0, mark)
		end
	end,
})

-- turns off LSP semantic tokens by default
vim.api.nvim_create_autocmd("LspAttach", {
	callback = function(args)
		local client = vim.lsp.get_client_by_id(args.data.client_id)
		client.server_capabilities.semanticTokensProvider = nil
	end,
})

-- set folds to be remembered on save
vim.cmd([[
augroup remember_folds
  autocmd!
  autocmd BufWinLeave *.* mkview
  autocmd BufWinEnter *.* silent! loadview
augroup END
]])

-- configure diagnostic lsp err msgs
-- vim.diagnostic.config({
-- underline = true,
-- signs = true,
-- virtual_text = true,
-- float = {
-- show_header = true,
-- source = "always",
-- border = "border",
-- focusable = false,
-- },
-- update_in_insert = false, -- default to false
-- severity_sort = false, -- default to false
-- })

-- codeium disable default keybindings
vim.g.codeium_disable_bindings = 1
-- codeium disable by default
vim.g.codeium_enabled = 0
