package main

import (
	"fmt"
	"syscall/js"
)

func showGoAlert(this js.Value, inputs []js.Value) interface{} {
	alertText := inputs[0].String()
	js.Global().Get("alert").Invoke(alertText)
	return nil
}

func main() {
	fmt.Println("Hello From WASM!")
	js.Global().Set("showGoAlert", js.FuncOf(showGoAlert))
	<-make(chan bool)
}
