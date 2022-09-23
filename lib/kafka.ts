import { Kafka } from '@upstash/kafka'

const {
  UPSTASH_KAFKA_REST_URL = '',
  UPSTASH_KAFKA_REST_USERNAME = '',
  UPSTASH_KAFKA_REST_PASSWORD = '',
} = process.env

const kafka = new Kafka({
  url: UPSTASH_KAFKA_REST_URL,
  username: UPSTASH_KAFKA_REST_USERNAME,
  password: UPSTASH_KAFKA_REST_PASSWORD,
})

export const kafkaProducer = kafka.producer()
