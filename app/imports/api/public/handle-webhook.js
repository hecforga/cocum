import { lambdaHandler } from './providers/lambda';

let modulee;

const providers = {
  lambda: lambdaHandler,
};

const handler = ({ provider, request }, promise) => {
  try {
    modulee = promise;
    const targetProvider = providers[provider];
    if (targetProvider) targetProvider({ body: request.body });
    modulee.resolve('Webhook received!');
  } catch (exception) {
    modulee.reject(`[handleWebhook.handler] ${exception}`);
  }
};

export const handleWebhook = (options) =>
  new Promise((resolve, reject) =>
    handler(options, { resolve, reject }));