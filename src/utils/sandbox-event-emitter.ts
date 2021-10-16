import { tryJsonParse } from '.';

const $sandbox: HTMLIFrameElement = document.getElementById(
  'f12-sandbox'
) as HTMLIFrameElement;

export function formatCss(content: string, parser: 'css' | 'scss' | 'less') {
  const state = Date.now();
  const event = {
    eventType: 'formatCss',
    inputs: [content, parser],
    state,
  };

  return new Promise<string>((resolve, reject) => {
    const listener = (evt: MessageEvent) => {
      const data = tryJsonParse(evt.data);

      if (!data || data.state !== state) {
        return;
      }

      if (data.error) {
        reject(data.message);
      } else {
        resolve(data.formatted);
      }
      window.removeEventListener('message', listener);
    };
    window.addEventListener('message', listener);
    $sandbox.contentWindow?.postMessage(JSON.stringify(event), '*');
  });
}
