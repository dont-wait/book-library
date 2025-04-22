package com.nhom678.server.mapper;

import com.nhom678.server.dto.request.publisher.PublisherCreateRequest;
import com.nhom678.server.dto.request.publisher.PublisherUpdateRequest;
import com.nhom678.server.dto.response.PublisherResponse;
import com.nhom678.server.entity.Publisher;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PublisherMapper {
    Publisher toPublisher(PublisherCreateRequest request);
    PublisherResponse toPublisherResponse(Publisher publisher);
    void updatePublisher(Publisher publisher, PublisherUpdateRequest request);
}
