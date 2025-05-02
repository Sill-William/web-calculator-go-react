package main

import (
	"context"
	"errors"
	"log"
	"net/http"

	"connectrpc.com/connect"
	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"
	v1 "org.sill.webcalculator/gen/pts/f/v1"
	"org.sill.webcalculator/gen/pts/f/v1/v1connect"
)

type Calculator struct{}

func (s *Calculator) Calculate(
	ctx context.Context,
	req *connect.Request[v1.CalculateRequest],
) (*connect.Response[v1.CalculateResponse], error) {
	log.Println("Request headers: ", req.Header())
	log.Println("Request body: ", req.Msg.Prior, req.Msg.Post)
	log.Println("Request op: ", req.Msg.Op)
	switch req.Msg.Op {
	case 0:
		return &connect.Response[v1.CalculateResponse]{Msg: &v1.CalculateResponse{Result: req.Msg.Prior + req.Msg.Post}}, nil
	case 1:
		return &connect.Response[v1.CalculateResponse]{Msg: &v1.CalculateResponse{Result: req.Msg.Prior - req.Msg.Post}}, nil
	case 2:
		return &connect.Response[v1.CalculateResponse]{Msg: &v1.CalculateResponse{Result: req.Msg.Prior * req.Msg.Post}}, nil
	case 3:
		if req.Msg.Post == 0 {
			return nil, connect.NewError(connect.CodeInvalidArgument, errors.New("division by zero"))
		}
		return &connect.Response[v1.CalculateResponse]{Msg: &v1.CalculateResponse{Result: req.Msg.Prior / req.Msg.Post}}, nil
	default:
		return nil, connect.NewError(connect.CodeInvalidArgument, errors.New("invalid operation"))
	}
}

func main() {
	cal := &Calculator{}
	mux := http.NewServeMux()
	path, handler := v1connect.NewCalculatorServiceHandler(cal)
	mux.Handle(path, handler)
	log.Println("Listening on localhost:8080")
	http.ListenAndServe(
		"localhost:8080",
		h2c.NewHandler(mux, &http2.Server{}),
	)
}
