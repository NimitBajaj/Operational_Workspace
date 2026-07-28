import SearchInput from "@/components/common/SearchInput";

export default function ProductFilters() {
    return (
        <div className="flex gap-4">

            <div className="flex-1">
                <SearchInput
                    value=""
                    onChange={() => {}}
                    placeholder="Search by product name..."
                />
            </div>

            <select className="rounded-xl border px-4">

                <option>
                    All Categories
                </option>

            </select>

            <select className="rounded-xl border px-4">

                <option>
                    Latest
                </option>

                <option>
                    Price ↑
                </option>

                <option>
                    Price ↓
                </option>

            </select>

        </div>
    );
}
