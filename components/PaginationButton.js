export default function PaginationButton({ url, children, active, disabled=false }) {
  return (
    <a
      href={url}
      disabled={disabled}
    >
      <button
        className={
          "bg-cyan-500 p-2 px-5 text-xs rounded-md hover:bg-opacity-90 "
          + (disabled ? "!bg-opacity-10 cursor-not-allowed " : "")
          + (active ? "bg-opacity-100" : "bg-opacity-40")
        }
        disabled={disabled}
      >
        {children}
      </button>
    </a>
  )
}