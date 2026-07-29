import SearchInput from "@/components/common/SearchInput";

interface Props {
    search: string;
    setSearch: (value: string) => void;
}

export default function ProductFilters({
    search,
    setSearch,
}: Props) {
    return (
        <div className="flex gap-4">

            <div className="flex-1">
                <SearchInput
                    value={search}
                    onChange={setSearch}
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
