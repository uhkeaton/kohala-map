import { Hono } from 'hono';
import { WebSocketHibernationServer } from './durable-object';
export { WebSocketHibernationServer } from './durable-object';

/**
 * Following tutorial:
 * https://www.youtube.com/watch?v=FgWVoryZ8PU&t=445s
 */

// https://hono.dev/docs/getting-started/cloudflare-workers

type Bindings = {
	WEBSOCKET_HIBERNATION_SERVER: DurableObjectNamespace<WebSocketHibernationServer>;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get('/', (c) => c.text('Hello World!'));

app.get('/ws', (c) => {
	// get the room code from the url
	const roomCode = c.req.query('code');

	const upgradeHeader = c.req.header('Upgrade');
	if (!upgradeHeader || upgradeHeader != 'websocket') {
		return c.text('Expected Websocket', 400);
	}
	if (!roomCode) {
		return c.text('Missing room id', 400);
	}
	const id = c.env.WEBSOCKET_HIBERNATION_SERVER.idFromName(roomCode);
	const stub = c.env.WEBSOCKET_HIBERNATION_SERVER.get(id);
	return stub.fetch(c.req.raw);
});

export default app;
