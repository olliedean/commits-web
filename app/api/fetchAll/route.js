import { NextResponse  } from "next/server";
import { Octokit } from "@octokit/rest";
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

export async function GET(request) {
  const commits = await octokit.search.commits({
    q: "org:lucidcool+author-date:>1999-01-01",
    sort: "author-date",
    per_page: 20,
    page: request.nextUrl.searchParams.get("p")
  })
  return NextResponse.json(commits.data);
}