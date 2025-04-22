package com.nhom678.server.dto.request.publisher;


import jakarta.validation.constraints.Size;

public class PublisherUpdateRequest {

    @Size(message = "PUBLISHERID_NOTFOUND")
    int publisherId;

    String publisherName;
}
