#!/bin/bash

echo '' | xclip && xclip -selection clipboard /dev/null && clear && history -p && hash -r && /usr/bin/rm $HOME/.zsh_history && touch $HOME/.zsh_history

# grabs the last line of our .zshrc, and grabs the first word
last_line_first_word=$(awk '{w=$1} END{print w}' $HOME/.zshrc)

# if the last line of our rc file begins with "export"...
# remove the last line of our rc file
if [[ $last_line_first_word == "export" ]] ; then
    sed -i '$ d' $HOME/.zshrc
fi

# unset sdir
