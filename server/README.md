# Web Calculator Server

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