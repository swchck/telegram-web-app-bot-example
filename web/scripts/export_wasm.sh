#!/bin/bash

# Check if the input file path is provided
if [ -z "$1" ]; then
    echo "Error: No input file path provided."
    echo "Usage: $0 <input_file_path>"
    exit 1
fi

# Check if the input file exists
if [ ! -f "$1" ]; then
    echo "Error: File '$1' not found."
    exit 1
fi

# Read the Base64 encoded WASM file
wasm_base64=$(cat "$1")

# Create the JavaScript content
js_content="const base64Wasm = \`$wasm_base64\`;\n"

# Write the JavaScript content to a file
echo -e "$js_content" >web/assets/wasmexprt.js
