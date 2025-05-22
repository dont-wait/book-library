package com.nhom678.server.repositories;

import com.nhom678.server.entity.Member;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, String> {
    Optional<Member> findByMemberId(String memberId);
    Boolean existsByMemberId(String memberId);
    void deleteByMemberId(String memberId);
}
