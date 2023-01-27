export function Test(){
  return (
    <div className="h-screen flex justify-center items-center">
      <label htmlFor="" className="relative w-1/3 text-gray-800">
        <select
          className="w-full px-4 py-3  outline-none border-2 border-gray-400 rounded hover:border-gray-600 duration-200 peer focus:border-blue-600 focus:bg-white bg-white open:bg-green-500"
          name=""
          id=""
          value=""
          >
          {/* <option value="">Selecione</option> */}
        </select>
        <span
          className="absolute left-0 top-[.9em] px-1  tracking-wide peer-focus:text-blue-600 pointer-events-none duration-200 peer-focus:text-sm peer-focus:-translate-y-6 bg-white ml-2 peer-valid:text-sm peer-valid:-translate-y-6 peer-focus:bg-white text-gray-500"
          >
          Turma
        </span>
      </label>
    </div>
  )
}