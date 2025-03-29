local cmp = require("cmp")

-- function that is used with keybinding cm to toggle autocompletion
Mode = require("cmp.types").cmp.TriggerEvent.TextChanged
function SetAutoCmp(mode)
	if mode then
		cmp.setup({
			completion = {
				autocomplete = { Mode },
			},
		})
		Mode = false
	else
		cmp.setup({
			completion = {
				autocomplete = Mode,
			},
		})
		Mode = require("cmp.types").cmp.TriggerEvent.TextChanged
	end
end

SetAutoCmp(Mode)
