package com.nhom678.server.services.impl;

import com.nhom678.server.dto.request.category.CategoryCreationRequest;
import com.nhom678.server.dto.response.CategoryResponse;
import com.nhom678.server.entity.Category;
import com.nhom678.server.exceptions.AppException;
import com.nhom678.server.enums.ErrorCode;
import com.nhom678.server.mapper.CategoryMapper;
import com.nhom678.server.repositories.CategoryRepository;
import com.nhom678.server.services.CategoryService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
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
    @PreAuthorize("hasAnyRole('ADMIN', 'LIBRARIAN')")
    public CategoryResponse createCategory(CategoryCreationRequest request) {
        if(categoryRepository.existsCategoryByCategoryName(request.getCategoryName()))
            throw new AppException(ErrorCode.CATEGORYNAME_EXISTED);
        Category category = categoryMapper.toCategory(request);
        return categoryMapper.toCategoryResponse(categoryRepository.save(category));
    }

    @Override
    @PreAuthorize("hasAnyRole('ADMIN', 'LIBRARIAN', 'MEMBER')")
    public CategoryResponse getCategoryByCategoryId(Integer categoryId) {
        Optional<Category> category = categoryRepository.findCategoryByCategoryId(categoryId);
        if(category.isEmpty())
            throw new AppException(ErrorCode.CATEGORYNAME_NOT_FOUND);
        return categoryMapper.toCategoryResponse(category.get());
    }

    @Override
    @PreAuthorize("hasAnyRole('ADMIN', 'LIBRARIAN', 'MEMBER')")
    public List<CategoryResponse> getAllCategory() {
        return categoryRepository.findAll()
                .stream()
                .map(categoryMapper::toCategoryResponse)
                .toList();
    }

    @Override
    @Transactional
    @PreAuthorize("hasAnyRole('ADMIN', 'LIBRARIAN')")
    public void deleteCategoryByCategoryId(Integer categoryId) {
        if(categoryRepository.findCategoryByCategoryId(categoryId).isEmpty())
            throw new AppException(ErrorCode.CATEGORYNAME_NOT_FOUND);
        categoryRepository.deleteCategoryByCategoryId(categoryId);
    }


}
