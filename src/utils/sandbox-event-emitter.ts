import { tryJsonParse } from '.';

const $sandbox: HTMLIFrameElement = document.getElementById(
  'f12-sandbox'
) as HTMLIFrameElement;

export function formatCss(content: string) {
  const state = Date.now();
  const event = {
    eventType: 'formatCss',
    inputs: [content],
    state,
  };
  console.log('css');

  return new Promise<string>((resolve, reject) => {
    const listener = (evt: MessageEvent) => {
      const data = tryJsonParse(evt.data);
      console.log('data in parent', data, evt.data);

      if (data.state !== state) {
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
