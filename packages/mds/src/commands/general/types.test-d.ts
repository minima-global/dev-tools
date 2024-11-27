import { describe, it, expectTypeOf } from 'vitest';
import {
  MDS,
  type BalanceCallback,
  type BalanceParams,
  type BlockCallback,
} from '../../index.js';

describe('MDS Commands Type Checking', () => {
  describe('Balance Command Type Checking', () => {
    it('should accept correct parameter types with params and optional callback', () => {
      type Expected =
        | BalanceCallback<undefined>
        | {
            params: BalanceParams;
          }
        | undefined;
      type Actual = Parameters<typeof MDS.cmd.balance>[0];
      expectTypeOf<Actual>().toMatchTypeOf<Expected>();
    });

    it('should accept correct parameter types with optional callback', () => {
      type Expected = BalanceCallback<BalanceParams> | undefined;
      type Actual = Parameters<typeof MDS.cmd.balance>[1];
      expectTypeOf<Actual>().toMatchTypeOf<Expected>();
    });
  });

  describe('Block Command Type Checking', () => {
    it('should accept correct parameter types with optional callback', () => {
      type Expected = BlockCallback | undefined;
      type Actual = Parameters<typeof MDS.cmd.block>[0];
      expectTypeOf<Actual>().toMatchTypeOf<Expected>();
    });
  });
});
