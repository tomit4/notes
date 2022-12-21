require("telescope").setup({
  extensions = {
    undo = {
      layout_strategy = "vertical",
      layout_config = {
        preview_height = 0.8,
      },
    },
  },
})
