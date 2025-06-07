import React from "react";
import { Category } from "../type";
import './CategorySidebar.css'

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
        <div className="category-sidebar sticky-top" style={{ top: "80px" }}>
            <h5 className="mb-3 category-sidebar-title">Lọc thể loại</h5>
            <ul className="list-group category-sidebar-list">
                <li
                    className={`list-group-item list-group-item-action ${selectedCategory === "" ? "active" : ""}`}
                    style={{ cursor: "pointer" }}
                    onClick={() => onSelectCategory("")}
                >
                    Tất cả thể loại
                </li>

                {categories.map((cat) => (
                    <li
                        key={cat?.categoryId || `category-${Math.random()}`}
                        className={`list-group-item list-group-item-action ${selectedCategory === (cat?.categoryId?.toString() || "") ? "active" : ""}`}
                        style={{ cursor: "pointer" }}
                        onClick={() => onSelectCategory(cat?.categoryId?.toString() || "")}
                    >
                        {cat?.categoryName || "Không có tên"}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategorySidebar;
