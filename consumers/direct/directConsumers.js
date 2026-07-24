import { connectionRabbitMQ, formatMessage } from "../../config/rabbit.js";

async function  run(){
    const {channel} = await connectionRabbitMQ();
    const exchange = 'student.logs';
    await channel.assertExchange(exchange , 'direct' , {durable : true});


    const qA = await channel.assertQueue('queueA' , {durable : true});
    await channel.bindQueue(qA.queue , exchange , 'info');
    await channel.bindQueue(qA.queue , exchange , 'warning');

    channel.consume(qA.queue , (msg) => {
        if (msg){
        console.log(formatMessage('queueA' , 'direct' , msg.content.toString()));
        channel.ack(msg);}
    });

    const qB = await channel.assertQueue('queueB' , {durable : true});
    await channel.bindQueue(qB.queue , exchange , 'error');

    channel.consume(qB.queue , (msg) => {
        if (msg){
        console.log(formatMessage('queueB' , 'direct' , msg.content.toString()));
        channel.ack(msg);}
    });
}

run();