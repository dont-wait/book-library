package com.nhom678.server.mapper;

import com.nhom678.server.dto.response.UserAccountResponse;
import com.nhom678.server.entity.UserAccount;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserAccountMapper {
    UserAccountResponse toUserAccountResponse(UserAccount userAccount);
}
