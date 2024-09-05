


export namespace Commands {
  export function balance<T extends { payload: BalanceParams }>(
    args?: T,
    callback?: (data: BalanceGetPayload<T>) => void
  ): DefaultResObj<BalanceGetPayload<T>> {
    const result: DefaultResObj<BalanceGetPayload<T>> = {
      command: 'balance',
      status: false,
      pending: true,
      response: {} as BalanceGetPayload<T>
    };
    
    httpPostAsync("balance", args?.payload, callback);

    return result;
  }

  export function block(callback: (data: Block) => void): DefaultResObj<Block> {
    const result: DefaultResObj<Block> = {
      command: 'block',
      status: false,
      pending: true,
      response: {} as Block
    }

    httpPostAsync("cmd", "block", callback);

    return result;
  }
}