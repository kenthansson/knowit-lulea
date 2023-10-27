package com.example.myapp.repository;

import com.example.myapp.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    // Du kan definiera anpassade metoder här om du har specifika sökbehov
}