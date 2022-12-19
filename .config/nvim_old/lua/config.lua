keymap = vim.api.nvim_set_keymap

-- Enable ColorScheme
vim.cmd[[colorscheme nord]]

-- Enable autopairs
require('nvim-autopairs').setup{}

-- Enable gitsigns
require('gitsigns').setup()
-- nvim-treesiter configuration: -- setup with all defaults
require'nvim-treesitter.configs'.setup{
    ensure_installed = {"bash", "c", "c_sharp", "cmake", "cpp", "css", "dockerfile", "go", "html", "http", "java", "javascript", "json", "json5", "jsonc", "lua", "make", "perl", "php", "pug", "python", "regex", "ruby", "toml", "tsx", "typescript", "rust", "vim", "vue", "wgsl", "yaml",}, highlight = { enable = 'true' } }
-- To enable basic vim folding methods/expressions:
--
-- vim.opt.foldmethod = "expr"
-- vim.opt.foldexpr = "nvim_treesitter#foldexpr()"

-- Disable folds
vim.g.nofoldenable = true

local lsp_installer = require("nvim-lsp-installer")

lsp_installer.on_server_ready(function(server)
    local opts = {}

    -- This setup() function will take the provided server configuration and decorate it with the necessary properties
    -- before passing it onwards to lspconfig.
    -- Refer to https://github.com/neovim/nvim-lspconfig/blob/master/doc/server_configurations.md
    server:setup(opts)
end)
  -- Setup nvim-cmp.
local cmp = require'cmp'
vim.cmd[[set completeopt=menu,menuone,noselect]]

  cmp.setup({
     snippet = {
     -- REQUIRED - you must specify a snippet engine
     expand = function(args)
        vim.fn["UltiSnips#Anon"](args.body) -- For `ultisnips` users.
     end,
    },
    window = {
        completion = cmp.config.window.bordered(),
        documentation = cmp.config.window.bordered(),
    },
    mapping = cmp.mapping.preset.insert({
      ['<C-b>'] = cmp.mapping.scroll_docs(-4),
      ['<C-f>'] = cmp.mapping.scroll_docs(4),
      ['<C-Space>'] = cmp.mapping.complete(),
      ['<C-e>'] = cmp.mapping.abort(),
      ['<CR>'] = cmp.mapping.confirm({ select = true }), -- Accept currently selected item. Set `select` to `false` to only confirm explicitly selected items.
    }),
    sources = cmp.config.sources({
      { name = 'nvim_lsp' },
      { name = 'buffer' },
      { name = 'ultisnips' },
    })
  })

  -- Set configuration for specific filetype.
  -- cmp.setup.filetype('gitcommit', {
    -- sources = cmp.config.sources({
      -- { name = 'cmp_git' }, -- You can specify the `cmp_git` source if you were installed it.
    -- }, {
      -- { name = 'buffer' },
    -- })
  -- })

-- auto completion doesn't apply to txt files
  cmp.setup.filetype({ 'text', 'markdown' }, {
      completion = {
            autocomplete = false
      }
  })

  -- Use buffer source for `/` (if you enabled `native_menu`, this won't work anymore).
  cmp.setup.cmdline('/', {
    mapping = cmp.mapping.preset.cmdline(),
    sources = {
      { name = 'buffer' }
    }
  })

  -- Use cmdline & path source for ':' (if you enabled `native_menu`, this won't work anymore).
  cmp.setup.cmdline(':', {
    mapping = cmp.mapping.preset.cmdline(),
    sources = cmp.config.sources({
      { name = 'path' }
    }, {
      { name = 'cmdline' }
    })
  })

-- function that is used with keybinding cm to toggle autocompletion
Mode = require('cmp.types').cmp.TriggerEvent.TextChanged
function SetAutoCmp(mode)
    if mode then
        cmp.setup({
          completion = {
            autocomplete = { Mode }
          }
        })
        Mode = false
    else
        cmp.setup({
            completion = {
                autocomplete = Mode
            }
        })
        Mode = require('cmp.types').cmp.TriggerEvent.TextChanged
    end
end
SetAutoCmp(Mode)

local capabilities = require('cmp_nvim_lsp').default_capabilities()

-- Replace <YOUR_LSP_SERVER> with each lsp server you've enabled.
local lspconfig =require'lspconfig'

local on_attach = function(client)
    require'completion'.on_attach(client)
end

-- Enable quick-lint-js lsp
require('lspconfig/quick_lint_js').setup {}

-- Enable use of ripgrep
require('nvim-ripgrep').setup{
    runner = require('nvim-ripgrep.run').ripgrep, -- grep command
    prompt = "❯ ", -- prompt
    window = {
        width = 0.8,
        border = "rounded",
    };
    open_qf_fn = function()
        return vim.api.nvim_command('copen')
    end,
}

-- quick-lint-js detects errors in insert mode
vim.lsp.handlers['textDocument/publishDiagnostics'] = vim.lsp.with(
  vim.lsp.diagnostic.on_publish_diagnostics, {
    update_in_insert = true,
  }
)

-- Enable rust-analyzer lsp
lspconfig.rust_analyzer.setup({
    on_attach=on_attach,
    settings = {
        ["rust_analyzer"] = {
            imports = {
                granularity = {
                    group = "module",
                },
                prefix = "self",
            },
            cargo = {
                buildScripts = {
                    enable = true,
                },
            },
            procMacro = {
                enable = true
            }
        }
    }
})

-- Enable some language servers with the additional completion capabilities offered by nvim-cmp
local servers = { 'dockerls', 'grammarly', 'html', 'sqls', 'quick_lint_js', 'sumneko_lua', 'pyright', 'bashls', 'clangd', 'rust_analyzer', 'volar', }
for _, lsp in ipairs(servers) do
   lspconfig[lsp].setup {
     capabilities = capabilities,
   }
end

-- Nvim_Tree configuration: -- setup with all defaults
-- each of these are documented in `:help nvim-tree.OPTION_NAME`
require'nvim-tree'.setup { -- BEGIN_DEFAULT_OPTS
  auto_reload_on_write = true,
  disable_netrw = false,
  -- hide_root_folder = false,
  hijack_cursor = false,
  hijack_netrw = true,
  hijack_unnamed_buffer_when_opening = false,
  ignore_buffer_on_setup = false,
  open_on_setup = false,
  open_on_setup_file = false,
  open_on_tab = false,
  sort_by = "name",
  update_cwd = false,
  view = {
    width = 25,
    -- height = 30,
    side = "right",
    preserve_window_proportions = true,
    number = false,
    relativenumber = false,
    signcolumn = "yes",
    mappings = {
      custom_only = false,
      list = {
          -- user mappings go here
      },
    },
  },
  renderer = {
    indent_markers = {
      enable = false,
      icons = {
        corner = "└ ",
        edge = "│ ",
        none = "  ",
      },
    },
    icons = {
      webdev_colors = true,
    },
  },
  hijack_directories = {
    enable = true,
    auto_open = true,
  },
  update_focused_file = {
    enable = false,
    update_cwd = false,
    ignore_list = {},
  },
  ignore_ft_on_setup = {},
  system_open = {
    cmd = nil,
    args = {},
  },
  diagnostics = {
    enable = false,
    show_on_dirs = false,
    icons = {
      hint = "",
      info = "",
      warning = "",
      error = "",
    },
  },
  filters = {
    dotfiles = false,
    custom = {},
    exclude = {},
  },
  git = {
    enable = true,
    ignore = true,
    timeout = 400,
  },
  actions = {
    use_system_clipboard = true,
    change_dir = {
      enable = true,
      global = false,
      restrict_above_cwd = false,
    },
    open_file = {
      quit_on_open = false,
      resize_window = false,
      window_picker = {
        enable = true,
        chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
        exclude = {
          filetype = { "notify", "packer", "qf", "diff", "fugitive", "fugitiveblame" },
          buftype = { "nofile", "terminal", "help" },
        },
      },
    },
  },
  trash = {
    cmd = "trash",
    require_confirm = true,
  },
  log = {
    enable = false,
    truncate = false,
    types = {
      all = false,
      config = false,
      copy_paste = false,
      diagnostics = false,
      git = false,
      profile = false,
    },
  },
} -- END_DEFAULT_OPTS for Nvim_Tree

-- Lua Line color configuration
require('lualine').setup({
options = { theme = 'nord' }
})

 -- Automatically closes Nvim tree if last window open
vim.cmd[[autocmd BufEnter * ++nested if winnr('$') == 1 && bufname() == 'NvimTree_' . tabpagenr() | quit | endif]]

-- vim-smoothie configuration
-- Use experimental features of vim-smoothie (gg and G)
vim.g.smoothie_experimental_mappings = 1

-- set colored brackets via rainbow
vim.g.rainbow_active = 1

-- Marks end of line, space, and trailing space characters
vim.opt.listchars:append({ eol = '↵', trail = '·', space = '·' })
vim.opt.list = true

-- enable AutoSave on start
vim.g.auto_save = 1

-- silence AutoSave messages
vim.g.auto_save_silent = 1

-- Create Default Mappings for NerdCommenter
vim.g.NERDCreateDefaultMappings = 1

-- Add spaces after NerdCommenter delimiters by default
vim.g.NERDSpaceDelims = 1

-- this variable must be enabled for colors to be applied properly
vim.opt.termguicolors = true
vim.g.nosplitright = true

-- Enable colorizer (css)
require'colorizer'.setup()

-- specify markdown-preview browser / set to dark mode
vim.g.mkdp_browser = 'librewolf'
vim.g.mkdp_theme = 'dark'

-- set relative number
-- vim.opt.number = true
vim.opt.relativenumber = true

vim.opt.cursorcolumn = true
-- vim.opt.cursor = true
--
vim.opt.mouse = 'a'
vim.opt.autoindent = true
vim.opt.smarttab = true
vim.opt.ignorecase = true
vim.opt.cindent = true
vim.opt.tabstop = 8
vim.opt.softtabstop = 0
vim.opt.shiftwidth = 4
-- always uses spaces instead of tab characters
vim.opt.expandtab = true

-- if hidden is not set, TextEdit might fail.
vim.opt.hidden = true
-- Set the height of the status line down at the bottom
vim.opt.cmdheight = 1
-- Set the amount of characters you get back from status/error messages
vim.opt.updatetime = 300
-- always show signcolumns
vim.opt.signcolumn = 'yes'

-- Fix Splitting
vim.opt.splitbelow = true
vim.opt.splitright = true

-- Disable git-blame by default
-- vim.cmd[[g:gitblame_enabled = 0]]
vim.g.gitblame_enabled = 0


-- Vertically center document when entering Insert mode
vim.cmd[[autocmd InsertEnter * norm zz]]

--  Removes trailing spaces
vim.cmd[[function TrimWhiteSpace()
    %s/\s*$//
    ''
endfunction]]

-- Search pattern across repository files
vim.cmd[[
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
endfunction]]

vim.cmd[[command! -nargs=* FZFExplore call FzfExplore(shellescape(<q-args>))]]

-- fzf is on bottom of screen
vim.cmd[[let g:fzf_layout = { 'down': '~30%' }]]

-- max tab characters
vim.cmd[[let g:mintabline_tab_max_chars = 10 ]]

--Removes trailing spaces on save
vim.cmd[[autocmd FileWritePre * call TrimWhiteSpace()]]
vim.cmd[[autocmd FileAppendPre * call TrimWhiteSpace()]]
vim.cmd[[autocmd FilterWritePre * call TrimWhiteSpace()]]
vim.cmd[[autocmd BufWritePre * call TrimWhiteSpace()]]

-- Enable Comments with Italics (below selected colorscheme)
vim.cmd[[highlight Comment cterm=italic gui=italic]]

-- Re-enable transparency while termguicolors are set
vim.cmd[[hi! Normal ctermbg=NONE guibg=NONE]]
vim.cmd[[hi! NonText ctermbg=NONE guibg=NONE]]

-- never create swap files
vim.cmd[[set noswapfile]]

-- enable hard/soft wrap
vim.cmd[[set wrap linebreak textwidth=80]]

-- enable clipboard
vim.cmd[[set clipboard+=unnamedplus]]

-- set up lab.nvim
sources = cmp.config.sources({ {name = 'lab.quick_data', keyword_length = 4 }})
require('lab').setup {
    code_runner = {
        enabled = true,
    },
    quick_data = {
        enabled = true,
    }
}

-- do not close the markdown preview tab when switching to other buffers
-- vim.g.mkdp_auto_close = 0
