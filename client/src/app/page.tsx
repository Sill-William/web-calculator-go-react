'use client'

import { createClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import { useRef, useState } from "react";
import { CalculatorService } from "./calculator_pb";

type gRPCRequest = {
  "prior": number | null,
  "post": number | null,
  "op": number | null, // 0: +, 1: -, 2: *, 3: / 
}

type gRPCResponse = {
  "result": number | null,
}

export default function Home() {
  // let opReq: gRPCRequest = {
  //   "prior": null,
  //   "post": null,
  //   "op": null,
  // };
  const transport = createConnectTransport({
    baseUrl: "http://localhost:8080"
  });
  const opReq = useRef<gRPCRequest>({
    "prior": null,
    "post": null,
    "op": null,
  })
  let [board, setBoard] = useState(0);
  let [op, setOp] = useState<number | null>(null);
  let [isNagative, setNegative] = useState(0);
  let [isErr, setErr] = useState(false);

  let push = (n: number) => {
    if (isErr) {
      setErr(false);
    }
    if (op !== null && n !== -1 && n !== -2) {
      if (opReq.current.post !== null) {
        // TODO
        calc();
        opReq.current.post = null;
      }
      // opReq.prior = board * isNagative === 1 ? -1 : 1;
      opReq.current.prior = board * (isNagative === 1 ? -1 : 1);
      setNegative(0);
      setBoard(n);
      setOp(null);
      return;
    }
    if (board >= 99999999 && n !== -1 && n !== -2) {
      return;
    }
    switch (n) {
      case 0:
        if (board === 0) {
          setBoard(n);
          return;
        }
        setBoard(board * 10 + n);
        break;
      case -1:
        opReq.current = {
          "prior": null,
          "post": null,
          "op": null,
        }
        setBoard(0);
        setOp(null);
        return;
      case -2:
        setBoard(Math.floor(board / 10));
        if (board === 0 && isNagative === 1) {
          setNegative(0);
        }
        return;
      default:
        setBoard(board * 10 + n);
    }
  }
  let pressOp = (pop: number) => {
    if (pop === op) {
      console.debug("press same op")
      setOp(null);
      return;
    }
    // if (opReq.current.prior !== null ) {
    //   calc();
    //   opReq.current.post = null;
    //   console.debug("after calc, now opReq is", opReq.cu rrent);
    // }
    setOp(pop);
    // opReq.op = pop;
    opReq.current.op = pop;
  }
  let calc = async () => {
    console.debug("origin opReq is", opReq.current);
    if (opReq.current.post === null) {
      // opReq.post = board * isNagative === 1 ? -1 : 1;
      // setOpReqFields(["post"], [board * (isNagative === 1 ? -1 : 1),]);
      console.debug("now board", board);
      opReq.current.post = board * (isNagative === 1 ? -1 : 1);
      console.debug("now set opReqs post");
      setNegative(0);
    }
    console.debug("opReg is", opReq.current);
    // const res = mockBak(opReq.current);
    // TODO: use gRPC to connect server and get result
    const res = await toBak(opReq.current);
    console.debug("mock res is", res);
    if (res.result === null) {
      setBoard(0);
      return;
    }
    setBoard(Math.abs(res.result));
    if (res.result < 0) {
      setNegative(1);
    }
    setOp(null);
    // opReq.prior = res.result;
    opReq.current.prior = res.result;
  }
  let toBak = async (req: gRPCRequest) => {
    const client = createClient(CalculatorService, transport);
    const res = await client.calculate({
      prior: req.prior!,
      post: req.post!,
      op: req.op!,
    });
    console.debug("remote response is", res);
    return { result: res.result };
  }
  // let mockBak = (req: gRPCRequest) => {
  //   let result = {
  //     "result": 0,
  //   }
  //   switch (req.op) {
  //     case 0:
  //       result.result = req.prior! + req.post!;
  //       break;
  //     case 1:
  //       result.result = req.prior! - req.post!;
  //       break;
  //     case 2:
  //       result.result = req.prior! * req.post!;
  //       break;
  //     case 3:
  //       if (req.post === 0) {
  //         result.result = 0;
  //         setErr(true);
  //         break;
  //       }
  //       result.result = req.prior! / req.post!;
  //       break;
  //   }
  //   return result;
  // }

  return (
    <div 
      className="flex w-screen h-screen bg-black justify-center items-center text-white">
      <div 
        className="grid grid-cols-4 grid-rows-6 bg-white w-xs h-100 text-black p-2 gap-1">
        {/* <div 
          className="bg-gray-500 col-start-1 col-end-5 row-span-1 flex items-center justify-end p-1 text-6xl text-white"
          id="display-board"
        >
          {board}
        </div> */}
        <div
          className="bg-gray-500 col-start-1 col-end-5 row-span-1 grid grid-rows-1 grid-cols-12"
        >
          <div
            className="col-start-2 col-end-13 row-start-1 row-end-2 flex items-center justify-end p-1 text-6xl text-black"
          >
            {board}
          </div>
          <div
            className="col-start-1 col-end-2 row-start-1 row-end-2 grid grid-cols-1 grid-rows-4"
          >
            <div className="col-start-1 col-end-2 row-start-2 row-start-3 flex items-center justify-center text-xl">
              {isNagative === 0 ? "" : "-"}
            </div>
            <div className="col-start-1 col-end-2 row-start-3 row-start-4 flex items-center justify-center text-xs">
              {isErr ? "ERR" : ""}
            </div>
          </div>
        </div>
        <div
          className="bg-gray-300 col-start-1 col-end-2 row-start-2 row-end-3 flex items-center justify-center text-4xl hover:bg-gray-600 cursor-default"
          onClick={() => { setNegative(isNagative === 0 ? 1 : 0) }}
        >
          -/+
        </div>
        <div
          className="bg-gray-300 col-start-2 col-end-3 row-start-2 row-end-3 flex items-center justify-center text-4xl hover:bg-gray-600 cursor-default"
          onClick={() => { pressOp(3) }}
        >
          /
        </div>
        <div
          className="bg-gray-300 col-start-3 col-end-4 row-start-2 row-end-3 flex items-center justify-center text-4xl hover:bg-gray-600 cursor-default"
          onClick={() => { pressOp(2) }}
        >
          *
        </div>
        <div
          className="bg-gray-300 col-start-4 col-end-5 row-start-2 row-end-3 flex items-center justify-center text-4xl hover:bg-gray-600 cursor-default"
          onClick={() => { push(-2) }}
        >
          b
        </div>
        <div 
          className="bg-gray-300 col-start-1 col-end-2 row-start-3 row-end-4 flex items-center justify-center text-4xl hover:bg-gray-600 cursor-default"
          onClick={() => { push(7) }}
        >
          7
        </div>
        <div 
          className="bg-gray-300 col-start-2 col-end-3 row-start-3 row-end-4 flex items-center justify-center text-4xl hover:bg-gray-600 cursor-default"
          onClick={() => { push(8) }}
        >
          8
        </div>
        <div 
          className="bg-gray-300 col-start-3 col-end-4 row-start-3 row-end-4 flex items-center justify-center text-4xl hover:bg-gray-600 cursor-default"
          onClick={() => { push(9) }}
        >
          9
        </div>
        <div 
          className="bg-gray-300 col-start-4 col-end-5 row-start-3 row-end-4 flex items-center justify-center text-4xl hover:bg-gray-600 cursor-default"
          onClick={() => { pressOp(1) }}
        >
          -
        </div>
        <div 
          className="bg-gray-300 col-start-1 col-end-2 row-start-4 row-end-5 flex items-center justify-center text-4xl hover:bg-gray-600 cursor-default"
          onClick={() => { push(4) }}
        >
          4
        </div>
        <div 
          className="bg-gray-300 col-start-2 col-end-3 row-start-4 row-end-5 flex items-center justify-center text-4xl hover:bg-gray-600 cursor-default"
          onClick={() => { push(5) }}
        >
          5
        </div>
        <div 
          className="bg-gray-300 col-start-3 col-end-4 row-start-4 row-end-5 flex items-center justify-center text-4xl hover:bg-gray-600 cursor-default"
          onClick={() => { push(6) }}
        >
          6
        </div>
        <div 
          className="bg-gray-300 col-start-4 col-end-5 row-span-3 flex items-center justify-center text-4xl hover:bg-gray-600 cursor-default"
          onClick={() => { pressOp(0) }}
        >
          +
        </div>
        <div 
          className="bg-gray-300 col-start-1 col-end-2 row-start-5 row-end-6 flex items-center justify-center text-4xl hover:bg-gray-600 cursor-default"
          onClick={() => { push(1) }}
        >
          1
        </div>
        <div 
          className="bg-gray-300 col-start-2 col-end-3 row-start-5 row-end-6 flex items-center justify-center text-4xl hover:bg-gray-600 cursor-default"
          onClick={() => { push(2) }}
        >
          2
        </div>
        <div 
          className="bg-gray-300 col-start-3 col-end-4 row-start-5 row-end-6 flex items-center justify-center text-4xl hover:bg-gray-600 cursor-default"
          onClick={() => { push(3) }}
        >
          3
        </div>
        {/* <div 
          className="bg-gray-300 col-start-4 col-end-5 row-start-5 row-end-6 flex items-center justify-center text-4xl hover:bg-gray-600 cursor-default"
          onClick={() => { pressOp(1) }}
        >
          -
        </div> */}
        <div 
          className="bg-blue-300 col-start-1 col-end-2 row-start-6 row-end-7 flex items-center justify-center text-4xl hover:bg-gray-600 cursor-default"
          onClick={() => { push(-1) }}
        >
          C
        </div>
        <div 
          className="bg-gray-300 col-start-2 col-end-3 row-start-6 row-end-7 flex items-center justify-center text-4xl hover:bg-gray-600 cursor-default"
          onClick={() => { push(0) }}
        >
          0
        </div>
        <div 
          className="bg-orange-300 col-start-3 col-end-4 row-start-6 row-end-7 flex items-center justify-center text-4xl hover:bg-gray-600 cursor-default"
          onClick={() => { calc() }}
        >
          =
        </div>
        {/* <div 
          className="bg-gray-300 col-start-4 col-end-5 row-start-6 row-end-7 flex items-center justify-center text-4xl hover:bg-gray-600 cursor-default"
          onClick={() => { pressOp(0) }}
        >
          +
        </div> */}
      </div>
    </div>
  );
}
