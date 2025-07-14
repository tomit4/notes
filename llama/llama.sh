#!/usr/bin/env bash
#NOTE: You can adjust the behavior of the chat version by assigning it a role

# Simple AI assistant
# ./main -ngl 32 -m ./models/TheBloke/Llama-2-7B-Chat-GGUF/llama-2-7b-chat.Q4_K_M.gguf --color -c 4096 --in-suffix "AI Assistant: " --temp 0.8 --repeat_penalty 1.1 --threads 6 -n -1 -i -ins

# Good chatbot, but needs CUDA to run more efficiently
#--n-gpu-layers 15000
# ./main -ngl 20 -m ./models/TheBloke/CodeLlama-13B-oasst-sft-v10-GGUF/codellama-13b-oasst-sft-v10.Q4_K_M.gguf --color -c 4096 --temp 0.1 --repeat_penalty 1.1 --threads 6 -n -1 -i -ins

# Good for chat, but also has better storytelling capabilities
# ./main -ngl 20 -m ./models/TheBloke/MythoMax-L2-13B-GGUF/mythomax-l2-13b.Q4_K_M.gguf --color -c 4096 --temp 0.1 --repeat_penalty 1.1 --threads 6 -n -1 -i -ins

# Silicon Maid (large)
# ./main -ngl 25 -m ./models/TheBloke/Silicon-Maid-7B-GGUF/silicon-maid-7b.Q5_K_M.gguf --color -c 4096 --temp 0.1 --repeat_penalty 1.1 --threads 6 -n -1 -i -ins
#
## Silicon Maid (medium)
# ./main -ngl 30 -m ./models/TheBloke/Silicon-Maid-7B-GGUF/silicon-maid-7b.Q4_K_M.gguf --color -c 4096 --temp 0.1 --repeat_penalty 1.1 --threads 6 -n -1 -i -cnv --chat-template chatml

# Kunoichi-7B (medium)
./main -ngl 30 -m ./models/TheBloke/Kunoichi-7B-GGUF/kunoichi-7b.Q4_K_M.gguf --color -c 4096 --temp 0.1 --repeat_penalty 1.1 --threads 6 -n -1 -i -cnv --chat-template chatml
