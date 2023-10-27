package com.example.myapp.model;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.JoinColumn;
import java.sql.Timestamp;


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
    private Double lat;
    private Double lng;
    private Timestamp created;
    private Timestamp updated;
    @ManyToOne
    @JoinColumn(name = "category", referencedColumnName = "id")
    private Category category;
}