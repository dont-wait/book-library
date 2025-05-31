package com.nhom678.server.mapper;

import com.nhom678.server.dto.request.StatusBook.StatusBookRequest;
import com.nhom678.server.dto.response.StatusBookResponse;
import com.nhom678.server.entity.StatusBook;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface StatusBookMapper
{
    StatusBook toPhieuTra(StatusBookRequest request);
    StatusBookResponse toDto(StatusBook entity);
}
