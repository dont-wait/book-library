package com.nhom678.server.service;

import com.nhom678.server.dto.request.category.CategoryCreationRequest;
import com.nhom678.server.dto.request.category.CategoryUpdateRequest;
import com.nhom678.server.dto.response.CategoryResponse;

import java.util.List;

public interface CategoryService {
    CategoryResponse createCategory(CategoryCreationRequest request);
    CategoryResponse getCategoryByCategoryId(Integer categoryId);
    List<CategoryResponse> getAllCategory();
    void deleteCategoryByCategoryId(Integer categoryId);
    CategoryResponse updateCategory(Integer categoryId, CategoryUpdateRequest request);
}
