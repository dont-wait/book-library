package com.nhom678.server.controllers;

import com.nhom678.server.dto.ApiResponse;
import com.nhom678.server.dto.request.category.CategoryCreateRequest;
import com.nhom678.server.dto.response.CategoryResponse;
import com.nhom678.server.services.CategoryService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/categories")
public class CategoryController {

    CategoryService categoryService;
    @GetMapping
    ApiResponse<List<CategoryResponse>> getAllCategory() {
        return ApiResponse.<List<CategoryResponse>>builder()
                .result(categoryService.getAllCategory())
                .message("Success")
                .build();
    }

    @PostMapping
    ApiResponse<CategoryResponse> createCategory(@Valid @RequestBody CategoryCreateRequest request) {
        return ApiResponse.<CategoryResponse>builder()
                .result(categoryService.createCategory(request))
                .message("Success")
                .build();
    }

    @DeleteMapping("/{categoryName}")
    ApiResponse<String> deletePublisher(@PathVariable String categoryName) {
        categoryService.deleteCategory(categoryName);
        return ApiResponse.<String>builder()
                .result("Category successfully deleted")
                .message("Success")
                .build();
    }

}
