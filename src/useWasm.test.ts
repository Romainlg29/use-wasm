// @ts-nocheck - no types for testing
import { renderHook } from '@testing-library/react';
import fetch from 'jest-fetch-mock';
import { useWasm } from './useWasm';

fetch.enableMocks();

describe('useWasm', () => {
	beforeEach(() => {
		jest.clearAllMocks();

		fetch.mockResponse(async (request) => {
			if (request.url.endsWith('compute.wasm')) {
				return {
					url: request.url,
					status: 200,
					ok: true,
					body: 'test',
				} as Response;
			} else {
				return {
					url: request.url,
					status: 404,
					ok: false,
					statusText: 'Not Found',
				} as Response;
			}
		});
	});

	it('should throw an error if no path has been provided.', () => {
		expect(() => renderHook(() => useWasm(''))).toThrowError('Path is required');
	});

	// @ts-expect-error - path is required
	/*it('should throw an error if path is not correct.', async () => {

		const {
			result,
		} = renderHook(() => useWasm('path.to.png'));

		expect(result.error!.message).toBe('Failed to fetch the WASM file: Not Found');
	});*/
});
