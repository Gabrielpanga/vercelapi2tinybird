# Next.js API to Tinybird

The goal of this project is to track API requests into Tinybird data pipeline, providing an easy way for your users to understand their activity/logs from your API.

## Motivation

This is related to the [Live Session](https://www.tinybird.co/live-coding-sessions/realtime-activity-logs) for activity logs & usage for an application by Tinybird.

In this case I've implemented a decorator to track `server-side analytics` for api calls and get response times, status codes, path & method called.  
Request & responses payloads could be added for tracking porpouses, but for security reasons should be avoided unless ofuscated treated to avoid any GDPR conflicts.

For user's UI activity we are using Google Anayltics alternative tracking based on Tinybird's snippet provided on the live session.

## Setup

This is project was its a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Upstash

Upstash provide Serverless Kafka to easy configure your Event-Based architecture for you app.

1. Create an account in [Upstash](https://www.upstash.com/)
2. Create a Kafka application
3. Get the `@upstash/kafka` configuration and recover the variables `UPSTASH_KAFKA_REST_URL`, `UPSTASH_KAFKA_REST_USERNAME` & `UPSTASH_KAFKA_REST_PASSWORD`, and configure it on the `.env.local`.
4. Create a topic inside the Kafka application called `requests`.
5. Setup the project and start hitting the `/api/users` endpoints to create events on the topic.

### Tinybird

1. Create a [Tinybird](https://www.tinybird.co/) account, you can use the starter for google analytics.
2. Configure a new `DataSource` from Kafka, its super simple to connect with your existing `Upstash` kafka topic.
3. Setup the Bootstrap URL, Username & Password using `SCRAM-SHA-256`.
4. Select the topic that you created, and will automatically generate a schema based on the messages available in the topic.
5. Create a Pipe that will work as an API endpoint as well.

```sql
SELECT
 date,
 method,
 path,
 statusCode as "status_code",
 responseTime as "response_time",
 browser_name,
 os_name
FROM kafka_ds_523951
WHERE
  date >= today() - interval 7 day
  {% if defined(path) %}
    path = {{String(path)}}
  {% end %}
ORDER BY {{column(order_by, 'date')}} desc
LIMIT {{Int32(page_size, 100)}}
OFFSET {{Int32(page, 0) * Int32(page_size, 100)}}
```

6. Configure the `TINYBIRD_URL` & `TINYBIRD_TOKEN` on your local environment.  
   **NOTE**: Even though Tinybird can configure token's per customer, you could also recover specific user's parameters (`user_id` from authentication) on `/api/requests` and provide it directly from the backend as a query parameter.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
