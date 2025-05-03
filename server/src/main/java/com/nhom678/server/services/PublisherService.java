package com.nhom678.server.services;

import com.nhom678.server.dto.request.publisher.PublisherCreateRequest;
import com.nhom678.server.dto.response.PublisherResponse;


import java.util.List;

public interface PublisherService {
    PublisherResponse createPublisher(PublisherCreateRequest request);
    PublisherResponse getPublisherByName(String publisherName);
    List<PublisherResponse> getAllPublisher();
    void deletePublisher(String publisherName);
}
