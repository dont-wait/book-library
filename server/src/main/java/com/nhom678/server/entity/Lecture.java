package com.nhom678.server.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@Table(name = "Lecture")
@NoArgsConstructor
@Data
public class Lecture extends Person{
}
