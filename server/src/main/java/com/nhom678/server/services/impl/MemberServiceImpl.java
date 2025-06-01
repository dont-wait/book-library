package com.nhom678.server.services.impl;

import com.nhom678.server.dto.request.member.MemberCreationRequest;
import com.nhom678.server.dto.request.member.MemberUpdateRequest;
import com.nhom678.server.dto.response.LibrarianResponse;
import com.nhom678.server.dto.response.MemberResponse;
import com.nhom678.server.entity.Librarian;
import com.nhom678.server.entity.Member;
import com.nhom678.server.entity.UserAccount;
import com.nhom678.server.enums.ErrorCode;
import com.nhom678.server.enums.UserRole;
import com.nhom678.server.exceptions.AppException;
import com.nhom678.server.mapper.LibrarianMapper;
import com.nhom678.server.mapper.MemberMapper;
import com.nhom678.server.repositories.MemberRepository;
import com.nhom678.server.repositories.UserAccountRepository;
import com.nhom678.server.services.MemberService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    MemberRepository memberRepository;
    MemberMapper memberMapper;
    UserAccountRepository userAccountRepository;
    PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    @PreAuthorize("hasRole('ADMIN')or hasRole('LIBRARIAN')")
    public MemberResponse createMember(MemberCreationRequest request) {
        if(memberRepository.existsByMemberId(request.getMemberId()))
            throw new AppException(ErrorCode.ID_EXISTED);
        if (memberRepository.existsByEmail(request.getEmail()))
            throw new AppException(ErrorCode.EMAIL_EXISTED);
        if (memberRepository.existsByPhone(request.getPhone()))
            throw new AppException(ErrorCode.PHONE_EXISTED);

        Member member = memberMapper.toMember(request);
        memberRepository.save(member);

        HashSet<String> roles = new HashSet<>();
        roles.add(UserRole.MEMBER.name());
        UserAccount userAccount = UserAccount.builder()
                .userId(request.getMemberId())
                .password(passwordEncoder.encode(request.getPassword()))
                .isActivated(true)
                .roles(roles)
                .member(member)
                .build();

        userAccountRepository.save(userAccount);
        member.setUserAccount(userAccount);


        return memberMapper.toMemberResponse(memberRepository.save(member));
    }

    @Override
    @PreAuthorize( "hasRole('MEMBER')")
    public MemberResponse getMyInfo() {
        var context = SecurityContextHolder.getContext();
        String memberId = context.getAuthentication().getName();
        Member member = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new AppException(ErrorCode.ID_NOT_FOUND));
        return memberMapper.toMemberResponse(member);
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')or hasRole('LIBRARIAN')")
    public List<MemberResponse> getAllMember() {
        return memberRepository.findAll()
                .stream()
                .map(memberMapper::toMemberResponse)
                .toList();
    }

    @Override
    @Transactional
    @PreAuthorize("hasRole('ADMIN')or hasRole('LIBRARIAN')")
    public void deleteMember(String memberId) {
        if (!memberRepository.existsByMemberId(memberId))
            throw new AppException(ErrorCode.ID_NOT_FOUND);

        userAccountRepository.deleteByUserId(memberId);
        memberRepository.deleteByMemberId(memberId);    }

    @Override
    @PreAuthorize("hasRole('ADMIN')or hasRole('LIBRARIAN')")
    public MemberResponse getMemberById(String memberId) {
        Member member = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new AppException(ErrorCode.ID_NOT_FOUND));
        return memberMapper.toMemberResponse(member);
    }

    @Override
    public MemberResponse updateMember(String memberId, MemberUpdateRequest request) {
        Member existingMember = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new AppException(ErrorCode.ID_NOT_FOUND));

        if (request.getEmail() != null && !request.getEmail().equals(existingMember.getEmail()))
            if (memberRepository.existsByEmail(request.getEmail()))
                throw new AppException(ErrorCode.EMAIL_EXISTED);

        if (request.getPhone() != null && !request.getPhone().equals(existingMember.getPhone()))
            if (memberRepository.existsByPhone(request.getPhone()))
                throw new AppException(ErrorCode.PHONE_EXISTED);

        memberMapper.updateMember(existingMember, request);

        return memberMapper.toMemberResponse(existingMember);
    }
}
