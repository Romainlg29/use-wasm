import { useEffect, useState } from 'react';

export interface useWasmReturn<T> {
	fn: T;
	isLoading: boolean;
	module: WebAssembly.Module;
	instance: WebAssembly.Instance;
}

export interface useWasmOptions {
	/**
	 * Streaming instantiation
	 * Make sure that the server returns the correct MIME type to enable this.
	 * @default false
	 */
	streaming?: boolean;

	/**
	 * Fetch options
	 * @default undefined
	 */
	fetchOptions?: RequestInit;
}

/**
 * Hook to load a wasm file and use it.
 * @param path Path to the wasm file
 * @param options Options
 * @returns The wasm exports
 */
export const useWasm = <T>(path: string, options?: useWasmOptions) => {
	/**
	 * Hook state
	 */
	const [wasm, setWasm] = useState<useWasmReturn<T>>({
		isLoading: true,
		fn: {} as T,
		module: {} as WebAssembly.Module,
		instance: {} as WebAssembly.Instance,
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
			 * Set the exports as the function
			 */
			setWasm({
				isLoading: false,
				fn: exports,
				module: wa.module,
				instance: wa.instance,
			});
		})();

		return () => {
			/**
			 * Clean up
			 */
			controller.abort();
		};
	}, [path, options]);

	return wasm;
};
