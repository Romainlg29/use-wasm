import { useEffect, useState } from 'react';

export interface useWasmReturn<T> {
	fn: T;
	isLoading: boolean;
}

export const useWasm = <T>(
	path: string,
	options?: {
		streaming?: boolean;
		fetchOptions?: RequestInit;
	}
) => {
	/**
	 * Hook state
	 */
	const [wasm, setWasm] = useState<useWasmReturn<T>>({
		isLoading: true,
		fn: {} as T,
	});

	useEffect(() => {
		if (!path) {
			throw new Error('Path is required');
		}

		/**
		 * Abort controller
		 */
		const controller = new AbortController();

		/**
		 * Load the wasm file
		 */
		setWasm((p: useWasmReturn<T>) => ({
			...p,
			isLoading: true,
		}));

		const fns: Promise<T> = new Promise((resolve) => {
			(async () => {
				/**
				 * Fetch the wasm file
				 */
				const file = await fetch(path, {
					signal: controller.signal,
					...options?.fetchOptions,
					headers: {
						...options?.fetchOptions?.headers,
						'Content-Type': 'application/wasm',
					},
				});

				if (!file.ok) {
					throw new Error(`Failed to fetch the WASM file: ${file.statusText}`);
				}

				/**
				 * Instantiate the wasm file
				 */
				let wa: WebAssembly.WebAssemblyInstantiatedSource;

				if (options?.streaming) {
					/**
					 * Streaming instantiation
					 */
					wa = await WebAssembly.instantiateStreaming(file);
				} else {
					/**
					 * Buffer instantiation
					 */
					const buffer = await file.arrayBuffer();
					wa = await WebAssembly.instantiate(buffer);
				}

				/**
				 * Force the type of the exports to T
				 */
				const exports: T = wa.instance.exports as T;

				/**
				 * Resolve the promise
				 * @param exports The exports of the wasm file
				 */
				resolve(exports);
			})();
		});

		fns.then((exports: T) => {
			/**
			 * Set the exports as the function
			 */
			setWasm({
				isLoading: false,
				fn: exports,
			});
		});

		return () => {
			/**
			 * Clean up
			 */
			controller.abort();
		};
	}, [path, options]);

	return wasm;
};
