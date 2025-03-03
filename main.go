package main

import (
	"fmt"
	"syscall/js"
)

// The fisrt arg in args array is binded to first arg before inputs in js code,
// Ususally it binded to "this"
func getArgsFromJS(args []js.Value) (js.Value, []js.Value) {
	return args[0], args[1:]
}

func showGoAlert(this js.Value, args []js.Value) interface{} {
	if len(args) > 0 {
		_, pargs := getArgsFromJS(args)
		alertText := pargs[0]
		js.Global().Get("alert").Invoke(alertText)
	} else {
		js.Global().Call("logDebug", "No input provided")
		js.Global().Get("alert").Invoke("No input provided")
	}

	return nil
}

func main() {
	fmt.Println("Hello From WASM!")
	js.Global().Set("__showAlert", js.FuncOf(showGoAlert))
	<-make(chan bool)
}
