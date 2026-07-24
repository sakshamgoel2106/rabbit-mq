import {connectionRabbitMQ} from "../config/rabbit.js";

async function run(){
    const {connection , channel} = await connectionRabbitMQ();
    const exchange = 'college.announcements';
    await channel.assertExchange(exchange , 'fanout' , {durable : true});

    const announcements = [
        'College will remain closed tomorrow.',
        'Annual sports event starts next week.',
        'Semester results have been published.'
    ];

    announcements.forEach((msg)=>{
        channel.publish(exchange , '' , Buffer.from(msg));
        console.log(`published Announcements: ${msg}`);
    });
    setTimeout(() =>connection.close(),500);
}
run();