package com.nhom678.server.mapper;

import com.nhom678.server.dto.request.category.CategoryCreationRequest;
import com.nhom678.server.dto.request.category.CategoryUpdateRequest;
import com.nhom678.server.dto.response.CategoryResponse;
import com.nhom678.server.entity.Category;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    CategoryResponse toCategoryResponse(Category category);
    Category toCategory(CategoryCreationRequest request);
    void updateCategory(@MappingTarget Category category, CategoryUpdateRequest request);
}
