package main

import "context"

type GreetServer struct{}

func (self *GreetServer) Greet(
	ctx context.Context,
	req *context.Request[]
) () {
	
}