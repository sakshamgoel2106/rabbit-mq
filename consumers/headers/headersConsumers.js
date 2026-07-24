import { connectionRabbitMQ, formatMessage } from '../../config/rabbit.js';

async function run() {
    const { channel } = await connectionRabbitMQ();
    const exchange = 'college.documents';
    await channel.assertExchange(exchange, 'headers', { durable: true });

    const departments = ['CSE', 'ECE'];

    for (const dept of departments) {
        const queueName = `headers_${dept.toLowerCase()}`;
        const q = await channel.assertQueue(queueName, { durable: true });

        await channel.bindQueue(q.queue, exchange, '', {
            'x-match': 'all',
            'department': dept
        });

        channel.consume(q.queue, (msg) => {
            if (msg) {
                console.log(formatMessage(`${dept} Department`, 'Headers', msg.content.toString()));
                channel.ack(msg);
            }
        });
    }
}
run();
