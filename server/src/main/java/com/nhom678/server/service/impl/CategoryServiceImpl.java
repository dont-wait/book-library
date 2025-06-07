package com.nhom678.server.service.impl;

import com.nhom678.server.dto.request.category.CategoryCreationRequest;
import com.nhom678.server.dto.request.category.CategoryUpdateRequest;
import com.nhom678.server.dto.response.CategoryResponse;
import com.nhom678.server.entity.Category;
import com.nhom678.server.exception.AppException;
import com.nhom678.server.enums.ErrorCode;
import com.nhom678.server.mapper.CategoryMapper;
import com.nhom678.server.repositories.CategoryRepository;
import com.nhom678.server.service.CategoryService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    CategoryRepository categoryRepository;
    CategoryMapper categoryMapper;

    @Override
    public CategoryResponse createCategory(CategoryCreationRequest request) {
        if(categoryRepository.existsCategoryByCategoryName(request.getCategoryName()))
            throw new AppException(ErrorCode.CATEGORYNAME_EXISTED);
        Category category = categoryMapper.toCategory(request);
        return categoryMapper.toCategoryResponse(categoryRepository.save(category));
    }

    @Override
    public CategoryResponse getCategoryByCategoryId(Integer categoryId) {
        Optional<Category> category = categoryRepository.findCategoryByCategoryId(categoryId);
        if(category.isEmpty())
            throw new AppException(ErrorCode.CATEGORYNAME_NOT_FOUND);
        return categoryMapper.toCategoryResponse(category.get());
    }

    @Override
    public List<CategoryResponse> getAllCategory() {
        return categoryRepository.findAll()
                .stream()
                .map(categoryMapper::toCategoryResponse)
                .toList();
    }

    @Override
    @Transactional
    public void deleteCategoryByCategoryId(Integer categoryId) {
        if(categoryRepository.findCategoryByCategoryId(categoryId).isEmpty())
            throw new AppException(ErrorCode.CATEGORYNAME_NOT_FOUND);
        categoryRepository.deleteCategoryByCategoryId(categoryId);
    }

    @Override
    public CategoryResponse updateCategory(Integer categoryId, CategoryUpdateRequest request) {
        Category categoryUpdate = categoryRepository.findCategoryByCategoryId(categoryId)
                .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_ID_NOT_FOUND));
        categoryMapper.updateCategory(categoryUpdate, request);
        return categoryMapper.toCategoryResponse(categoryRepository.save(categoryUpdate));
    }

}
