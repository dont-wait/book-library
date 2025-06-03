import React from "react";

interface Category {
    id: number;
    name: string;
}

interface CategorySidebarProps {
    categories: Category[];
    selectedCategory: string;
    onSelectCategory: (id: string) => void;
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({
    categories,
    selectedCategory,
    onSelectCategory,
}) => {
    return (
        <div className="sticky-top" style={{ top: "80px" }}>
            <h5 className="mb-3">Lọc thể loại</h5>
            <ul className="list-group">
                <li
                    className={`list-group-item list-group-item-action ${selectedCategory === "" ? "active" : ""}`}
                    style={{ cursor: "pointer" }}
                    onClick={() => onSelectCategory("")}
                >
                    Tất cả thể loại
                </li>

                {categories.map((cat) => (
                    <li
                        key={cat.id}
                        className={`list-group-item list-group-item-action ${selectedCategory === cat.id.toString() ? "active" : ""}`}
                        style={{ cursor: "pointer" }}
                        onClick={() => onSelectCategory(cat.id.toString())}
                    >
                        {cat.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategorySidebar;
