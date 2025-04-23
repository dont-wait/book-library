package com.nhom678.server.repositories;

import com.nhom678.server.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
    Boolean existsCategoryByCategoryName(String name);
    void deleteCategoryByCategoryName(String name);
    Optional<Category> findCategoryByCategoryName(String name);
}
