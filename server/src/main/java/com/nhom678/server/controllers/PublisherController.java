package com.nhom678.server.controllers;

import com.nhom678.server.dto.ApiResponse;
import com.nhom678.server.dto.request.publisher.PublisherCreateRequest;
import com.nhom678.server.dto.request.publisher.PublisherUpdateRequest;
import com.nhom678.server.dto.response.PublisherResponse;
import com.nhom678.server.services.PublisherService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/publishers")
@RequiredArgsConstructor
@FieldDefaults(level= AccessLevel.PRIVATE, makeFinal = true)
public class PublisherController {

    PublisherService publisherService;

    @GetMapping("/{publisherId}")
    ApiResponse<PublisherResponse> getPublisherById(@PathVariable Integer publisherId) {
        return ApiResponse.<PublisherResponse>builder()
                .result(
                    publisherService.getPublisherById(publisherId))
                .message("Success")
                .build();
    }
    @GetMapping
    ApiResponse<List<PublisherResponse>> getAllPublisher() {
        ApiResponse<List<PublisherResponse>> apiResponse = new ApiResponse<>();
        apiResponse.setResult(publisherService.getAllPublisher());
        apiResponse.setMessage("Success");
        return apiResponse;
    }

    @PostMapping
    ApiResponse<PublisherResponse> createPublisher(@RequestBody PublisherCreateRequest request) {
        return ApiResponse.<PublisherResponse>builder()
                .result(publisherService.createPublisher(request))
                .message("Success")
                .build();
    }

    @DeleteMapping("/{publisherId}")
    ApiResponse<String> deletePublisher(@PathVariable Integer publisherId) {
        publisherService.deletePublisherById(publisherId);
        return ApiResponse.<String>builder()
                .result("Publisher successfully deleted")
                .message("Success")
                .build();
    }

    @PutMapping("/{publisherId}")
    ApiResponse<PublisherResponse> updatePublisher(@PathVariable Integer publisherId, @RequestBody PublisherUpdateRequest request) {
        return ApiResponse.<PublisherResponse>builder()
                .result(publisherService.updatePublisher(publisherId, request))
                .message("Success")
                .build();
    }
}
