# Bolt's Journal - Critical Performance Learnings

## 2026-03-05 - [High-Frequency Interaction Optimization in R3F & DOM Events]
**Learning:**
1. In React Three Fiber (R3F), passing dynamic interaction states (like mouse-hover states) as standard React props to multiple 3D subcomponents (e.g., 73 individual nodes and edges) triggers full React Virtual DOM render passes and diffing cycles for the entire sub-tree whenever the hover state changes. Since Three.js handles animations imperatively inside the `useFrame` render loop, we can store these high-frequency states in stable `useRef`s and wrap subcomponents in `React.memo`. This drops React re-renders on hover from dozens/hundreds per second to exactly 0, allowing GPU/ThreeJS to execute updates directly on WebGL meshes.
2. Unthrottled mousemove events fire at high device polling rates (up to 1000Hz on gaming peripherals), causing excessive main thread execution and layout style updates. Throttling these handlers using `requestAnimationFrame` guarantees updates execute at most once per screen refresh frame (60Hz-144Hz), preventing browser thread starvation.

**Action:**
1. For any complex R3F interactive scene, always store hover, scroll, or input states in stable refs instead of React states/props if they are read inside `useFrame`. Use `React.memo` to freeze React-level component trees.
2. Always wrap high-frequency DOM input/move listeners in `requestAnimationFrame` or throttle guards to prevent main thread layout bottlenecks.

## 2026-03-06 - [Next.js Image Optimization with Tailored Aspect Ratio Containers]
**Learning:**
In Next.js, local static assets located in `/public` loaded via basic HTML `<img>` tags generate heavy unoptimized image payloads and trigger ESLint layout shift warnings (LCP bottleneck). Replacing them with Next.js's `<Image>` component using `fill` within a positioned parent container (`relative`, `absolute`, etc.) combined with Tailwind's `object-cover` style ensures both excellent responsive scaling/WebP generation and zero cumulative layout shift (CLS).
**Action:**
Always prioritize Next.js `<Image>` with `fill` and specified responsive `sizes` attribute for hero and profile avatars inside flexible layout divs to optimize bandwidth, eliminate LCP issues, and preserve responsive visual layouts perfectly.
