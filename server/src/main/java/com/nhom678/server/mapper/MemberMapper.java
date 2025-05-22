package com.nhom678.server.mapper;

import com.nhom678.server.dto.request.member.MemberCreationRequest;
import com.nhom678.server.dto.request.member.MemberUpdateRequest;
import com.nhom678.server.dto.response.MemberResponse;
import com.nhom678.server.entity.Member;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    MemberResponse toMemberResponse(Member member);
    Member toMember(MemberCreationRequest memberResponse);
    void updateMember(Member member, MemberUpdateRequest request);
}
