package com.nhom678.server.services;

import com.nhom678.server.dto.request.member.MemberCreationRequest;
import com.nhom678.server.dto.request.member.MemberUpdateRequest;
import com.nhom678.server.dto.response.MemberResponse;

import java.util.List;

public interface MemberService {
    MemberResponse createMember(MemberCreationRequest request);
    List<MemberResponse> getAllMember();
    void deleteMember(Integer memberId);
    MemberResponse getMemberById(Integer memberId);
    MemberResponse updateMember(Integer memberId, MemberUpdateRequest request);
}
