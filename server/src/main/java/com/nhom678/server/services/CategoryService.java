package com.nhom678.server.services;

import com.nhom678.server.dto.request.category.CategoryCreateRequest;
import com.nhom678.server.dto.response.CategoryResponse;

import java.util.List;

public interface CategoryService {
    CategoryResponse createCategory(CategoryCreateRequest request);
    CategoryResponse getCategoryByName(String categoryName);
    List<CategoryResponse> getAllCategory();
    void deleteCategory(String categoryName);
}
