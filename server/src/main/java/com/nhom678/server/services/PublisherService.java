package com.nhom678.server.services;

import com.nhom678.server.dto.request.publisher.PublisherCreateRequest;
import com.nhom678.server.dto.request.publisher.PublisherUpdateRequest;
import com.nhom678.server.dto.response.PublisherResponse;
import com.nhom678.server.entity.Publisher;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;

import java.util.List;

public interface PublisherService {
    PublisherResponse createPublisher(PublisherCreateRequest request);
    //PublisherResponse updatePublisher(String publisherName, PublisherUpdateRequest request);
    PublisherResponse getPublisherByName(String publisherName);
    List<PublisherResponse> getAllPublisher();
    void deletePublisher(String publisherName);
}
