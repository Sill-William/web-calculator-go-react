# Web Calculator Server

## Installation

### Install Dependencies

- install `protoc`
- install go dependencies
```sh
# <repo-root>/server/
go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
go install connectrpc.com/connect/cmd/protoc-gen-connect-go@latest
```

## Build

- create folder `gen` in `<repo-root>/server/`
```sh
cd <repo-root>/server/ && mkdir gen
```
- use `protoc`
```sh
# in windows
..\.venv\bin\protoc -I protos/proto `
  --go_out=gen --go_opt=paths=source_relative `
  --connect-go_out=gen --connect-go_opt=paths=source_relative `
  protos/proto/base.proto

# in linux
../.venv/bin/protoc -I protos/proto \
  --go_out=gen --go_opt=paths=source_relative \
  --connect-go_out=gen --connect-go_opt=paths=source_relative \
  protos/proto/base.proto
```