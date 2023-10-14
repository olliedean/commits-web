export default function Header() {
  return (
    <header className="bg-black bg-opacity-20">
      <div className="max-w-4xl mx-auto flex justify-between">
        <div className="text-xl font-bold p-3">
          <a href="/" className="hover:text-blue-300">
            lucidcool commits
          </a>
        </div>
        <button type="button" className="bg-white bg-opacity-0 px-2 hover:bg-opacity-10">Log in</button>
      </div>
    </header>
  )
}