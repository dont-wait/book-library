package com.nhom678.server.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Table(name = "Admin")
@Entity
@Data
public class Admin extends Person{

}
