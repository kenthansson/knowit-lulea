package com.example.myapp.service;

import com.example.myapp.model.MyModel;
import com.example.myapp.repository.MyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MyService {

    @Autowired
    private MyRepository myRepository;

    public List<MyModel> getAllModels() {
        return myRepository.findAll();
    }

    public MyModel getModelById(Long id) {
        return myRepository.findById(id).orElse(null);
    }

    public MyModel createModel(MyModel model) {
        return myRepository.save(model);
    }

    public MyModel updateModel(Long id, MyModel model) {
        MyModel existingModel = myRepository.findById(id).orElse(null);
        if (existingModel != null) {
            existingModel.setName(model.getName());
            return myRepository.save(existingModel);
        }
        return null;
    }

    public void deleteModel(Long id) {
        myRepository.deleteById(id);
    }
}