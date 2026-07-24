import {connectionRabbitMQ , formatMessage} from "../../config/rabbit.js";

async function run(){
    const {channel} = await connectionRabbitMQ();
    const exchange = 'college.announcements';
    await channel.assertExchange(exchange , 'fanout' , {durable : true});

    const portals = ['student portal' , 'faculty portal' , 'admin portal'];

    for(const portal of portals){
        const queueName = `fanout_${portal.replace(/\s+/g , '_').toLowerCase()}`;
        const q = await channel.assertQueue(queueName , {durable : true});

        await channel.bindQueue(q.queue , exchange , '');

        channel.consume(q.queue , (msg) => {
            if (msg){
            console.log(formatMessage(portal , 'fanout' , msg.content.toString()));
            channel.ack(msg);}
        });
    }



}

run();