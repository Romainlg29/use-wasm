# use-wasm-ts

[![Version](https://img.shields.io/npm/v/use-wasm-ts?style=flat&colorA=000000&colorB=000000)](https://npmjs.com/package/use-wasm-ts)
![GitHub Workflow Status (with branch)](https://img.shields.io/github/actions/workflow/status/Romainlg29/use-wasm/basic.yml?branch=main&colorA=000000&colorB=000000)
![GitHub](https://img.shields.io/github/license/Romainlg29/use-wasm?&colorA=000000&colorB=000000)

Use WebAssembly in React in a simple way with hooks and Typescript!

```bash
npm install use-wasm-ts
```

This package allows you to load and use your WebAssembly functions inside React easily.

## Usage

```jsx
import { FC } from 'react';
import { useWasm } from 'use-wasm-ts';

const MyComponent: FC = () => {
    const {
        isLoading,
        fn: { compute },
    } = useWasm<{ compute: (n: number) => number }>('compute.wasm');

	return (
        <>
            <p>{isLoading ? "Loading..." : `Loaded with ${compute(10)}`}</p>
        </>
    );
};

export default MyComponent;
```


## API

### useWasm

```ts
useWasm<T>(url: string, options?: useWasmOptions): {
    isLoading: boolean;
    fn: T;
    module: WebAssembly.Module;
    instance: WebAssembly.Instance;
};
```

#### url

Type: `string`

The url of the WebAssembly file.

#### options

Type: `useWasmOptions`

###### streaming: `boolean` (default: `false`)
The streaming option allows you to load the WebAssembly file in streaming mode. Before using it, make sure that your server serves the file with the correct MIME type.

###### fetchOptions: `RequestInit` (default: `{}`)
The fetchOptions option allows you to pass options to the fetch function.


## License

MIT