package com.example.myapp.model;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@ToString
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class PointOfInterest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private Double latitude;
    private Double longitude;

}