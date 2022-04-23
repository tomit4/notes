keymap = vim.api.nvim_set_keymap

-- Enable ColorScheme
vim.cmd[[colorscheme nord]]

-- Nvim_Tree configuration: -- setup with all defaults
-- each of these are documented in `:help nvim-tree.OPTION_NAME`
require'nvim-tree'.setup { -- BEGIN_DEFAULT_OPTS
  auto_reload_on_write = true,
  disable_netrw = false,
  hide_root_folder = false,
  hijack_cursor = false,
  hijack_netrw = true,
  hijack_unnamed_buffer_when_opening = false,
  ignore_buffer_on_setup = false,
  open_on_setup = true,
  open_on_setup_file = true,
  open_on_tab = false,
  sort_by = "name",
  update_cwd = false,
  view = {
    width = 25,
    height = 30,
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
vim.g.NERDCreateDefaultMappings= 1

-- Add spaces after NerdCommenter delimiters by default
vim.g.NERDSpaceDelims= 1

-- this variable must be enabled for colors to be applied properly
vim.g.termguicolors = true
vim.g.nosplitright = true

-- set relative number
vim.opt.number = true

vim.opt.cursorcolumn = true
-- vim.opt.cursor = true
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

-- Vertically center document when entering Insert mode
vim.cmd[[autocmd InsertEnter * norm zz]]

--  Removes trailing spaces
vim.cmd[[function TrimWhiteSpace()
    %s/\s*$//
    ''
endfunction]]

--Removes trailing spaces on save
vim.cmd[[autocmd FileWritePre * call TrimWhiteSpace()]]
vim.cmd[[autocmd FileAppendPre * call TrimWhiteSpace()]]
vim.cmd[[autocmd FilterWritePre * call TrimWhiteSpace()]]
vim.cmd[[autocmd BufWritePre * call TrimWhiteSpace()]]

-- Enable Comments with Italics (below selected colorscheme)
vim.cmd[[highlight Comment cterm=italic gui=italic]]

-- do not close the markdown preview tab when switching to other buffers
-- vim.g.mkdp_auto_close = 0
