package com.nhom678.server.services;

import com.nhom678.server.dto.request.member.MemberCreationRequest;
import com.nhom678.server.dto.request.member.MemberUpdateRequest;
import com.nhom678.server.dto.response.LibrarianResponse;
import com.nhom678.server.dto.response.MemberResponse;

import java.util.List;

public interface MemberService {
    MemberResponse getMyInfo();
    MemberResponse createMember(MemberCreationRequest request);
    List<MemberResponse> getAllMember();
    void deleteMember(String memberId);
    MemberResponse getMemberById(String memberId);
    MemberResponse updateMember(String memberId, MemberUpdateRequest request);
}
