/// <reference types="next" />
/// <reference types="next/image-types/global" />

declare module "*.mdx" {
  import type { ComponentType } from "react";
  const Component: ComponentType;
  export default Component;
  export const meta: Record<string, unknown>;
}
