import { BiSearch } from "react-icons/bi";

function Search() {
  return (
    <div className="bg-white border-[1px] rounded-full shadow-sm hover:shadow-md transition py-1 cursor-pointer">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold px-6">Anywhere</div>
        <div className="text-sm font-semibold px-6 border-x-[1px] flex-1 hidden sm:block">
          Any Week
        </div>
        <div className="text-sm pl-6 pr-2 text-gray-600 flex items-center gap-3">
          <div className="hidden sm:block">Add Guests</div>

          <div className="bg-primary p-2 rounded-full text-white">
            <BiSearch />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
