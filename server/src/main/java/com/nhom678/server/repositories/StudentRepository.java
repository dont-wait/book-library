package com.nhom678.server.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nhom678.server.entity.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, String> {
    Optional<Student> findStudentByStudentId(String studentId);
    Boolean existsStudentByStudentId(String studentId);
    Boolean existsStudentByPhone(String phone);
    boolean existsStudentByEmail(String email);
    void deleteStudentByStudentId(String studentId);
}
