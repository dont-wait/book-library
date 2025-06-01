package com.nhom678.server.mapper;

import com.nhom678.server.dto.request.member.MemberCreationRequest;
import com.nhom678.server.dto.request.member.MemberUpdateRequest;
import com.nhom678.server.dto.response.MemberResponse;
import com.nhom678.server.entity.Member;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    MemberResponse toMemberResponse(Member member);
    @Mapping(target = "userAccount", ignore = true)
    Member toMember(MemberCreationRequest memberResponse);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateMember(@MappingTarget Member member, MemberUpdateRequest request);
}
