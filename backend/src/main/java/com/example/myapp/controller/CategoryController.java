package com.example.myapp.controller;

import com.example.myapp.model.Category;
import com.example.myapp.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category")
@CrossOrigin(allowedHeaders = "*", origins = "*")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public List<Category> getAll() {
        return categoryService.getAllCategories();
    }

    @GetMapping("/{id}")
    public Category getById(@PathVariable Long id) {
        return categoryService.getCategoryById(id).orElse(null);
    }

    @PostMapping
    public Category create(@RequestBody Category category) {
        return categoryService.createCategory(category);
    }

    @PutMapping("/{id}")
    public Category update(@PathVariable Long id, @RequestBody Category category) throws Exception {
        if (categoryService.getCategoryById(id).isPresent()) {
            return categoryService.updateCategory(id, category);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        categoryService.deleteCategory(id);
    }
}