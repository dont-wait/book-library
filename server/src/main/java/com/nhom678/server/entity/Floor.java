package com.nhom678.server.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "floor")
public class Floor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer floorId;
    String floorName;

}
