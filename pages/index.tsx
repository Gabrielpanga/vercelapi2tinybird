import type { NextPage } from 'next'
import useSWR from 'swr'
import Head from 'next/head'
import Script from 'next/script'
import { toast } from 'react-toastify'

type RequestLog = {
  date: string
  path: string
  method: string
  status_code: string
  response_time: number
}

const Home: NextPage = () => {
  const { data, isValidating, mutate } = useSWR<RequestLog[]>('api/requests')

  const onGenerateNewRequest = () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }
    fetch('api/users', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error)
        } else {
          toast.success('Created a request')
          mutate()
        }
      })
  }

  if (isValidating) {
    return <div className="space-y-6">Loading...</div>
  }

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <button
        onClick={onGenerateNewRequest}
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <svg
          aria-hidden="true"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span className="sr-only">Generate a request</span>
      </button>

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">
              Date
            </th>
            <th>Path</th>
            <th>Status</th>
            <th>Response Time (s)</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((request: RequestLog) => {
              return (
                <tr
                  key={''}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td>{request.date}</td>
                  <td>{request.path}</td>
                  <td>{request.status_code}</td>
                  <td>{request.response_time}</td>
                </tr>
              )
            })}
        </tbody>
      </table>

      <Script
        defer
        src="https://unpkg.com/@tinybirdco/flock.js"
        data-host="https://api.us-east.tinybird.co"
        data-token="p.eyJ1IjogImNjZWRjOWUyLTcxZmQtNDQ4Yy1hZmRkLTQzYTI5ZTUyOTYwZCIsICJpZCI6ICI1OGQyY2E1Ni0xYTkxLTQ0YWYtOWNiMy0zMmUwYTcwNGE1NzYifQ.UyJ9OfLWwsf7Ks0_UfS4PmT0wIB9_yw3qxWPnuFbmXo"
      />
      <footer></footer>
    </div>
  )
}

export default Home