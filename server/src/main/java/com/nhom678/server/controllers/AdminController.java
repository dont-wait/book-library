package com.nhom678.server.controllers;

import com.nhom678.server.dto.request.admin.AdminCreationRequest;
import com.nhom678.server.dto.request.admin.AdminUpdateRequest;
import com.nhom678.server.dto.response.AdminResponse;
import com.nhom678.server.dto.ApiResponse;
import com.nhom678.server.services.AdminService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admins")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AdminController {

    AdminService adminService;

//    @GetMapping("/all-info")
//    ApiResponse<List<UserResponse>> getAllUserInfo() {
//        return ApiResponse.<List<UserResponse>>builder()
//                .result()
//                .message("Success")
//                .build();
//    }

    @GetMapping
    ApiResponse<List<AdminResponse>> getAllAdmins() {
        return ApiResponse.<List<AdminResponse>>builder()
                .result(adminService.getAllAdmin())
                .message("Success")
                .build();
    }

    @PostMapping
    ApiResponse<AdminResponse> createAdmin(@Valid @RequestBody AdminCreationRequest request) {
        return ApiResponse.<AdminResponse>builder()
                .result(adminService.createAdmin(request))
                .message("Success")
                .build();
    }

    @GetMapping("/myInfo")
    ApiResponse<AdminResponse> getMyInfo() {
        return ApiResponse.<AdminResponse>builder()
                .result(adminService.getMyInfo())
                .message("Success")
                .build();
    }

    @GetMapping("/{adminId}")
    ApiResponse<AdminResponse> getAdminById(@PathVariable String adminId) {
        return ApiResponse.<AdminResponse>builder()
                .result(adminService.getAdminById(adminId))
                .message("Success")
                .build();
    }

    @PutMapping("/{adminId}")
    ApiResponse<AdminResponse> updateAdmin(@PathVariable String adminId,
                                          @Valid @RequestBody AdminUpdateRequest request) {
        return ApiResponse.<AdminResponse>builder()
                .result(adminService.updateAdmin(adminId, request))
                .message("Success")
                .build();
    }

    @DeleteMapping("/{adminId}")
    ApiResponse<String> deleteAdmin(@PathVariable String adminId) {
        ApiResponse<String> apiResponse = new ApiResponse<>();
        adminService.deleteAdmin(adminId);
        apiResponse.setMessage("Success");
        apiResponse.setResult(String.format("Deleted successfully Admin with id: %s", adminId));
        return apiResponse;
    }
}