import amqp from 'amqplib';

export const connectionRabbitMQ = async () => {
    try{
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        return {connection, channel} ;
    }catch(error){
        console.log("rabbitmq connection error",error);
        process.exit(1);
    }
};

export const formatMessage = (consumer , exchange , content) => {
    return `[${new Date().toISOString()}] [${exchange}] [${consumer}] Received: ${content}`;
};