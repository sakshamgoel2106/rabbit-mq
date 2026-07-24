import { connectionRabbitMQ } from '../config/rabbit.js';

async function run() {
    const { connection, channel } = await connectionRabbitMQ();
    const exchange = 'college.documents';
    
    await channel.assertExchange(exchange, 'headers', { durable: true });

    const documents = [
        { msg: 'Student ID Card', headers: { department: 'CSE', year: 3 } },
        { msg: 'Exam Hall Ticket', headers: { department: 'ECE', year: 4 } }
    ];

    documents.forEach(({ msg, headers }) => {
        channel.publish(exchange, '', Buffer.from(msg), { headers });
        console.log(`Published: ${msg}`);
    });
    setTimeout(() => connection.close(), 500);
}
run();