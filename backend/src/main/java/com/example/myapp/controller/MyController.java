package com.example.myapp.controller;

import com.example.myapp.model.MyModel;
import com.example.myapp.service.MyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class MyController {

    @Autowired
    private MyService myService;

    @GetMapping("/models")
    public ResponseEntity<List<MyModel>> getAllModels() {
        List<MyModel> models = myService.getAllModels();
        return new ResponseEntity<>(models, HttpStatus.OK);
    }

    @GetMapping("/models/{id}")
    public ResponseEntity<MyModel> getModelById(@PathVariable Long id) {
        MyModel model = myService.getModelById(id);
        return new ResponseEntity<>(model, HttpStatus.OK);
    }

    @PostMapping("/models")
    public ResponseEntity<MyModel> createModel(@RequestBody MyModel model) {
        MyModel createdModel = myService.createModel(model);
        return new ResponseEntity<>(createdModel, HttpStatus.CREATED);
    }

    @PutMapping("/models/{id}")
    public ResponseEntity<MyModel> updateModel(@PathVariable Long id, @RequestBody MyModel model) {
        MyModel updatedModel = myService.updateModel(id, model);
        return new ResponseEntity<>(updatedModel, HttpStatus.OK);
    }

    @DeleteMapping("/models/{id}")
    public ResponseEntity<Void> deleteModel(@PathVariable Long id) {
        myService.deleteModel(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}