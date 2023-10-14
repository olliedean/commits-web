'use client';

import CommitItem from "@/components/CommitItem";
import PaginationButton from "@/components/PaginationButton";
import moment from "moment";
import useSWR from "swr";

export default function Home({searchParams}) {
  var p = parseInt(searchParams.p || 1);

  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const commits = useSWR(`/api/fetchAll?p=${p}`, fetcher)
  const first_commit = useSWR(`/api/fetchFirst`, fetcher)

  if (!commits.data) return <div>Loading...</div>
  if (!first_commit.data) return <div>Loading...</div>

  console.log(commits.data.total_count);


  console.log(first_commit.data.url);
  var cph = commits.data.total_count / moment(first_commit.data.commit.author.date).diff(moment(), 'hours')
  cph = Math.round(cph * 100) / 100

  var availablePages = Math.ceil(commits.data.total_count / 20);

  return (
    <>
      <h1 className="text-lg font-black">
        {commits.data.total_count} commits
        {' '}
        over {moment(first_commit.data.commit.author.date).fromNow(true)}
        {' '}
        - {cph}cph!
      </h1>
      <div className="h-64 flex flex-row gap-2 my-4">
        {[...Array(36)].map((x, i) =>
          <div key={i} className="h-full bg-black flex-grow bg-opacity-10"></div>
        )}
      </div>
      <div className="flex justify-between mb-6">
        <div className="flex gap-2">
          {[...Array(availablePages)].map((x, i) =>
            <PaginationButton
              key={i}
              url={`/?p=${i + 1}`}
              active={i + 1 == p}
            >
              {i + 1}
            </PaginationButton>
          )}
        </div>
        <div className="flex gap-2">
          {p > 1 ? (
            <PaginationButton url={`/?p=${p - 1}`}>⮜</PaginationButton>
          ) : (
            <PaginationButton url={`/?p=${p - 1}`} disabled>⮜</PaginationButton>
          )}
          <PaginationButton url={`/?p=${p + 1}`}>⮞</PaginationButton>
        </div>
      </div>
      {commits.data.items.map(commit => (
        <CommitItem key={commit.sha} commit={commit} />
      ))}
    </>
  )
}
