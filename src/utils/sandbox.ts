import prettier from 'prettier';
import CSSParser from 'prettier/parser-postcss';
import { tryJsonParse } from '.';

const eventProcessors = {
  formatCss,
};

type EventData = {
  eventType: 'formatCss';
  inputs: Parameters<typeof eventProcessors.formatCss>;
  state: number;
};

window.addEventListener('message', (evt) => {
  const data: EventData = tryJsonParse(evt.data);
  console.log('in child', evt, data);

  if (!data || !eventProcessors[data.eventType]) {
    return;
  }

  let response;
  switch (data.eventType) {
    case 'formatCss':
      response = eventProcessors.formatCss(...data.inputs);
      break;
    default:
      response = {
        error: true,
        message: 'No such event type',
      };
  }

  evt.source?.postMessage(JSON.stringify({ ...response, state: data.state }), {
    targetOrigin: '*',
  });
});

function formatCss(content: string) {
  try {
    return {
      error: false,
      formatted: prettier.format(content, {
        parser: 'css',
        plugins: [CSSParser],
      }),
    };
  } catch (ex: any) {
    return {
      error: true as const,
      message: ex.message,
    };
  }
}
