# 🎓 RabbitMQ College Event & Notification System

A robust, multi-topology messaging demonstration built with Node.js, `amqplib`, and ES6 syntax. This project simulates a college system routing real-time updates—such as student registration logs, campus-wide announcements, academic events, and department documents—across various RabbitMQ exchange patterns.


## 🏗️ Architecture Overview

The college messaging system handles diverse routing requirements using four primary RabbitMQ exchange types:

1. **Direct Exchange (`student.logs`):** Routes system logs based on exact log levels (`info`, `warning`, `error`).
2. **Fanout Exchange (`college.announcements`):** Broadcasts urgent public notices simultaneously across all campus portals.
3. **Topic Exchange (`college.events`):** Filters domain events (`student.*`, `exam.*`, `library.*`) using wildcard pattern matching.
4. **Headers Exchange (`college.documents`):** Routes administrative documents based on custom header attributes (`department`, `year`) instead of routing keys.


## 📁 Project Directory Structure

```text
rabbitmq-basic-assignment/
│
├── config/
│   └── rabbitmq.js              # RabbitMQ connection setup & log formatter
│
├── producer/
│   ├── directProducer.js        # Publishes student log messages
│   ├── fanoutProducer.js        # Broadcasts college announcements
│   ├── topicProducer.js         # Publishes module-specific domain events
│   └── headersProducer.js       # Publishes department documents with headers
│
├── consumers/
│   ├── direct/
│   │   └── directConsumers.js   # Listens to student logs (Info/Warn vs Error)
│   ├── fanout/
│   │   └── fanoutConsumers.js   # Listens to announcements (Student/Faculty/Admin)
│   ├── topic/
│   │   └── topicConsumers.js    # Listens to module-bound topic wildcards
│   └── headers/
│       └── headersConsumers.js  # Listens to document routes by header rules
│
├── package.json                 # Dependencies and execution scripts
└── README.md                    # Project documentation