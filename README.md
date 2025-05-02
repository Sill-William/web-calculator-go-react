# web-calculator-go-react
a simple web calculator powered by go-connectRPC and next.js. for test from zenai.intl@gmail.com

## Installation

### Install Dependencies

- install go dependencies
```sh
# <repo-root>/server/
go install github.com/bufbuild/buf/cmd/buf@latest
go install github.com/fullstorydev/grpcurl/cmd/grpcurl@latest
go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
go install connectrpc.com/connect/cmd/protoc-gen-connect-go@latest
```

## Build

- use `buf`
```sh
buf lint
buf generate
```