package com.nhom678.server.mapper;

import com.nhom678.server.dto.request.borrowReceipt.BorrowReceiptCreationRequest;
import com.nhom678.server.dto.request.borrowReceipt.BorrowReceiptUpdateRequest;
import com.nhom678.server.dto.response.BorrowReceiptResponse;
import com.nhom678.server.entity.BorrowReceipt;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface BorrowReceiptMapper {

    @Mapping(source = "userAccount.userId", target = "userId")
    @Mapping(source = "statusBook.name", target = "name") // giả sử userAccount có trường name
    @Mapping(source = "book.bookId", target = "bookId")
    @Mapping(source = "book.bookName", target = "bookName")
    @Mapping(source = "statusReceipt.statusReceiptName", target = "statusReceiptName")

    BorrowReceiptResponse toBorrowReceiptResponse(BorrowReceipt borrowReceipt);

    BorrowReceipt toBorrowReceipt(BorrowReceiptCreationRequest request);

//    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
//    void updateBorrowReceipt(@MappingTarget BorrowReceipt borrowReceipt, AdminUpdateRequest request);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateBorrowReceipt(@MappingTarget BorrowReceipt borrowReceipt, BorrowReceiptUpdateRequest request);
}
