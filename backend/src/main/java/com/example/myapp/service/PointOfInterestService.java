package com.example.myapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.myapp.model.PointOfInterest;
import com.example.myapp.repository.PointOfInterestRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PointOfInterestService {

    @Autowired
    private PointOfInterestRepository repository;

    public List<PointOfInterest> getAll() {
        return repository.findAll();
    }

    public Optional<PointOfInterest> getById(Long id) {
        return repository.findById(id);
    }

    public PointOfInterest save(PointOfInterest pointOfInterest) {
        return repository.save(pointOfInterest);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    // Additional methods as needed
}
