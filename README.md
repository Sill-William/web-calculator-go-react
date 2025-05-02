# web-calculator-go-react
a simple web calculator powered by go-connectRPC and next.js. for test from zenai.intl@gmail.com

## Installation

### Install Dependencies

- install go dependencies
```sh
# <repo-root>/
go install github.com/bufbuild/buf/cmd/buf@latest
go install github.com/fullstorydev/grpcurl/cmd/grpcurl@latest
go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
go install connectrpc.com/connect/cmd/protoc-gen-connect-go@latest

npm install typescript tsx
npx tsc --init
npm install @bufbuild/buf @bufbuild/protobuf @bufbuild/protoc-gen-es @connectrpc/connect
```

## Build

- use `buf`
```sh
# buf lint
# buf generate
npx buf lint
npx buf generate

mv <repo-root>/gen-es/pts/f/v1/calculator_pb.ts <repo-root>/client/src/app/
```