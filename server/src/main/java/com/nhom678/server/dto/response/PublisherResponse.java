package com.nhom678.server.dto.response;

import com.nhom678.server.entity.Book;
import lombok.Data;

import java.util.List;

@Data
public class PublisherResponse {
    Integer publisherId;
    String publisherName;
    List<Book> books; //when call this response we will see list book the publisher have
}
