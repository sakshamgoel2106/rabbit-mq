import { connectionRabbitMQ, formatMessage } from "../../config/rabbit.js";

async function run() {
    const { channel } = await connectionRabbitMQ();
    const exchange = 'college.events';
    await channel.assertExchange(exchange, 'topic', { durable: true });

    const modules = [
        { name: 'student Module', pattern: 'student.*' },
        { name: 'Exam Module', pattern: 'exam.*' },
        { name: 'Library Module', pattern: 'library.*' },
        { name: 'Audit Module', pattern: '#' },
    ];

    for (const mod of modules) {
        const queueName = `${mod.name.replace(/\s+/g, '_').toLowerCase()}`;
        const q = await channel.assertQueue(queueName, { durable: true });

        await channel.bindQueue(q.queue, exchange, mod.pattern);

        channel.consume(q.queue, (msg) => {
            if (msg) {
                console.log(formatMessage(mod.name, 'topic', msg.content.toString()));
                channel.ack(msg);
            }
        });
    }
}
run();
