import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, ChevronDown, Check } from "lucide-react";
import { Input } from "@/components/ui/input";

interface BlogSearchFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  categories: string[]; // ← passed from parent (derived from API data)
}

const BlogSearchFilter = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  categories,
}: BlogSearchFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [categorySearch, setCategorySearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCategories = categories.filter((cat) =>
    cat.toLowerCase().includes(categorySearch.toLowerCase()),
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="mb-10 max-w-[1280px] mx-auto px-4 xs:px-5 sm:px-6 md:px-5"
    >
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-card border border-border rounded-[14px] p-4 sm:p-5">
        {/* Search Input */}
        <div className="relative w-full md:flex-1 md:max-w-[480px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="text"
            placeholder="Search by title, keyword, or tag..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-11 bg-background border-border text-[0.875rem] focus-visible:ring-primary/20 focus-visible:border-primary/50 transition-colors w-full"
          />
        </div>

        {/* Category Dropdown */}
        <div className="relative w-full md:w-[280px]" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full h-11 px-4 bg-background border border-border rounded-md flex items-center justify-between text-[0.875rem] text-foreground hover:border-primary/40 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
          >
            <span className="truncate pr-2">
              {selectedCategory ? selectedCategory : "All Articles"}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-muted-foreground transition-transform duration-200 shrink-0 ${isOpen ? "rotate-180" : ""}`}
            />
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute z-50 top-full mt-2 w-full bg-card border border-border rounded-xl shadow-lg overflow-hidden flex flex-col"
              >
                {/* Internal search */}
                <div className="p-2 border-b border-border bg-background/50">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground w-3.5 h-3.5" />
                    <input
                      type="text"
                      placeholder="Find category..."
                      value={categorySearch}
                      onChange={(e) => setCategorySearch(e.target.value)}
                      className="w-full h-9 pl-8 pr-3 text-[0.8125rem] bg-background border border-border rounded-md focus:outline-none focus:border-primary/50 text-foreground"
                    />
                  </div>
                </div>

                <div className="max-h-[240px] overflow-y-auto p-1 py-1.5 scrollbar-thin">
                  {/* All Articles */}
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setIsOpen(false);
                      setCategorySearch("");
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-[0.875rem] rounded-md transition-colors ${
                      selectedCategory === null
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    All Articles
                    {selectedCategory === null && <Check className="w-4 h-4" />}
                  </button>

                  {filteredCategories.length > 0 ? (
                    filteredCategories.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category);
                          setIsOpen(false);
                          setCategorySearch("");
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-[0.875rem] rounded-md transition-colors mt-0.5 ${
                          selectedCategory === category
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        <span className="truncate pr-2 text-left">
                          {category}
                        </span>
                        {selectedCategory === category && (
                          <Check className="w-4 h-4 shrink-0" />
                        )}
                      </button>
                    ))
                  ) : (
                    <div className="px-3 py-4 text-center text-[0.8125rem] text-muted-foreground">
                      No categories found.
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogSearchFilter;
