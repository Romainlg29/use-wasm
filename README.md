# use-wasm-ts

Use WebAssembly in React in a simple way with hooks and Typescript!

```bash
npm install use-wasm-ts
```

This package allows you to load and use your WebAssembly functions inside React easily.

## Usage

```jsx
import { FC } from 'react';
import { useWasm } from '...';

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
