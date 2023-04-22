// @ts-nocheck - no types for testing
import { renderHook } from '@testing-library/react';
import { useWasm } from './useWasm';

global.fetch = jest.fn();

describe('useWasm', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	// @ts-expect-error - path is required
	it('should throw an error if path is not correct.', () => {
		expect(() => renderHook(() => useWasm())).toThrowError();
	});
});
