# Advent of Code 2021

## What?

- Advent of code solutions, written in typescript for usage on Deno.

## How?

### Binary

`vr build && ./entrypoint | gnomon`

### Tests

`deno test --watch --allow-all`

### Profiler

1. `deno run --inspect-brk --allow-all ./entrypoint.ts`
2. `chrome://inspect`
3. start profiling
4. stop profiling
5. quit process.
