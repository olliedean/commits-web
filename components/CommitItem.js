import moment from "moment/moment"
import Image from "next/image"

export default function CommitItem({ commit }) {
  if (!commit) return null
  if (!commit.author) return null
  var commit_id = commit.commit.tree.sha.slice(0, 7);
  console.log(commit.commit)
  
  return (
    <div className="mb-2 py-4">
      <div className="flex gap-3">
        <div className="flex gap-3 flex-shrink-0">
          <div className="text-sm text-right w-32 leading-[1rem] pt-1">
            <a href={"/u/" + commit.author.login} className="hover:text-blue-300 font-bold text-cyan-500">
              {commit.author.login}
            </a>
            <br />
            <span className="text-gray-400 text-xs" title={moment(commit.commit.author.date).format('DD-MM-YYYY HH:mm:ss')}>
              {moment(commit.commit.author.date).fromNow()}
            </span>
          </div>
          <Image
            src={commit.author.avatar_url}
            alt={commit.author.login}
            width={64}
            height={64}
            className="rounded-md"
          />
        </div>
        <div className="flex-grow">
          <div className="breadcrumb font-bold text-sm">
            <a href={"/r/" + commit.repository.name} className="hover:text-white text-emerald-500">
            {commit.repository.name}
            </a>
            <a href={"/c/" + commit_id} className="hover:text-white text-cyan-500">
              #
              {commit_id}
            </a>
          </div>
          <div className="text-xs">
            {commit.commit.message}
          </div>
        </div>
      </div>
    </div>
  )
}
