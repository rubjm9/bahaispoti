import { renderHook, act } from '@testing-library/react';
import useDebounce from '../../hooks/useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('test', 500));
    expect(result.current).toBe('test');
  });

  it('should debounce value changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'test', delay: 500 } }
    );

    expect(result.current).toBe('test');

    rerender({ value: 'updated', delay: 500 });
    expect(result.current).toBe('test'); // Should still be old value

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('updated');
  });

  it('should cancel previous timeout on new value', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'test', delay: 500 } }
    );

    rerender({ value: 'first', delay: 500 });
    act(() => {
      jest.advanceTimersByTime(200);
    });

    rerender({ value: 'second', delay: 500 });
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('second');
  });
});
