package com.supnum119.tp.repository;

import com.supnum119.tp.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

public interface StudentRepository extends JpaRepository<Student, Long> {
    List<Student> findByName(String name);
    Page<Student> findByNameContainingIgnoreCase(String name, Pageable pageable);
}
