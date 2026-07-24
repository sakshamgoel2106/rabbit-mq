import {connectionRabbitMQ} from "../config/rabbit.js";

async function run(){
    const {connection , channel} = await connectionRabbitMQ();
    const exchange = 'college.events';
    await channel.assertExchange(exchange , 'topic' , {durable : true});

    const events = [
        {key: 'student.registered' , msg:'student registered sucessfully'},
        {key: 'exam.created' , msg:'Midterm exam has scheduled'},
        {key: 'library.bookissued' , msg:'Advanced Novels has been issued'},
    ];

    events.forEach(({key,msg}) => {
        channel.publish(exchange , key , Buffer.from(msg));
        console.log(`published [${key}] : ${msg}`);
    });
    setTimeout(() =>connection.close(),500);
}
run();