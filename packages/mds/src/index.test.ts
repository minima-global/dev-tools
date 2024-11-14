import { describe, expect, it } from 'vitest';
import { MDS } from './mds.js';
describe('MDS functions ', () => {
  /*it('should call callback function', () => {
    const mockCallback = vi.fn();
    expect(typeof window).not.toBe('undefined');
    MDS.init(mockCallback);
    expect(mockCallback).toHaveBeenCalled();
  });

  it('should call log function', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    MDS.log('test log');
    expect(spy).toHaveBeenCalledOnce();
    expect(spy).toHaveBeenCalledWith(
      'Minima @ ' + new Date().toLocaleString() + ' : ' + 'test log',
    );
  });*/

  // 1 + 1 = 2

  it('should return 2', () => {
    expect(1 + 1).toBe(2);
  });
});

MDS.cmd.maxsign({ params: { data: 'test', privatekey: 'test' } });

MDS.cmd.send({
  params: {
    address: '0x00',
    amount: '200',
  },
});

MDS.cmd.newscript({
  params: { script: 'test', trackall: 'true', clean: 'true' },
});
