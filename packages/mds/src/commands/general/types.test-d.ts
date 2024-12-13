import { describe, it, expectTypeOf } from 'vitest';
import {
  MDS,
  type BalanceCallback,
  type BalanceParams,
  type BalanceWithTokenDetails,
  type BlockCallback,
  type CheckAddressParams,
  type CoinCheckParams,
  type CoinExportParams,
  type GetAddressCallback,
  type HashTestCallback,
  type HashTestParams,
  type HistoryCallback,
  type HistoryParams,
  type MDSResponse,
  type NewAddressCallback,
  type PrintTreeCallback,
  type PrintTreeParams,
  type StatusCallback,
  type StatusParams,
  type TraceParams,
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
      type Expected =
        | BalanceCallback<{
            params: BalanceParams;
          }>
        | undefined;
      type Actual = Parameters<typeof MDS.cmd.balance>[1];
      expectTypeOf<Actual>().toMatchTypeOf<Expected>();
    });

    it('tokendetails true should return BalanceWithTokenDetailsresponse', async () => {
      type Response = MDSResponse<BalanceWithTokenDetails[]>;
      const actual = await MDS.cmd.balance({
        params: {
          tokendetails: 'true',
        },
      });
      expectTypeOf<typeof actual>().toMatchTypeOf<Response>();
    });
  });

  describe('Block Command Type Checking', () => {
    it('should accept correct parameter types with optional callback', () => {
      type Expected = BlockCallback | undefined;
      type Actual = Parameters<typeof MDS.cmd.block>[0];
      expectTypeOf<Actual>().toMatchTypeOf<Expected>();
    });
  });

  describe('CheckAddress Command Type Checking', () => {
    it('should require params object with address', () => {
      type Expected = { params: CheckAddressParams };
      type Actual = Parameters<typeof MDS.cmd.checkaddress>[0];
      expectTypeOf<Actual>().toMatchTypeOf<Expected>();
    });
  });

  describe('CoinCheck Command Type Checking', () => {
    it('should require params object with data', () => {
      type Expected = { params: CoinCheckParams };
      type Actual = Parameters<typeof MDS.cmd.coincheck>[0];
      expectTypeOf<Actual>().toMatchTypeOf<Expected>();
    });
  });

  describe('CoinExport Command Type Checking', () => {
    it('should require params object with coinid', () => {
      type Expected = { params: CoinExportParams };
      type Actual = Parameters<typeof MDS.cmd.coinexport>[0];
      expectTypeOf<Actual>().toMatchTypeOf<Expected>();
    });
  });

  describe('GetAddress Command Type Checking', () => {
    it('should accept optional callback', () => {
      type Expected = GetAddressCallback | undefined;
      type Actual = Parameters<typeof MDS.cmd.getaddress>[0];
      expectTypeOf<Actual>().toMatchTypeOf<Expected>();
    });
  });

  describe('HashTest Command Type Checking', () => {
    it('should accept optional params and callback', () => {
      type Expected = HashTestCallback | { params: HashTestParams } | undefined;
      type Actual = Parameters<typeof MDS.cmd.hashtest>[0];
      expectTypeOf<Actual>().toMatchTypeOf<Expected>();
    });
  });

  describe('History Command Type Checking', () => {
    it('should accept optional params and callback', () => {
      type Expected = HistoryCallback | { params: HistoryParams } | undefined;
      type Actual = Parameters<typeof MDS.cmd.history>[0];
      expectTypeOf<Actual>().toMatchTypeOf<Expected>();
    });
  });

  describe('NewAddress Command Type Checking', () => {
    it('should accept optional callback', () => {
      type Expected = NewAddressCallback | undefined;
      type Actual = Parameters<typeof MDS.cmd.newaddress>[0];
      expectTypeOf<Actual>().toMatchTypeOf<Expected>();
    });
  });

  describe('PrintTree Command Type Checking', () => {
    it('should accept optional params and callback', () => {
      type Expected =
        | PrintTreeCallback
        | { params: PrintTreeParams }
        | undefined;
      type Actual = Parameters<typeof MDS.cmd.printtree>[0];
      expectTypeOf<Actual>().toMatchTypeOf<Expected>();
    });
  });

  describe('Status Command Type Checking', () => {
    it('should accept optional params and callback', () => {
      type Expected = { params: StatusParams } | StatusCallback | undefined;
      type Actual = Parameters<typeof MDS.cmd.status>[0];
      expectTypeOf<Actual>().toMatchTypeOf<Expected>();
    });

    it('should accept optional callback as second parameter', () => {
      type Expected = StatusCallback | undefined;
      type Actual = Parameters<typeof MDS.cmd.status>[1];
      expectTypeOf<Actual>().toMatchTypeOf<Expected>();
    });
  });

  describe('Trace Command Type Checking', () => {
    it('should require params object with enable property', () => {
      type Expected = { params: TraceParams };
      type Actual = Parameters<typeof MDS.cmd.trace>[0];
      expectTypeOf<Actual>().toMatchTypeOf<Expected>();
    });
  });
});
