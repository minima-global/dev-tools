import { beforeAll, describe, it, expect } from 'vitest';
import { MDS } from '../../index.js';

const BEFORE_ALL_TIMEOUT = 30000; // 30 sec

describe('MDS General Commands', () => {
  beforeAll(async () => {
    MDS.TEST_MODE = true;
    MDS.DEBUG_HOST = '127.0.0.1';
    MDS.DEBUG_PORT = 10005;

    // Check if MDS is running by fetching status
    const response = await fetch('http://127.0.0.1:9005/status');
    const data = await response.json();

    if (!data.status) {
      throw new Error('MDS cannot be reached via RPC');
    }
  }, BEFORE_ALL_TIMEOUT);

  describe('Balance Command', () => {
    it('should return successful response with correct structure when called without params', async () => {
      const result = await MDS.cmd.balance();
      expect(result.status).toBe(true);
      expect(result.pending).toBe(false);
      expect(result.command).toBe('balance');
      expect(Array.isArray(result.response)).toBe(true);

      result.response.map((entry) => {
        expect(entry).toHaveProperty('token');
        expect(entry).toHaveProperty('tokenid');
        expect(entry).toHaveProperty('confirmed');
        expect(entry).toHaveProperty('unconfirmed');
        expect(entry).toHaveProperty('sendable');
        expect(entry).toHaveProperty('coins');
        expect(entry).toHaveProperty('total');

        if (typeof entry.token === 'object') {
          expect(entry.token).toHaveProperty('name');
          expect(entry.token).toHaveProperty('url');
          expect(entry.token).toHaveProperty('description');
          expect(entry.token).toHaveProperty('webvalidate');
          expect(entry.token).toHaveProperty('owner');
          expect(entry.token).toHaveProperty('external_url');
        }
      });
    });

    it('should return balance entries with correct address params', async () => {
      const result = await MDS.cmd.balance({
        params: {
          address: '0x00',
        },
      });
      expect(result.params).toHaveProperty('address');
      expect(result.params?.address).toBe('0x00');
    });

    it('should return balance entries with correct token params', async () => {
      const result = await MDS.cmd.balance({
        params: {
          tokenid: '0x00',
        },
      });

      expect(result.params).toHaveProperty('tokenid');
      expect(result.params?.tokenid).toBe('0x00');
    });

    it('should return balance entries with correct confirmations params', async () => {
      const result = await MDS.cmd.balance({
        params: {
          confirmations: 1,
        },
      });

      expect(result.params).toHaveProperty('confirmations');
      expect(result.params?.confirmations).toBe('1');
    });

    it('should return error when called with invalid params', async () => {
      const INVALID_PARAMS = {
        invalid: 'invalid',
      };
      // @ts-expect-error - Invalid params
      const result = await MDS.cmd.balance({
        params: INVALID_PARAMS,
      });

      expect(result.status).toBe(false);
      expect(result.error).toBe(
        'Invalid parameter : ' + INVALID_PARAMS.invalid,
      );
    });
  });

  describe('Block Command', () => {
    it('should return successful response with correct structure when called without params', async () => {
      const result = await MDS.cmd.block();
      expect(result.status).toBe(true);
      expect(result.pending).toBe(false);
      expect(result.command).toBe('block');
      expect(Array.isArray(result.response)).toBe(false);
      expect(result.response).toHaveProperty('block');
      expect(result.response).toHaveProperty('hash');
      expect(result.response).toHaveProperty('timemilli');
      expect(result.response).toHaveProperty('date');
    });

    it('should return block even when called with invalid params', async () => {
      const INVALID_PARAMS = {
        invalid: 'invalid',
      };
      // @ts-expect-error - Invalid params
      expect(() => MDS.cmd.block({ params: INVALID_PARAMS })).toThrow(
        TypeError,
      );
    });
  });

  describe('CheckAddress Command', () => {
    it('should return successful response with correct structure when called with valid params', async () => {
      const SIXTYFOURCHARACTERADDRESS =
        '0x0000000000000000000000000000000000000000000000000000000000000000';

      const result = await MDS.cmd.checkaddress({
        params: {
          address: SIXTYFOURCHARACTERADDRESS,
        },
      });

      expect(result.params).toHaveProperty('address');
      expect(result.params?.address).toBe(SIXTYFOURCHARACTERADDRESS);
      expect(result.response).toHaveProperty('original');
      expect(result.response).toHaveProperty('0x');
      expect(result.response).toHaveProperty('Mx');
      expect(result.response).toHaveProperty('relevant');
      expect(result.response).toHaveProperty('simple');
    });

    it('should return error when called with invalid params', async () => {
      const INVALID_PARAMS = {
        invalid: 'invalid',
      };

      // @ts-expect-error - Should throw type error with invalid params
      const res = await MDS.cmd.checkaddress({ params: INVALID_PARAMS });

      expect(res.status).toBe(false);
      expect(res.error).toBe('Invalid parameter : ' + INVALID_PARAMS.invalid);
    });
  });

  describe('Coins Commands: CoinExport, CoinCheck, Coins', () => {
    let COINID: string;

    it('should return coins with correct structure when called without params', async () => {
      const result = await MDS.cmd.coins();

      expect(result.status).toBe(true);
      expect(result.pending).toBe(false);
      expect(result.command).toBe('coins');
      expect(Array.isArray(result.response)).toBe(true);
      expect(result.response[0]).toHaveProperty('coinid');
      expect(result.response[0]).toHaveProperty('amount');
      expect(result.response[0]).toHaveProperty('address');
      expect(result.response[0]).toHaveProperty('miniaddress');
      expect(result.response[0]).toHaveProperty('tokenid');
      expect(result.response[0]).toHaveProperty('token');
      expect(result.response[0]).toHaveProperty('storestate');
      expect(result.response[0]).toHaveProperty('state');
      expect(result.response[0]).toHaveProperty('spent');
      expect(result.response[0]).toHaveProperty('mmrentry');
      expect(result.response[0]).toHaveProperty('created');

      COINID = result.response[0].coinid;
    });

    let COINDATA: string;
    it('should return successful response with correct structure when called with valid params', async () => {
      const result = await MDS.cmd.coinexport({
        params: {
          coinid: COINID,
        },
      });

      expect(result.status).toBe(true);
      expect(result.pending).toBe(false);
      expect(result.command).toBe('coinexport');
      expect(result.params?.coinid).toBe(COINID);
      expect(result.response).toHaveProperty('data');
      expect(result.response).toHaveProperty('coinproof');
      expect(result.response.coinproof).toHaveProperty('coin');
      expect(result.response.coinproof.coin).toHaveProperty('coinid');
      expect(result.response.coinproof.coin).toHaveProperty('amount');
      expect(result.response.coinproof.coin).toHaveProperty('address');
      expect(result.response.coinproof.coin).toHaveProperty('miniaddress');
      expect(result.response.coinproof.coin).toHaveProperty('tokenid');
      expect(result.response.coinproof.coin).toHaveProperty('token');
      expect(result.response.coinproof.coin).toHaveProperty('storestate');
      expect(result.response.coinproof.coin).toHaveProperty('state');
      expect(result.response.coinproof.coin).toHaveProperty('spent');
      expect(result.response.coinproof.coin).toHaveProperty('mmrentry');
      expect(result.response.coinproof.coin).toHaveProperty('created');

      COINDATA = result.response.data;
    });

    it('should return successful response with correct structure when called with valid params', async () => {
      const result = await MDS.cmd.coincheck({
        params: {
          data: COINDATA,
        },
      });

      expect(result.status).toBe(true);
      expect(result.pending).toBe(false);
      expect(result.command).toBe('coincheck');
    });
  });
});
