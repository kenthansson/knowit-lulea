package com.example.myapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.myapp.model.PointOfInterest;
import com.example.myapp.service.PointOfInterestService;

import java.util.List;

@RestController
@RequestMapping("/poi")
public class PointOfInterestController {

    @Autowired
    private PointOfInterestService service;

    @GetMapping
    public List<PointOfInterest> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public PointOfInterest getById(@PathVariable Long id) {
        return service.getById(id).orElse(null);
    }

    @PostMapping
    public PointOfInterest create(@RequestBody PointOfInterest pointOfInterest) {
        return service.save(pointOfInterest);
    }

    @PutMapping("/{id}")
    public PointOfInterest update(@PathVariable Long id, @RequestBody PointOfInterest pointOfInterest) {
        if (service.getById(id).isPresent()) {
            return service.save(pointOfInterest);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
