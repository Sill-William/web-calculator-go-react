# web-calculator-go-react
a simple web calculator powered by go-connectRPC and next.js. for test from zenai.intl@gmail.com

## Installation

### Install Dependencies

- clone this repo

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

- install node dependencies
```sh
cd <repo-root>/client/

npm install
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

## Run

- start server
```sh
cd <repo-root>/
go get golang.org/x/net/http2
go get connectrpc.com/connect
go run ./server/main.go
```

- start client
```sh
npm run dev
```

## Sample Pictrue
![image](https://github.com/Sill-William/web-calculator-go-react/blob/main/static/sample.png?raw=true)
