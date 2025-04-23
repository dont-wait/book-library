package com.nhom678.server.services;

import com.nhom678.server.dto.request.category.CreateCategoryRequest;
import com.nhom678.server.dto.request.category.UpdateCategoryRequest;
import com.nhom678.server.dto.response.CategoryResponse;
import com.nhom678.server.entity.Category;

import java.util.List;

public interface CategoryService {
    CategoryResponse createCategory(CreateCategoryRequest request);
    CategoryResponse getCategoryByName(String categoryName);
    List<CategoryResponse> getAllCategory();
    void deleteCategory(String categoryName);
    CategoryResponse updateCategory(String categoryName, UpdateCategoryRequest request);
}
