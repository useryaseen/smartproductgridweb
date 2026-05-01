import Button from '../ui/Button.jsx'
import Input from '../ui/Input.jsx'
import DropdownSelect from '../ui/DropdownSelect.jsx'

export default function ProductToolbar({
  search,
  onSearch,
  category,
  categories,
  onCategory,
  sort,
  onSort,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
}) {
  const categoryOptions = [{ value: '', label: 'All categories' }, ...categories.map((c) => ({ value: c, label: c }))]
  const sortOptions = [
    { value: 'price_asc', label: 'Price ↑' },
    { value: 'price_desc', label: 'Price ↓' },
    { value: 'rating_desc', label: 'Rating ↓' },
    { value: 'rating_asc', label: 'Rating ↑' },
  ]

  return (
    <section className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] sm:p-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <label className="mb-1 block text-xs font-medium text-slate-200">Search by title</label>
          <Input value={search} onChange={(e) => onSearch(e.target.value)} placeholder="e.g. backpack, jacket…" />
        </div>
        <div className="lg:col-span-3">
          <label className="mb-1 block text-xs font-medium text-slate-200">Category</label>
          <DropdownSelect value={category} options={categoryOptions} onChange={onCategory} />
        </div>
        <div className="lg:col-span-2">
          <label className="mb-1 block text-xs font-medium text-slate-200">Sort</label>
          <DropdownSelect value={sort} options={sortOptions} onChange={onSort} />
        </div>
        <div className="flex items-end gap-2 lg:col-span-2">
          <Button variant="subtle" onClick={onUndo} disabled={!canUndo} className="w-full">
            Undo
          </Button>
          <Button variant="subtle" onClick={onRedo} disabled={!canRedo} className="w-full">
            Redo
          </Button>
        </div>
      </div>
    </section>
  )
}
