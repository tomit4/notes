return {
	"kyazdani42/nvim-tree.lua",
	cmd = { "NvimTreeToggle" },
	config = function()
		-- Nvim_Tree configuration: -- setup with all defaults
		-- each of these are documented in `:help nvim-tree.OPTION_NAME`
		require("nvim-tree").setup({ -- BEGIN_DEFAULT_OPTS
			auto_reload_on_write = true,
			disable_netrw = false,
			-- hide_root_folder = false,
			hijack_cursor = false,
			hijack_netrw = true,
			hijack_unnamed_buffer_when_opening = false,
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
				-- mappings = {
				-- custom_only = false,
				-- list = {
				-- user mappings go here
				-- },
				-- },
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
		}) -- END_DEFAULT_OPTS for Nvim_Tree
	end,
}
