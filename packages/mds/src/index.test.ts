import { describe, expect, it } from 'vitest';
import { MDS } from './mds';
describe('MDS functions ', () => {
  it('should return 2', () => {
    expect(1 + 1).toBe(2);
  });
});

const res = await MDS.cmd.coins({
  params: {
    address: '0x123',
  },
});

const res2 = await MDS.cmd.txpow({
  params: {
    address: '0x123',
  },
});

const res3 = await MDS.cmd.peers({
  params: {
    action: 'list',
  },
});

const res4 = await MDS.cmd.rpc();
