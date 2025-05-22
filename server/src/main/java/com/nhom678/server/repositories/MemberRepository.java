package com.nhom678.server.repositories;

import com.nhom678.server.entity.Member;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, String> {
    Optional<Member> findMemberById(String id);
    Boolean existsMemberId(String id);
    void deleteMemberById(String id);
}
