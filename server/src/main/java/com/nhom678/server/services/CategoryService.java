package com.nhom678.server.services;

import com.nhom678.server.dto.request.category.CategoryCreationRequest;
import com.nhom678.server.dto.response.CategoryResponse;

import java.util.List;

public interface CategoryService {
    CategoryResponse createCategory(CategoryCreationRequest request);
    CategoryResponse getCategoryByCategoryId(Integer categoryId);
    List<CategoryResponse> getAllCategory();
    void deleteCategoryByCategoryId(Integer categoryId);
}
