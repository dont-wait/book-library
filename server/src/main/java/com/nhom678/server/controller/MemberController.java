package com.nhom678.server.controller;

import com.nhom678.server.dto.ApiResponse;
import com.nhom678.server.dto.request.member.MemberCreationRequest;
import com.nhom678.server.dto.request.member.MemberUpdateRequest;
import com.nhom678.server.dto.response.MemberResponse;
import com.nhom678.server.service.MemberService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@RequestMapping("/members")
public class MemberController {
    MemberService memberService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'LIBRARIAN')")
    ApiResponse<List<MemberResponse>> getAllMembers() {
        return ApiResponse.<List<MemberResponse>>builder()
                .result(memberService.getAllMember())
                .message("Success")
                .build();
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'LIBRARIAN')")
    ApiResponse<MemberResponse> createMember(@Valid @RequestBody MemberCreationRequest request) {
        return ApiResponse.<MemberResponse>builder()
                .result(memberService.createMember(request))
                .message("Success")
                .build();
    }

    @GetMapping("/myInfo")
    //@PreAuthorize("hasRole('MEMBER')")
    ApiResponse<MemberResponse> getMyInfo() {
        return ApiResponse.<MemberResponse>builder()
                .result(memberService.getMyInfo())
                .message("Success")
                .build();
    }

    @GetMapping("/{memberId}")
    ApiResponse<MemberResponse> getMemberById(@PathVariable String memberId) {
        return ApiResponse.<MemberResponse>builder()
                .result(memberService.getMemberById(memberId))
                .message("Success")
                .build();
    }

    @PutMapping("/{memberId}")
    ApiResponse<MemberResponse> updateMember(@PathVariable String memberId,
                                                   @Valid @RequestBody MemberUpdateRequest request) {
        return ApiResponse.<MemberResponse>builder()
                .result(memberService.updateMember(memberId, request))
                .message("Success")
                .build();
    }

    @DeleteMapping("/{memberId}")
    ApiResponse<String> deleteLibrarian(@PathVariable String memberId) {
        ApiResponse<String> apiResponse = new ApiResponse<>();
        memberService.deleteMember(memberId);
        apiResponse.setMessage("Success");
        apiResponse.setResult(String.format("Deleted successfully Librarian with id: %s", memberId));
        return apiResponse;
    }
}
