package main

import (
	"fmt"
	"syscall/js"
)

func showGoAlert(this js.Value, inputs []js.Value) interface{} {
	if len(inputs) > 0 {
		alertText := inputs[0].String()
		js.Global().Get("alert").Invoke(alertText)
	} else {
		js.Global().Get("alert").Invoke("No input provided")
	}
	return nil
}

func main() {
	fmt.Println("Hello From WASM!")
	js.Global().Set("showGoAlert", js.FuncOf(showGoAlert))
	<-make(chan bool)
}
