# Bolt's Journal - Critical Performance Learnings

## 2026-03-05 - [High-Frequency Interaction Optimization in R3F & DOM Events]
**Learning:**
1. In React Three Fiber (R3F), passing dynamic interaction states (like mouse-hover states) as standard React props to multiple 3D subcomponents (e.g., 73 individual nodes and edges) triggers full React Virtual DOM render passes and diffing cycles for the entire sub-tree whenever the hover state changes. Since Three.js handles animations imperatively inside the `useFrame` render loop, we can store these high-frequency states in stable `useRef`s and wrap subcomponents in `React.memo`. This drops React re-renders on hover from dozens/hundreds per second to exactly 0, allowing GPU/ThreeJS to execute updates directly on WebGL meshes.
2. Unthrottled mousemove events fire at high device polling rates (up to 1000Hz on gaming peripherals), causing excessive main thread execution and layout style updates. Throttling these handlers using `requestAnimationFrame` guarantees updates execute at most once per screen refresh frame (60Hz-144Hz), preventing browser thread starvation.

**Action:**
1. For any complex R3F interactive scene, always store hover, scroll, or input states in stable refs instead of React states/props if they are read inside `useFrame`. Use `React.memo` to freeze React-level component trees.
2. Always wrap high-frequency DOM input/move listeners in `requestAnimationFrame` or throttle guards to prevent main thread layout bottlenecks.

## 2026-03-06 - [Lag-Free Mouse Tracking with Stable Coordinate Throttling]
**Learning:**
1. When utilizing `requestAnimationFrame` to throttle high-frequency events like `mousemove` or `scroll`, reading event coordinates directly from the asynchronously fired callback is highly prone to coordinate lag. Because multiple events can fire inside a single paint frame, relying on the original event payload of the first triggered event paints the frame at a stale coordinate from the beginning of the frame rather than where the pointer currently resides.
2. Storing the latest coordinates in stable variables (or module-scoped state) synchronously on every event trigger and reading those coordinates inside the `requestAnimationFrame` render loop keeps coordinate tracking perfectly aligned with the screen paint cycles.

**Action:**
1. Always store the latest coordinates synchrony in stable local parameters (`latestX`, `latestY`) on event emission, and read those updated coordinates directly in the `requestAnimationFrame` rendering loop.

## 2026-03-07 - [Avoiding Layout Thrashing in High-Frequency Events]
**Learning:**
1. Querying layout-sensitive properties like `window.innerWidth` and `window.innerHeight` inside high-frequency event handlers like `mousemove` triggers synchronous reflow/layout thrashing because the browser has to calculate layout synchronously.
2. Caching these dimensions inside state or local variables during `resize` events and reading them from memory inside the `mousemove` event eliminates forced reflows, ensuring buttery smooth mouse interactive movements.

**Action:**
1. Cache layout properties (`window.innerWidth`, `window.innerHeight`) on load and during resize, and reference the cached values within performance-sensitive loops/event handlers.
