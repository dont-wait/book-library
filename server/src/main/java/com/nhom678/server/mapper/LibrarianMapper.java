package com.nhom678.server.mapper;

import com.nhom678.server.dto.request.librarian.LibrarianCreationRequest;
import com.nhom678.server.dto.request.librarian.LibrarianUpdateRequest;
import com.nhom678.server.dto.response.LibrarianResponse;
import com.nhom678.server.entity.Librarian;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface LibrarianMapper {

    LibrarianResponse toLibrarianResponse(Librarian librarian);
    @Mapping(target = "userAccount", ignore = true)
    Librarian toLibrarian(LibrarianCreationRequest request);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateLibrarian(@MappingTarget Librarian librarian, LibrarianUpdateRequest request);
}
