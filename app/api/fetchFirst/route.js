import { NextResponse  } from "next/server";
import { Octokit } from "@octokit/rest";
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

export async function GET(request) {
  const first_commit = await octokit.search.commits({
    q: "org:lucidcool+author-date:>1999-01-01",
    sort: "author-date:asc",
    per_page: 1
  })
  return NextResponse.json(first_commit.data.items[0]);
}