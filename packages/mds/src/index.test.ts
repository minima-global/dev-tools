import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MDS, httpPostAsync } from './index';
const mockXHR = {
  open: vi.fn(),
  send: vi.fn(),
  readyState: 4,
  responseText: JSON.stringify({ success: true }),
  status: 200,
  onreadystatechange: null as unknown as () => void,
};
beforeEach(() => {
  vi.resetAllMocks();
});

describe('MDS functions ', () => {
  it('should call callback function', () => {
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
  });

  it('should correctly simulate a POST XMLHttpRequest and trigger the callback on readyState change', () => {
    window.XMLHttpRequest = vi.fn(() => mockXHR) as unknown as {
      new (): XMLHttpRequest;
      prototype: XMLHttpRequest;
      readonly UNSENT: 0;
      readonly OPENED: 1;
      readonly HEADERS_RECEIVED: 2;
      readonly LOADING: 3;
      readonly DONE: 4;
    };

    const url = 'https://example.com/api/data';
    const params = { key1: 'value1', key2: 'value2' };
    const callback = vi.fn();
    httpPostAsync(url, params, callback);

    mockXHR.onreadystatechange = callback;
    mockXHR.onreadystatechange();

    expect(mockXHR.open).toHaveBeenCalled();
    expect(mockXHR.open).toHaveBeenCalledWith(
      'POST',
      MDS.mainhost + url + '?uid=' + MDS.minidappuid,
      true,
    );
    expect(mockXHR.send).toHaveBeenCalled();

    expect(callback).toHaveBeenCalled();
  });
});
