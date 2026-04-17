package com.supnum119.tp.controller;

import com.supnum119.tp.dto.StudentDTO;
import com.supnum119.tp.entity.Student;
import com.supnum119.tp.repository.StudentRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    @GetMapping
    public List<Student> getAll() {
        return studentRepository.findAll();
    }

    // Amélioration : Pagination
    @GetMapping("/page")
    public Page<Student> getAllPaged(Pageable pageable) {
        return studentRepository.findAll(pageable);
    }

    // Amélioration : Recherche
    @GetMapping("/search")
    public List<Student> search(@RequestParam String name) {
        return studentRepository.findByName(name);
    }

    @PostMapping
    public Student create(@RequestBody @Valid Student student) {
        return studentRepository.save(student);
    }

    @GetMapping("/{id}")
    public Student getById(@PathVariable Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        studentRepository.deleteById(id);
    }

    // Amélioration : UPDATE avec DTO
    @PutMapping("/{id}")
    public Student update(@PathVariable Long id, @RequestBody @Valid StudentDTO studentDTO) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        
        student.setName(studentDTO.getName());
        student.setEmail(studentDTO.getEmail());
        
        return studentRepository.save(student);
    }
}
