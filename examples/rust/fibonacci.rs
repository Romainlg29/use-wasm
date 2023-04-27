use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn fibonacci(n: u32) -> u64 {
    let mut a = 0;
    let mut b = 1;

    for _ in 0..n {
        let c = a + b;
        a = b;
        b = c;
    }

    return a
}