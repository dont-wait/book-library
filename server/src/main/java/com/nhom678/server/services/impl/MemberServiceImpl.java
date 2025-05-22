package com.nhom678.server.services.impl;

import com.nhom678.server.dto.request.member.MemberCreationRequest;
import com.nhom678.server.dto.request.member.MemberUpdateRequest;
import com.nhom678.server.dto.response.MemberResponse;
import com.nhom678.server.mapper.MemberMapper;
import com.nhom678.server.repositories.MemberRepository;
import com.nhom678.server.services.MemberService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    MemberRepository memberRepository;
    MemberMapper memberMapper;

    @Override
    public MemberResponse createMember(MemberCreationRequest request) {
        return null;
    }

    @Override
    public List<MemberResponse> getAllMember() {
        return List.of();
    }

    @Override
    public void deleteMember(String memberId) {

    }

    @Override
    public MemberResponse getMemberById(String memberId) {
        return null;
    }

    @Override
    public MemberResponse updateMember(String memberId, MemberUpdateRequest request) {
        return null;
    }
}
