import Button from "./Button"

const Navbar = () => {
  return (
    <header
      className="bg-slate-300 px-4 fixed inset-x-0 shadow-md"
    >
      <div
        className="max-w-[1200px] mx-auto h-[75px] flex items-center justify-between"
      >
        <h2 className="text-2xl font-semibold">
          Squad14
        </h2>

        <Button
          className="bg-green-600 hover:bg-green-500"
        >
          Criar
        </Button>

      </div>
    </header>
  )
}

export default Navbar