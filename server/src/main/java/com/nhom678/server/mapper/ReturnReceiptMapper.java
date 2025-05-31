package com.nhom678.server.mapper;


import com.nhom678.server.dto.request.ReturnReceipt.ReturnReceiptRequest;
import com.nhom678.server.dto.response.ReturnReceiptResponse;
import com.nhom678.server.entity.ReturnReceipt;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;


@Mapper(componentModel = "spring")
public interface ReturnReceiptMapper
{

    // Chuyển từ Request (DTO) → Entity
    @Mappings({
            @Mapping(target = "returnReceiptId", ignore = true), // ID tạo tự động
            @Mapping(target = "borrowReceipt", ignore = true),   // set trong service
            @Mapping(target = "statusBook", ignore = true)       // set trong service
    })
    ReturnReceipt toPhieuTra(ReturnReceiptRequest request);

    // Chuyển từ Entity → Response (DTO)
    @Mappings({
            @Mapping(source = "borrowReceipt.borrowReceiptId", target = "borrowReceiptId"),
            @Mapping(source = "statusBook.name", target = "statusBookName")
    })
    ReturnReceiptResponse toDto(ReturnReceipt entity);
}
