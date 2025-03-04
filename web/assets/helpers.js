async function loadWasm() {
    const go = new Go();
    try {
        const binaryString = atob(base64Wasm);
        const binary = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            binary[i] = binaryString.charCodeAt(i);
        }
        const wasmModule = await WebAssembly.instantiate(binary.buffer, go.importObject);
        go.run(wasmModule.instance);
        console.log("WASM loaded");
    } catch (err) {
        console.error("Failed to load WASM:", err);
    }
}

function showAlert() {
    const alertText = document.getElementById('alertTextInput').value
    __showAlert(null, `${alertText}`)
}

function logDebug(s) {
    console.log("Debug: " + s)
}

function logInfo(s) {
    console.log("Info: " + s)
}