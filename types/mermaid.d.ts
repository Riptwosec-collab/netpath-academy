// Minimal declaration so TypeScript doesn't error on dynamic import of mermaid
declare module "mermaid" {
  interface MermaidConfig {
    startOnLoad?: boolean;
    theme?: string;
    themeVariables?: Record<string, string | boolean>;
  }
  interface RenderResult {
    svg: string;
  }
  interface MermaidAPI {
    initialize(config: MermaidConfig): void;
    render(id: string, text: string): Promise<RenderResult>;
  }
  const mermaid: MermaidAPI;
  export default mermaid;
}
