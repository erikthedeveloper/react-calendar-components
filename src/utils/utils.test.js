import { range, chunk } from './utils';

describe('utils#range', () => {
  it('produces range of integers from range(start, end)', () => {
    expect(range(0, 3)).toEqual([0, 1, 2]);
    expect(range(2, 5)).toEqual([2, 3, 4]);
  });

  it('produces range with single argument range(size)', () => {
    expect(range(3)).toEqual([0, 1, 2]);
    expect(range(5)).toEqual([0, 1, 2, 3, 4]);
  });
});

describe('utils#chunk', () => {
  it('chunks an array into n-length sub arrays', () => {
    expect(
      chunk([1, 2, 3, 4, 5], 2)
    ).toEqual(
      [[1, 2], [3, 4], [5]]
    );

    expect(
      chunk([1, 2, 3], 4)
    ).toEqual(
      [[1, 2, 3]]
    );

    expect(
      chunk([], 2)
    ).toEqual(
      []
    );
  });
});
