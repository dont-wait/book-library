package com.nhom678.server.service;

import com.nhom678.server.dto.request.publisher.PublisherCreateRequest;
import com.nhom678.server.dto.request.publisher.PublisherUpdateRequest;
import com.nhom678.server.dto.response.PublisherResponse;


import java.util.List;

public interface PublisherService {
    PublisherResponse createPublisher(PublisherCreateRequest request);
    PublisherResponse getPublisherById(Integer id);
    List<PublisherResponse> getAllPublisher();
    void deletePublisherById(Integer id);
    PublisherResponse updatePublisher(Integer publisherId, PublisherUpdateRequest request);
}
