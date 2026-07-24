import { connectionRabbitMQ } from "../config/rabbit.js";

async function run(){
    const {connection , channel} = await connectionRabbitMQ();
    const exchange = 'student.logs';
    await channel.assertExchange(exchange , 'direct' , {durable : true});

    const logs = [
        {key: 'info' , msg:'student registered sucessfully'},
        {key: 'warning' , msg:'attendence marked sucessfully'},
        {key: 'error' , msg:'failed to generate admit card'},
    ];

    logs.forEach(({key,msg}) => {
        channel.publish(exchange , key , Buffer.from(msg));
        console.log(`published [${key}] : ${msg}`);
    });
    setTimeout(() =>connection.close(),500);
}
run();