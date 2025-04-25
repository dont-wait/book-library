package com.nhom678.server.mapper;

import com.nhom678.server.dto.request.category.CreateCategoryRequest;
import com.nhom678.server.dto.request.category.UpdateCategoryRequest;
import com.nhom678.server.dto.response.CategoryResponse;
import com.nhom678.server.entity.Category;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    CategoryResponse toCategoryResponse(Category category);
    Category toCategory(CreateCategoryRequest request);
   // CategoryResponse updateCategory(@MappingTarget Category category, UpdateCategoryRequest request);
}
